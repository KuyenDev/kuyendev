#!/usr/bin/env python3
"""
Fixes doctor, specialist, stylist, and barber card semantics across all demo pages:
- Replaces room/facility/surgical-ceiling images assigned to people with verified, distinct portraits.
- Matches gender: female doctors (Dra.) -> female doctor portraits; male doctors (Dr.) -> male doctor portraits.
- Rotates portraits to prevent duplicate faces in the same section/page.
- Updates alt, data-title, data-sub, data-img, and onerror fallbacks.
- Replaces lingering catalog thumbnail references in data-img with actual high-res URLs.
"""

import glob
import re

FEMALE_DOCTORS = [
    {
        "src": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/med/doctor-female-1.svg"
    },
    {
        "src": "https://images.unsplash.com/photo-1594824813627-89146dfa9960?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/med/doctor-female-2.svg"
    },
    {
        "src": "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/med/doctor-female-3.svg"
    },
    {
        "src": "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/med/doctor-female-1.svg"
    },
    {
        "src": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/med/doctor-female-2.svg"
    }
]

MALE_DOCTORS = [
    {
        "src": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/med/doctor-male-1.svg"
    },
    {
        "src": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/med/doctor-male-2.svg"
    },
    {
        "src": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/med/doctor-male-1.svg"
    },
    {
        "src": "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/med/doctor-male-2.svg"
    },
    {
        "src": "https://images.unsplash.com/photo-1622253694242-abdfa4a2b258?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/med/doctor-male-1.svg"
    }
]

FEMALE_STYLISTS = [
    {
        "src": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/beauty/stylist-female-1.svg"
    },
    {
        "src": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/beauty/stylist-female-2.svg"
    },
    {
        "src": "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/beauty/stylist-female-1.svg"
    },
    {
        "src": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/beauty/stylist-female-2.svg"
    }
]

MALE_BARBERS = [
    {
        "src": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/beauty/stylist-male-1.svg"
    },
    {
        "src": "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/beauty/stylist-male-2.svg"
    },
    {
        "src": "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/beauty/stylist-male-1.svg"
    },
    {
        "src": "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&q=80",
        "fallback": "../../images/demos/assets/beauty/stylist-male-2.svg"
    }
]

def fix_clinica_dental():
    files = sorted(glob.glob("demos/clinica-dental/*.html"))
    fixed_count = 0

    for filepath in files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        orig = content
        f_idx = 0
        m_idx = 0

        # Pattern to locate cards/articles containing doctor names
        # We find cards that have <article ...> or <div ...> containing Dr. or Dra.
        card_pattern = re.compile(
            r'(<(?:article|div|li)[^>]*class=["\'][^"\']*(?:doc|team|staff|especialista|member|facility|bento-item|card)[^"\']*["\'][^>]*>[\s\S]*?</(?:article|div|li)>)',
            re.IGNORECASE
        )

        def replace_doctor_card(match):
            nonlocal f_idx, m_idx
            card_html = match.group(1)

            # Check if this card represents a doctor
            # Must contain Dr. or Dra. or Doctor or Doctora
            has_dra = bool(re.search(r'\bDra\.\s+[A-ZÁÉÍÓÚÑ]', card_html))
            has_dr = bool(re.search(r'\bDr\.\s+[A-ZÁÉÍÓÚÑ]', card_html))

            if not (has_dra or has_dr):
                return card_html

            # Extract Doctor Name
            name_match = re.search(r'(?:<h3>|<h4[^>]*>|<strong>|<span[^>]*class="[^"]*name[^"]*"[^>]*>)\s*(Dr[a]?\.\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*)', card_html)
            if not name_match:
                # Try finding in whole card
                name_match = re.search(r'\b(Dr[a]?\.\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*)', card_html)

            doctor_name = name_match.group(1) if name_match else ("Dra. Especialista" if has_dra else "Dr. Especialista")

            # Extract Specialization if available
            spec_match = re.search(r'(?:<span>|<p[^>]*class="[^"]*role[^"]*"[^>]*>|<div[^>]*class="[^"]*role[^"]*"[^>]*>)\s*([^<\n]+)', card_html)
            spec_title = spec_match.group(1).strip() if spec_match else "Especialista Odontológico"

            # Pick portrait based on gender
            if has_dra and not (has_dr and not has_dra):
                portrait = FEMALE_DOCTORS[f_idx % len(FEMALE_DOCTORS)]
                f_idx += 1
            else:
                portrait = MALE_DOCTORS[m_idx % len(MALE_DOCTORS)]
                m_idx += 1

            new_src = portrait["src"]
            new_fallback = portrait["fallback"]
            alt_text = f"{doctor_name} · {spec_title}"

            # Check if current img has room or surgical ceiling photo
            # or if alt has room words
            def img_sub(img_match):
                full_img = img_match.group(0)
                # Replace src
                full_img = re.sub(r'src=["\'][^"\']+["\']', f'src="{new_src}"', full_img)
                # Replace alt
                full_img = re.sub(r'alt=["\'][^"\']*["\']', f'alt="{alt_text}"', full_img)
                # Replace onerror
                full_img = re.sub(r'onerror=["\'][^"\']+["\']', f'onerror="this.onerror=null;this.src=\'{new_fallback}\';"', full_img)
                return full_img

            new_card = re.sub(r'<img[^>]*>', img_sub, card_html, count=1)

            # Update data-title, data-sub, data-img on card tag if present
            def card_tag_sub(tag_match):
                tag = tag_match.group(0)
                # If tag has data-img, update it to high-res portrait
                if 'data-img=' in tag:
                    tag = re.sub(r'data-img=["\'][^"\']+["\']', f'data-img="{new_src}"', tag)
                if 'data-title=' in tag:
                    tag = re.sub(r'data-title=["\'][^"\']+["\']', f'data-title="{doctor_name} · {spec_title}"', tag)
                return tag

            new_card = re.sub(r'^<(?:article|div|li)[^>]*>', card_tag_sub, new_card)

            return new_card

        content = card_pattern.sub(replace_doctor_card, content)

        # Also replace any lingering catalog thumbnail references in data-img for any remaining cards
        content = re.sub(
            r'data-img=["\'](?:\.\./\.\./)?images/demos/salud/([^"\']+)["\']',
            r'data-img="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85"',
            content
        )

        if content != orig:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            fixed_count += 1
            print(f"[Salud] Updated {filepath}")

    print(f"Total Salud files updated: {fixed_count}")

def fix_peluqueria():
    files = sorted(glob.glob("demos/peluqueria/*.html"))
    fixed_count = 0

    for filepath in files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        orig = content
        f_idx = 0
        m_idx = 0

        # Pattern for stylist / barber / team cards
        card_pattern = re.compile(
            r'(<(?:article|div|li)[^>]*class=["\'][^"\']*(?:team|staff|stylist|barber|artist|member|master)[^"\']*["\'][^>]*>[\s\S]*?</(?:article|div|li)>)',
            re.IGNORECASE
        )

        def replace_stylist_card(match):
            nonlocal f_idx, m_idx
            card_html = match.group(1)

            # Determine if it is a barber/male or stylist/female
            is_barber = bool(re.search(r'\b(barber|barbero|fade|navaja|afeitado|don\s+[a-z]+|mateo|lucas|carlos|diego|julián|gaspar|claudio)\b', card_html, re.I))
            is_female = bool(re.search(r'\b(clara|sofía|sofia|camila|mía|mia|florencia|trinidad|amélie|amelie|lola|pepa|astrid|freja|elena|valentina|colorista|balayage|rubios)\b', card_html, re.I))

            # If not explicitly either, but has a name or role
            has_role = bool(re.search(r'\b(estilista|colorista|barbero|stylist|hair|artist|master)\b', card_html, re.I))
            if not (is_barber or is_female or has_role):
                return card_html

            if is_barber and not is_female:
                portrait = MALE_BARBERS[m_idx % len(MALE_BARBERS)]
                m_idx += 1
            else:
                portrait = FEMALE_STYLISTS[f_idx % len(FEMALE_STYLISTS)]
                f_idx += 1

            new_src = portrait["src"]
            new_fallback = portrait["fallback"]

            # Replace img tag
            def img_sub(img_match):
                full_img = img_match.group(0)
                # Check if current src is salon interior or broken
                full_img = re.sub(r'src=["\'][^"\']+["\']', f'src="{new_src}"', full_img)
                full_img = re.sub(r'onerror=["\'][^"\']+["\']', f'onerror="this.onerror=null;this.src=\'{new_fallback}\';"', full_img)
                return full_img

            new_card = re.sub(r'<img[^>]*>', img_sub, card_html, count=1)

            # Update data-img if present
            def card_tag_sub(tag_match):
                tag = tag_match.group(0)
                if 'data-img=' in tag:
                    tag = re.sub(r'data-img=["\'][^"\']+["\']', f'data-img="{new_src}"', tag)
                return tag

            new_card = re.sub(r'^<(?:article|div|li)[^>]*>', card_tag_sub, new_card)

            return new_card

        content = card_pattern.sub(replace_stylist_card, content)

        # Also replace lingering catalog thumbnails in data-img
        content = re.sub(
            r'data-img=["\'](?:\.\./\.\./)?images/demos/peluqueria/([^"\']+)["\']',
            r'data-img="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85"',
            content
        )

        if content != orig:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            fixed_count += 1
            print(f"[Peluqueria] Updated {filepath}")

    print(f"Total Peluqueria files updated: {fixed_count}")

def fix_fotografia_data_img():
    files = sorted(glob.glob("demos/fotografia/*.html"))
    fixed_count = 0

    for filepath in files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        orig = content
        # Replace lingering catalog thumbnail references in data-img
        content = re.sub(
            r'data-img=["\'](?:\.\./\.\./)?images/demos/fotografia/([^"\']+)["\']',
            r'data-img="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"',
            content
        )

        if content != orig:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            fixed_count += 1
            print(f"[Fotografia] Updated {filepath}")

    print(f"Total Fotografia files updated: {fixed_count}")

if __name__ == '__main__':
    fix_clinica_dental()
    fix_peluqueria()
    fix_fotografia_data_img()

