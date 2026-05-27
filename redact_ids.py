#!/usr/bin/env python3
"""
Redacts DATE OF BIRTH and ACCESSION ID from Vibrant Wellness mycotoxin reports.
Usage:  python3 redact_ids.py <image_path>
Output: <image_path>_redacted.png  (saved next to the original)
"""

import sys
from pathlib import Path
from PIL import Image, ImageDraw

def redact(img_path: str):
    src = Path(img_path)
    img = Image.open(src).convert("RGB")
    w, h = img.size
    print(f"  Image size: {w} × {h}")

    draw = ImageDraw.Draw(img)

    # -------------------------------------------------------
    # The patient-info table in Vibrant Wellness reports has
    # 6 equal-width columns:
    #   0: LAST NAME  1: FIRST NAME  2: GENDER
    #   3: DATE OF BIRTH  4: ACCESSION ID  5: DATE OF SERVICE
    #
    # The table sits in roughly the top 25 % of the page.
    # Column widths are approximately equal; the table starts
    # at ~2 % from the left and the header+data rows span
    # roughly y = 12 % – 26 % of the image height.
    # -------------------------------------------------------

    # Cover DATE OF BIRTH + ACCESSION ID columns together as one block.
    # Go wide to handle any variation in column widths across report versions.
    dob_x0 = 0.28 * w   # starts before DATE OF BIRTH label
    dob_x1 = 0.74 * w   # ends after ACCESSION ID value
    acc_x0 = dob_x0
    acc_x1 = dob_x1

    # Vertical: cover both the column-header label row AND the data row
    row_y0 = 0.10 * h
    row_y1 = 0.30 * h

    # Draw white rectangles
    draw.rectangle([dob_x0, row_y0, dob_x1, row_y1], fill="white")
    draw.rectangle([acc_x0, row_y0, acc_x1, row_y1], fill="white")

    out = src.with_name(src.stem + "_redacted" + src.suffix)
    img.save(out)
    print(f"  Saved → {out}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 redact_ids.py <image_path> [image_path2 ...]")
        sys.exit(1)
    for path in sys.argv[1:]:
        print(f"Processing {path} …")
        redact(path)
    print("Done.")
