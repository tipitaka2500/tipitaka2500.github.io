#!/usr/bin/env python3
"""
package_offline.py - Build and package tipitaka2500 for offline distribution.

Creates a compressed zip archive of the production static site (dist/)
suitable for distribution via GitHub Releases.
"""

import os
import sys
import time
import zipfile
import subprocess

REPO_ROOT = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(REPO_ROOT, "dist")
VERSION = "v3.2.0"
OUTPUT_ZIP = os.path.join(REPO_ROOT, f"tipitaka2500-{VERSION}-offline.zip")

README_OFFLINE = """========================================================================
The World Tipiṭaka Edition (Mahāsaṅgīti Tipiṭaka Buddhavasse 2500)
Complete 40-Volume Roman-Script Pāḷi Tipiṭaka — Offline Edition (v3.2.0)
Website: https://tipitaka2500.github.io
Repository: https://github.com/tipitaka2500/tipitaka2500.github.io
========================================================================

This archive contains the complete, self-contained offline distribution of
tipitaka2500.github.io, including:
- All 40 volumes and 88 canonical books (Vinaya, Sutta, Abhidhamma)
- All 20,189 sections and 118,280 canonical paragraphs
- All 26,529 critical apparatus variant footnotes and 7,938 linked cross-references
- Complete reference databases: Table of Contents, Index of Verses (Gāthā),
  Page Concordances (8 printed editions), and Pāḷi Word Index
- Full client-side sharded Pāḷi Grammar Dictionary (1,178,000+ inflections) with
  compound/sandhi deconstruction

------------------------------------------------------------------------
HOW TO BROWSE OFFLINE:
------------------------------------------------------------------------

Option 1: Direct in Browser
- Double-click or open 'index.html' in any modern web browser (Safari, Chrome,
  Firefox, Edge).
- All reading pages, navigation hierarchies, footnote popovers, and layout themes
  work directly offline without internet.

Option 2: Local Web Server (Recommended for Instant Dictionary Lookup)
Because modern web browsers apply strict CORS/security policies preventing
'file://' protocol pages from dynamically fetching local JSON data shards,
launching a local server enables the instant Dictionary on Hover & Word Index:

  • Using Python (built into macOS, Linux, and Windows):
      python3 -m http.server 8000
      Open your browser at: http://localhost:8000

  • Using Node.js:
      npx serve .
      or:
      npx http-server

  • Using VS Code / Cursor:
      Right-click 'index.html' and select 'Open with Live Server'.

------------------------------------------------------------------------
LICENSE & DEDICATION:
------------------------------------------------------------------------
CC0 1.0 Universal — Dedicated to the public domain.
========================================================================
"""

def main():
    print(f"Packaging {VERSION} offline bundle...")
    if not os.path.exists(DIST_DIR) or not os.path.exists(os.path.join(DIST_DIR, "index.html")):
        print("dist/ not found. Running npm run build...")
        subprocess.check_call(["npm", "run", "build"], cwd=REPO_ROOT)

    start_time = time.time()
    total_files = 0

    print(f"Writing zip archive to: {OUTPUT_ZIP}")
    with zipfile.ZipFile(OUTPUT_ZIP, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        # Write README_OFFLINE.txt at the root of the zip
        zf.writestr("README_OFFLINE.txt", README_OFFLINE)

        # Walk dist directory
        for root, dirs, files in os.walk(DIST_DIR):
            for file in files:
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, DIST_DIR)
                # Omit sitemaps and robots from offline reader zip if desired, but including is fine
                zf.write(file_path, rel_path)
                total_files += 1

    elapsed = time.time() - start_time
    size_mb = os.path.getsize(OUTPUT_ZIP) / (1024 * 1024)
    print(f"Successfully packaged {total_files} files into {OUTPUT_ZIP} ({size_mb:.1f} MB) in {elapsed:.1f}s.")
    print("\nTo publish this release to GitHub Releases, run:")
    print(f"  gh release create {VERSION} {OUTPUT_ZIP} --title 'The World Tipiṭaka Edition {VERSION}' --notes 'Complete offline distribution archive (HTML + Dictionary) and PWA updates.'")

if __name__ == "__main__":
    main()
