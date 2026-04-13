#!/usr/bin/env python3
"""
Fetch publications from ORCID and optionally Google Scholar,
then update siteData.ts with new entries. Creates a git branch
and opens a PR for review — nothing goes live without approval.

Usage:
  pip install requests scholarly  # one-time setup
  python scripts/update_publications.py --orcid 0000-0000-0000-0000

Environment variables (optional):
  GITHUB_TOKEN  — needed for creating PRs via gh CLI
"""

import argparse
import json
import re
import sys
from pathlib import Path

try:
  import requests
except ImportError:
  print("Install requests: pip install requests")
  sys.exit(1)

SITE_DATA_PATH = Path(__file__).parent.parent / "client" / "src" / "lib" / "siteData.ts"
OVERRIDES_PATH = Path(__file__).parent / "publication_overrides.json"

# Default accent gradients to rotate through for new publications
ACCENT_PALETTE = [
  "from-[#0f3f46] via-[#1f5c63] to-[#c88a4a]",
  "from-[#182631] via-[#34495e] to-[#bd6b4d]",
  "from-[#20303c] via-[#41606d] to-[#d29d63]",
  "from-[#214142] via-[#578080] to-[#c9a257]",
  "from-[#15333b] via-[#2e6a73] to-[#cc7f5f]",
  "from-[#21303d] via-[#4f6f82] to-[#ba7850]",
  "from-[#352723] via-[#7d503c] to-[#d8b47c]",
  "from-[#24353f] via-[#3b6770] to-[#dd9b67]",
  "from-[#16313a] via-[#36656d] to-[#c98e54]",
]

# Default images to rotate through for new publications
DEFAULT_IMAGES = [
  "/images/card-texture.webp",
  "/images/publications-banner.webp",
  "/images/hero-editorial.webp",
  "/images/research-themes.webp",
]


def slugify(text: str) -> str:
  """Create a URL-safe slug from text."""
  text = text.lower().strip()
  text = re.sub(r"[^\w\s-]", "", text)
  text = re.sub(r"[\s_]+", "-", text)
  return text[:60].rstrip("-")


def fetch_orcid_works(orcid_id: str) -> list[dict]:
  """Fetch publications from the ORCID public API."""
  url = f"https://pub.orcid.org/v3.0/{orcid_id}/works"
  headers = {"Accept": "application/json"}
  resp = requests.get(url, headers=headers, timeout=30)
  resp.raise_for_status()
  data = resp.json()

  publications = []
  for group in data.get("group", []):
    summary = group["work-summary"][0]
    title = summary.get("title", {}).get("title", {}).get("value", "")
    year = summary.get("publication-date", {}).get("year", {}).get("value", "")
    journal = summary.get("journal-title", {}).get("value", "") if summary.get("journal-title") else ""

    # Get external URL (DOI preferred)
    external_url = ""
    for eid in summary.get("external-ids", {}).get("external-id", []):
      if eid["external-id-type"] == "doi":
        external_url = f"https://doi.org/{eid['external-id-value']}"
        break

    if not title:
      continue

    publications.append({
      "title": title,
      "year": year or "Unknown",
      "venue": journal,
      "external_url": external_url,
    })

  return publications


def fetch_scholar_citations(scholar_id: str) -> dict[str, int]:
  """
  Optionally fetch citation counts from Google Scholar.
  Returns {title_lowercase: citation_count}.
  Falls back gracefully if scholarly is not installed or Scholar blocks.
  """
  try:
    from scholarly import scholarly
    author = scholarly.search_author_id(scholar_id)
    author = scholarly.fill(author, sections=["publications"])
    return {
      pub["bib"]["title"].lower(): pub.get("num_citations", 0)
      for pub in author.get("publications", [])
    }
  except Exception as e:
    print(f"  Scholar fetch skipped: {e}")
    return {}


def parse_existing_publications() -> list[dict]:
  """Parse the current publications array from siteData.ts."""
  content = SITE_DATA_PATH.read_text()

  # Find the publications array
  match = re.search(
    r"export const publications: Publication\[\] = \[(.*?)\];",
    content,
    re.DOTALL,
  )
  if not match:
    print("Could not find publications array in siteData.ts")
    return []

  pubs = []
  # Parse each publication object
  for obj_match in re.finditer(r"\{(.*?)\}", match.group(1), re.DOTALL):
    obj_str = obj_match.group(1)
    pub = {}
    for field in ["slug", "year", "title", "authors", "venue", "citations",
                   "summary", "theme", "accent", "imageUrl", "externalUrl"]:
      field_match = re.search(rf'{field}:\s*"((?:[^"\\]|\\.)*)"', obj_str)
      if field_match:
        pub[field] = field_match.group(1)
    if pub.get("slug"):
      pubs.append(pub)

  return pubs


def load_overrides() -> dict:
  """Load manual overrides for publications."""
  if OVERRIDES_PATH.exists():
    return json.loads(OVERRIDES_PATH.read_text())
  return {}


def save_overrides(overrides: dict) -> None:
  """Save overrides file."""
  OVERRIDES_PATH.write_text(json.dumps(overrides, indent=2) + "\n")


def merge_publications(
  existing: list[dict],
  orcid_pubs: list[dict],
  citations: dict[str, int],
  overrides: dict,
) -> tuple[list[dict], list[str]]:
  """
  Merge ORCID publications with existing data.
  Returns (merged_list, list_of_new_titles).
  """
  existing_titles = {p["title"].lower() for p in existing}
  merged = list(existing)
  new_titles = []

  for i, pub in enumerate(orcid_pubs):
    if pub["title"].lower() in existing_titles:
      continue

    slug = slugify(pub["title"])
    citation_count = citations.get(pub["title"].lower(), 0)

    # Check for manual overrides
    override = overrides.get(slug, {})

    new_pub = {
      "slug": slug,
      "year": pub["year"],
      "title": pub["title"],
      "authors": override.get("authors", ""),
      "venue": override.get("venue", pub["venue"]),
      "citations": override.get("citations", f"{citation_count} citations" if citation_count else "New"),
      "summary": override.get("summary", ""),
      "theme": override.get("theme", ""),
      "accent": override.get("accent", ACCENT_PALETTE[len(merged) % len(ACCENT_PALETTE)]),
      "imageUrl": override.get("imageUrl", DEFAULT_IMAGES[len(merged) % len(DEFAULT_IMAGES)]),
      "externalUrl": override.get("externalUrl", pub["external_url"]),
    }

    merged.append(new_pub)
    new_titles.append(pub["title"])

  # Sort by year descending
  merged.sort(key=lambda p: p.get("year", "0"), reverse=True)
  return merged, new_titles


def write_publications(publications: list[dict]) -> None:
  """Write the updated publications array back to siteData.ts."""
  content = SITE_DATA_PATH.read_text()

  # Build the new publications array string
  entries = []
  for pub in publications:
    entry = "  {\n"
    for field in ["slug", "year", "title", "authors", "venue", "citations",
                   "summary", "theme", "accent", "imageUrl", "externalUrl"]:
      value = pub.get(field, "").replace('"', '\\"')
      entry += f'    {field}: "{value}",\n'
    entry += "  }"
    entries.append(entry)

  new_array = "export const publications: Publication[] = [\n" + ",\n".join(entries) + ",\n];"

  # Replace the existing array
  content = re.sub(
    r"export const publications: Publication\[\] = \[.*?\];",
    new_array,
    content,
    flags=re.DOTALL,
  )

  SITE_DATA_PATH.write_text(content)


def main():
  parser = argparse.ArgumentParser(description="Update site publications from ORCID")
  parser.add_argument("--orcid", required=True, help="ORCID ID (e.g., 0000-0002-1234-5678)")
  parser.add_argument("--scholar", default=None, help="Google Scholar ID for citation counts (optional)")
  parser.add_argument("--dry-run", action="store_true", help="Print changes without writing")
  args = parser.parse_args()

  print(f"Fetching publications from ORCID {args.orcid}...")
  orcid_pubs = fetch_orcid_works(args.orcid)
  print(f"  Found {len(orcid_pubs)} works on ORCID")

  citations = {}
  if args.scholar:
    print(f"Fetching citation counts from Google Scholar {args.scholar}...")
    citations = fetch_scholar_citations(args.scholar)
    print(f"  Found citation data for {len(citations)} works")

  print("Loading existing publications from siteData.ts...")
  existing = parse_existing_publications()
  print(f"  Found {len(existing)} existing publications")

  overrides = load_overrides()

  merged, new_titles = merge_publications(existing, orcid_pubs, citations, overrides)

  if not new_titles:
    print("\nNo new publications found. Site is up to date.")
    return

  print(f"\n{len(new_titles)} new publication(s) found:")
  for title in new_titles:
    print(f"  + {title}")

  if args.dry_run:
    print("\n[Dry run] No changes written.")
    return

  write_publications(merged)
  print(f"\nUpdated siteData.ts with {len(merged)} total publications.")
  print("Review the changes, then commit and push to trigger deployment.")


if __name__ == "__main__":
  main()
