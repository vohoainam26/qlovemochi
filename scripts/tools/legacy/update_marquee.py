import re

file_path = r"E:\Download_E\create-an-image-of-3\scripts\qlove-main.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the pack image with the Qlove logo
content = re.sub(
    r'<img class="qlove-marquee__pack"[^>]*>',
    r'<img class="qlove-marquee__pack" src="/header_qlove/assets/images/qlove-logo-den.png" alt="QLove Logo" loading="lazy" style="background: white; padding: 10px; border-radius: 20px;">',
    content
)

flavors = ["MATCHA", "STRAWBERRY", "MANGO", "LYCHEE", "CHOCOLATE", "BLUEBERRY", "COCONUT", "CUSTARD", "PISTACHIO", "YUZU", "MATCHA", "STRAWBERRY"]

def process_rail(match):
    rail_html = match.group(0)
    # Split by QLOVE
    parts = re.split(r'QLOVE', rail_html)
    res = parts[0]
    for i in range(1, len(parts)):
        flavor = flavors[(i - 1) % len(flavors)]
        res += flavor + parts[i]
    return res

content = re.sub(r'<div class="qlove-marquee__rail.*?</div>', process_rail, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
