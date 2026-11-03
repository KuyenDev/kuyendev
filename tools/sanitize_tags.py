#!/usr/bin/env python3
"""
Sanitizes malformed img tags, onerror attributes, and inline junk.
"""
import glob
import re

def sanitize_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    orig = content

    # 1. Remove residual svg fragments that leaked into html tags
    content = re.sub(r"<rect width=.*?</svg>['\";>]*", '', content)
    content = re.sub(r"data:image/svg\+xml;utf8,<svg.*?</svg>['\";>]*", '', content)

    # 2. Fix onerror attributes ending with extra quotes or semicolons
    # Matches onerror="this.onerror=null;this.src='TARGET';"
    content = re.sub(
        r'onerror=["\']this\.onerror=null;this\.src=[\'"]([^\'"]+)[\'"];?["\'][^>]*?(?=\s*/?>|\s+[a-zA-Z0-9_-]+[:=])',
        lambda m: f'onerror="this.onerror=null;this.src=\'{m.group(1).rstrip("\';")}\';"',
        content
    )

    # 3. Clean any trailing quotes or urls before closing > or />
    content = re.sub(r'(\s*onerror="[^"]*?")\s*[^>]*?(?=/?>)', r'\1', content)

    # 4. Remove duplicate semicolons and quotes in img tag ends
    content = re.sub(r';"\s*>', '">', content)
    content = re.sub(r'""\s*>', '">', content)
    content = re.sub(r'""\s*/>', '"/>', content)
    content = re.sub(r';""\s*/>', '"/>', content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

if __name__ == '__main__':
    files = sorted(glob.glob('demos/**/*.html', recursive=True) + glob.glob('pages/**/*.html', recursive=True) + ['index.html'])
    modified = 0
    for f in files:
        if sanitize_file(f):
            modified += 1
    print(f'Sanitization completed. Modified {modified} files.')
