import re

old_path = r'E:\Download_E\create-an-image-of-3\demos\qlove_dessert_platter_FINAL_v2_ZOOM.html'
new_path = r'E:\Download_E\create-an-image-of-3\demos\qlove_3d_product_demo_v7_custom_bg_floating_petals.html'

with open(old_path, 'r', encoding='utf-8') as f:
    old_html = f.read()

with open(new_path, 'r', encoding='utf-8') as f:
    new_html = f.read()

# 1. Extract CSS
css_match = re.search(r'(\.custom-bg\s*\{.*?\})\s*</style>', new_html, re.DOTALL)
custom_css = css_match.group(1) if css_match else ""

# 2. Extract JS
js_match = re.search(r'(const petalsLayer = document\.querySelector\("#petalsLayer"\);.*?createPetals\(22\);)', new_html, re.DOTALL)
custom_js = js_match.group(1) if js_match else ""

# 3. Clean old HTML background
old_html = re.sub(r'#qlove-dessert-platter::before\s*\{.*?\}', '#qlove-dessert-platter::before{display:none;}', old_html, flags=re.DOTALL)
old_html = re.sub(r'#qlove-dessert-platter::after\s*\{.*?\}', '#qlove-dessert-platter::after{display:none;}', old_html, flags=re.DOTALL)
old_html = re.sub(r'body\s*\{\s*margin:0;\s*background:#f5efec;\s*\}', 'body{margin:0; background:transparent;}', old_html)

# Remove background from #qlove-dessert-platter block if it exists
def remove_bg(match):
    block = match.group(0)
    block = re.sub(r'background:.*?;', '', block, flags=re.DOTALL)
    block = re.sub(r'background-size:.*?;', '', block, flags=re.DOTALL)
    return block
old_html = re.sub(r'#qlove-dessert-platter\s*\{.*?\}', remove_bg, old_html, flags=re.DOTALL, count=1)

# Inject custom CSS
old_html = old_html.replace('</style>', custom_css + '\n</style>')

# 4. Inject HTML background
bg_html = """
  <div class="custom-bg" style="z-index:-10;"></div>
  <div class="bg-soft-overlay" style="z-index:-9;"></div>
  <div class="petals-layer" id="petalsLayer" style="z-index:-8; position:absolute; inset:0; pointer-events:none;"></div>
"""
old_html = old_html.replace('<section id="qlove-dessert-platter" aria-labelledby="qdp-title">', '<section id="qlove-dessert-platter" aria-labelledby="qdp-title">\n' + bg_html)

# 5. Inject custom JS
old_html = old_html.replace('const scene = new THREE.Scene();', 'const scene = new THREE.Scene();\n\n' + custom_js)

with open(old_path, 'w', encoding='utf-8') as f:
    f.write(old_html)

print("Updated Old HTML with New Background and Petals")
