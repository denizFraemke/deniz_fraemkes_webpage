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

from __future__ import annotations

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

# Where the Python script writes the ready-made PR body for the workflow.
PR_BODY_PATH = Path(__file__).parent / "pr_body.md"

# Shared style preamble used for every image-prompt suggestion, tuned to match
# the editorial aesthetic of the existing site images (hero-editorial.webp etc).
IMAGE_STYLE_PREAMBLE = (
  "Editorial magazine photograph, 4:3 landscape. Warm muted academic tones: "
  "deep teal, terracotta, cream, olive. Abstract and textural, painterly, "
  "soft natural light. No text, no logos, no faces, no clinical or stock-photo "
  "feel. Should visually pair with a serif-led research publication card."
)

# Three stylistic angles to give visual variety across the 3 suggestions.
IMAGE_PROMPT_ANGLES = [
  ("Close-up texture", "Extreme close-up of a material or surface that metaphorically represents the paper's theme. Shallow depth of field, painterly grain, muted palette."),
  ("Aerial / geometric", "Bird's-eye or flat-lay composition with clear geometric structure, negative space, and restrained palette. Minimal, editorial."),
  ("Still life / composed objects", "Composed still life of symbolic objects representing the paper's theme, on a warm neutral backdrop. Slightly shadowed, tactile."),
]


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
      # AND ORCID now reports a non-empty, non-preprint journal venue.
      orcid_venue = (pub.get("venue") or "").strip()
      if (
        orcid_venue
        and _is_preprint_venue(existing_pub)
        and not _is_preprint_venue(pub)
      ):
        existing_pub["venue"] = orcid_venue
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


def _group_label(pub: dict, prev_label: str | None) -> str | None:
  """Return a section comment if this pub starts a new group, else None.

  Groups are year + authorship-role (first-author vs co-authored), e.g.
  ``// --- 2026 — first author ---`` or ``// --- 2024 — co-authored ---``.
  """
  year = pub.get("year", "") or "????"
  authors = pub.get("authors", "") or ""
  # Treat "D Fraemke" or "Fraemke D" etc. at the start as first authorship.
  is_first = bool(re.match(r"\s*(D\.?\s*)?Fra[eä]mke\b", authors, re.IGNORECASE))
  role = "first author" if is_first else "co-authored"
  label = f"  // --- {year} — {role} ---"
  return label if label != prev_label else None


def write_publications(publications: list[dict]) -> None:
  """Write the updated publications array back to siteData.ts."""
  content = SITE_DATA_PATH.read_text()

  # Sort: newest first; first-author before co-authored within the same year
  def sort_key(p: dict):
    year = int(p.get("year") or 0)
    authors = p.get("authors", "") or ""
    is_first = bool(re.match(r"\s*(D\.?\s*)?Fra[eä]mke\b", authors, re.IGNORECASE))
    return (-year, 0 if is_first else 1)
  sorted_pubs = sorted(publications, key=sort_key)

  entries = []
  prev_label: str | None = None
  for pub in sorted_pubs:
    label = _group_label(pub, prev_label)
    if label is not None:
      entries.append(label)
      prev_label = label
    lines = ["  {"]
    for field in PUBLICATION_FIELDS:
      value = pub.get(field, "").replace('"', '\\"')
      if field in LONG_FIELDS and value:
        # Multi-line form for readability, matching existing style
        lines.append(f'    {field}:')
        lines.append(f'      "{value}",')
      else:
        lines.append(f'    {field}: "{value}",')
    lines.append("  },")
    entries.append("\n".join(lines))

  new_array = (
    "export const publications: Publication[] = [\n"
    + "\n".join(entries)
    + "\n];"
  )

  # Replace the existing array
  content = re.sub(
    r"export const publications: Publication\[\] = \[.*?\];",
    new_array,
    content,
    flags=re.DOTALL,
  )

  SITE_DATA_PATH.write_text(content)


def build_image_prompts(pub: dict) -> list[tuple[str, str]]:
  """Return 3 ready-to-paste image prompts for a publication.

  Each tuple is (angle_label, full_prompt). The prompts are tuned to match the
  existing editorial aesthetic (see IMAGE_STYLE_PREAMBLE).
  """
  title = pub.get("title", "").strip()
  prompts: list[tuple[str, str]] = []
  for label, angle in IMAGE_PROMPT_ANGLES:
    prompt = (
      f"{IMAGE_STYLE_PREAMBLE} {angle} The underlying subject of the paper "
      f"is: \"{title}\". Translate the theme into imagery — do NOT depict the "
      f"paper itself."
    )
    prompts.append((label, prompt))
  return prompts


def build_pr_body(
  new_pubs: list[dict],
  updated_titles: list[str],
) -> str:
  """Compose the PR body shown on GitHub. Saved for the workflow to use."""
  lines: list[str] = []
  lines.append("## Auto-detected publication changes")
  lines.append("")
  lines.append(
    "ORCID reports new or updated entries. Nothing is live until you merge."
  )
  lines.append("")

  if new_pubs:
    lines.append(f"### {len(new_pubs)} new publication(s)")
    lines.append("")
    for pub in new_pubs:
      lines.append(f"**{pub['title']}**  ")
      lines.append(f"_{pub.get('venue') or 'venue tbd'}_ · {pub.get('year') or 'year tbd'}")
      lines.append("")
      lines.append(
        f"_Default image:_ `{pub['imageUrl']}` — the site will use this if you "
        f"do not provide your own. If you want a custom image, generate one "
        f"using any of the three prompts below (Gemini, ChatGPT, Midjourney, "
        f"etc.), save it as  "
        f"`client/public/images/publications/{pub['slug']}.png`  "
        f"and change the `imageUrl` field in `client/src/lib/siteData.ts` to "
        f"`/images/publications/{pub['slug']}.png`."
      )
      lines.append("")
      for i, (label, prompt) in enumerate(build_image_prompts(pub), start=1):
        lines.append(f"<details><summary><strong>Prompt {i}: {label}</strong></summary>")
        lines.append("")
        lines.append("```")
        lines.append(prompt)
        lines.append("```")
        lines.append("")
        lines.append("</details>")
        lines.append("")
      lines.append("---")
      lines.append("")

  if updated_titles:
    lines.append(f"### {len(updated_titles)} preprint → journal update(s)")
    lines.append("")
    for title in updated_titles:
      lines.append(f"- {title}")
    lines.append("")
    lines.append(
      "_Please verify the new venue and DOI look correct._"
    )
    lines.append("")

  lines.append("### Review checklist")
  lines.append("- [ ] Titles and venues look correct")
  lines.append("- [ ] For new publications: add or edit the summary and theme in `siteData.ts`")
  lines.append(
    "- [ ] (Optional) Replace the default image with your own — see instructions above"
  )
  lines.append("")
  lines.append(
    "_If a listed entry is a duplicate or something you do not want tracked, "
    "add the title to ``scripts/publication_overrides.json`` under "
    "``ignored_titles`` and close this PR._"
  )

  return "\n".join(lines) + "\n"


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
    # Clean up any stale PR body from a previous run
    if PR_BODY_PATH.exists():
      PR_BODY_PATH.unlink()
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

  # Build the PR body (prompts + instructions) for the workflow to pick up
  new_pub_objects = [p for p in merged if p["title"] in new_titles]
  pr_body = build_pr_body(new_pub_objects, updated_titles)
  PR_BODY_PATH.write_text(pr_body)
  print(f"PR body written to {PR_BODY_PATH}")


if __name__ == "__main__":
  main()
