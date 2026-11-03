#!/usr/bin/env python3
"""
Fixes unescaped ampersands in SVG files to ensure strict XML validity.
"""
import glob
import re
import xml.etree.ElementTree as ET

def fix_svg_files():
    svg_files = sorted(glob.glob("images/**/*.svg", recursive=True))
    fixed_count = 0

    for filepath in svg_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        orig = content
        # Replace raw ampersands not part of standard XML entities
        content = re.sub(r'&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)', '&amp;', content)

        if content != orig:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            fixed_count += 1
            print(f"Fixed XML in: {filepath}")

        # Validate with XML parser
        try:
            ET.parse(filepath)
            print(f"  [VALID XML] {filepath}")
        except Exception as e:
            print(f"  [INVALID XML] {filepath}: {e}")

    print(f"\nTotal SVGs checked: {len(svg_files)}. Fixed: {fixed_count}.")

if __name__ == '__main__':
    fix_svg_files()

