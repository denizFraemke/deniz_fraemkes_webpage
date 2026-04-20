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

# Publication object fields, in the order they appear in siteData.ts.
# NOTE: "citations" is intentionally NOT in this list — the site no longer
# displays citation counts. Do not add it back unless the UI uses it.
PUBLICATION_FIELDS = [
  "slug",
  "year",
  "title",
  "authors",
  "venue",
  "summary",
  "theme",
  "accent",
  "imageUrl",
  "externalUrl",
]

# Fields whose values are typically long — written on their own indented line
# to match the multi-line style in siteData.ts.
LONG_FIELDS = {"title", "authors", "summary"}


def slugify(text: str) -> str:
  """Create a URL-safe slug from text."""
  text = text.lower().strip()
  text = re.sub(r"[^\w\s-]", "", text)
  text = re.sub(r"[\s_]+", "-", text)
  return text[:60].rstrip("-")


def title_key(text: str) -> str:
  """Normalise a title for duplicate detection — ignore case, punctuation, whitespace."""
  return re.sub(r"[^a-z0-9]+", "", text.lower())


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
    for field in PUBLICATION_FIELDS:
      field_match = re.search(rf'{field}:\s*"((?:[^"\\]|\\.)*)"', obj_str)
      if field_match:
        pub[field] = field_match.group(1)
    if pub.get("slug"):
      pubs.append(pub)

  return pubs


def load_overrides() -> tuple[dict, set[str]]:
  """Load manual overrides and ignored titles.

  Returns (overrides_by_slug, set_of_ignored_title_keys).
  Supports both the old flat schema (``{ "slug": {...}, ... }``) and the new
  structured schema (``{ "overrides": {...}, "ignored_titles": [...] }``).
  """
  if not OVERRIDES_PATH.exists():
    return {}, set()

  data = json.loads(OVERRIDES_PATH.read_text())

  if "overrides" in data or "ignored_titles" in data:
    overrides = data.get("overrides", {})
    ignored = {title_key(t) for t in data.get("ignored_titles", [])}
    return overrides, ignored

  # Legacy flat form — all keys are slugs
  return {k: v for k, v in data.items() if not k.startswith("_")}, set()


def _is_preprint_venue(pub: dict) -> bool:
  """Heuristic: does this publication look like a preprint?"""
  venue = (pub.get("venue") or "").lower()
  url = (pub.get("externalUrl") or pub.get("external_url") or "").lower()
  preprint_markers = ("biorxiv", "medrxiv", "arxiv", "preprint", "ssrn", "psyarxiv", "osf.io")
  if any(m in venue for m in preprint_markers):
    return True
  if any(m in url for m in preprint_markers):
    return True
  # bioRxiv/medRxiv DOIs are under 10.1101; preprint DOIs are commonly bespoke
  if "10.1101/" in url:
    return True
  return False


def merge_publications(
  existing: list[dict],
  orcid_pubs: list[dict],
  overrides: dict,
  ignored: set[str],
) -> tuple[list[dict], list[str], list[str]]:
  """
  Merge ORCID publications with existing data.
  Returns (merged_list, list_of_new_titles, list_of_updated_titles).

  A publication is an UPDATE (not new) if ORCID reports a non-preprint venue
  for a paper that is currently tracked as a preprint on the site. In that
  case, the venue and external URL are refreshed while preserving custom
  fields (summary, theme, accent, imageUrl).

  Titles whose normalised key is in ``ignored`` are skipped entirely.
  """
  existing_by_key = {title_key(p["title"]): p for p in existing}
  merged = list(existing)
  new_titles = []
  updated_titles = []

  for pub in orcid_pubs:
    tkey = title_key(pub["title"])
    if tkey in ignored:
      continue

    # --- Existing entry: check whether ORCID has a newer venue ---
    if tkey in existing_by_key:
      existing_pub = existing_by_key[tkey]
      # Only consider it an update if the site currently shows a preprint
      # AND ORCID now has a non-preprint venue.
      if _is_preprint_venue(existing_pub) and not _is_preprint_venue(pub):
        existing_pub["venue"] = pub["venue"] or existing_pub.get("venue", "")
        if pub.get("external_url"):
          existing_pub["externalUrl"] = pub["external_url"]
        if pub.get("year"):
          existing_pub["year"] = pub["year"]
        updated_titles.append(pub["title"])
      continue

    # --- New publication ---
    slug = slugify(pub["title"])
    override = overrides.get(slug, {})

    new_pub = {
      "slug": slug,
      "year": pub["year"],
      "title": pub["title"],
      "authors": override.get("authors", ""),
      "venue": override.get("venue", pub["venue"]),
      "summary": override.get("summary", ""),
      "theme": override.get("theme", ""),
      "accent": override.get("accent", ACCENT_PALETTE[len(merged) % len(ACCENT_PALETTE)]),
      "imageUrl": override.get("imageUrl", DEFAULT_IMAGES[len(merged) % len(DEFAULT_IMAGES)]),
      "externalUrl": override.get("externalUrl", pub["external_url"]),
    }

    merged.append(new_pub)
    new_titles.append(pub["title"])

  return merged, new_titles, updated_titles


def write_publications(publications: list[dict]) -> None:
  """Write the updated publications array back to siteData.ts."""
  content = SITE_DATA_PATH.read_text()

  entries = []
  for pub in publications:
    lines = ["  {"]
    for field in PUBLICATION_FIELDS:
      value = pub.get(field, "").replace('"', '\\"')
      if field in LONG_FIELDS and value:
        # Multi-line form for readability, matching existing style
        lines.append(f'    {field}:')
        lines.append(f'      "{value}",')
      else:
        lines.append(f'    {field}: "{value}",')
    lines.append("  }")
    entries.append("\n".join(lines))

  new_array = (
    "export const publications: Publication[] = [\n"
    + ",\n".join(entries)
    + ",\n];"
  )

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
  parser.add_argument("--scholar", default=None, help="Unused — kept for workflow compatibility")
  parser.add_argument("--dry-run", action="store_true", help="Print changes without writing")
  args = parser.parse_args()

  if not args.orcid or not args.orcid.strip():
    print("ERROR: --orcid is empty. Set the ORCID_ID repo variable on GitHub.")
    sys.exit(1)

  print(f"Fetching publications from ORCID {args.orcid}...")
  orcid_pubs = fetch_orcid_works(args.orcid)
  print(f"  Found {len(orcid_pubs)} works on ORCID")

  print("Loading existing publications from siteData.ts...")
  existing = parse_existing_publications()
  print(f"  Found {len(existing)} existing publications")

  overrides, ignored = load_overrides()

  merged, new_titles, updated_titles = merge_publications(
    existing, orcid_pubs, overrides, ignored
  )

  if not new_titles and not updated_titles:
    print("\nNo new or updated publications. Site is up to date — no file changes written.")
    return

  if new_titles:
    print(f"\n{len(new_titles)} new publication(s) found:")
    for title in new_titles:
      print(f"  + {title}")

  if updated_titles:
    print(f"\n{len(updated_titles)} publication(s) moved preprint → journal:")
    for title in updated_titles:
      print(f"  ~ {title}")

  if args.dry_run:
    print("\n[Dry run] No changes written.")
    return

  write_publications(merged)
  print(f"\nUpdated siteData.ts with {len(merged)} total publications.")
  print("Review the changes, then commit and push to trigger deployment.")


if __name__ == "__main__":
  main()
