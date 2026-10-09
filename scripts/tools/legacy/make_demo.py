import json

meta = {
    28: {'label': 'Traditional Mix', 'accent': '#e4b55d', 'desc': 'Classic QLove favourites brought together in one shareable box.', 'tags': ['180G', 'MIX', 'CLASSIC']},
    29: {'label': 'Fruity Mix', 'accent': '#ef7d8f', 'desc': 'A bright fruit-forward assortment with a playful colourful mood.', 'tags': ['180G', 'MIX', 'FRUITY']},
    16: {'label': 'Creamy Lychee', 'accent': '#eca2b7', 'desc': 'Floral lychee notes wrapped around a smooth creamy centre.', 'tags': ['180G', 'FLORAL', 'CREAMY']},
    17: {'label': 'Creamy Mango', 'accent': '#f2a23a', 'desc': 'Sunny mango flavour balanced by a mellow creamy filling.', 'tags': ['180G', 'TROPICAL', 'SMOOTH']},
    18: {'label': 'Creamy Passion Fruit', 'accent': '#e0af35', 'desc': 'Tangy passion fruit with a vivid fruit layer and silky finish.', 'tags': ['180G', 'TANGY', 'SILKY']},
    19: {'label': 'Creamy Blueberry', 'accent': '#7775c8', 'desc': 'Deep blueberry character with a soft and velvety cream core.', 'tags': ['180G', 'BERRY', 'VELVETY']},
    20: {'label': 'Creamy Strawberry', 'accent': '#e96c7b', 'desc': 'Familiar strawberry sweetness with a playful creamy centre.', 'tags': ['180G', 'SWEET', 'PLAYFUL']},
    21: {'label': 'Creamy Hami Melon', 'accent': '#98c96f', 'desc': 'Fresh hami melon notes with a mellow creamy finish.', 'tags': ['180G', 'FRESH', 'MELLOW']},
    30: {'label': 'Raspberry Custard', 'accent': '#d95c7c', 'desc': 'Tart raspberry personality softened by a creamy custard finish.', 'tags': ['168G', 'TART', 'CUSTARD']},
    31: {'label': 'Kiwi Custard', 'accent': '#80b45d', 'desc': 'Fresh kiwi character with a smooth, softly zesty custard centre.', 'tags': ['168G', 'FRESH', 'SMOOTH']},
    32: {'label': 'Lemon Custard', 'accent': '#e8ce4f', 'desc': 'Clean citrus brightness balanced by a gentle custard profile.', 'tags': ['168G', 'CITRUS', 'SOFT']},
    37: {'label': 'Boba Milk Tea', 'accent': '#c9955e', 'desc': 'Classic milk tea character with the soft, chewy mood of boba mochi.', 'tags': ['120G', 'BOBA', 'CLASSIC']},
    38: {'label': 'Boba Brown Sugar', 'accent': '#8e5a3b', 'desc': 'Brown sugar notes with caramel-like depth and a chewy finish.', 'tags': ['120G', 'BOBA', 'CARAMEL']},
    39: {'label': 'Boba Creme Brulee', 'accent': '#e4b66a', 'desc': 'Custardy sweetness with a gently toasted dessert-like nuance.', 'tags': ['120G', 'BOBA', 'TOASTED']}
}

boba_images = {
    37: 'assets/BOBA/2.png',
    38: 'assets/BOBA/3.png',
    39: 'assets/BOBA/1.png'
}

def get_img(num, motion):
    if motion == 'boba':
        return boba_images.get(num, f'assets/qlove/products-cutout/{num}.png')
    return f'assets/qlove/products-cutout/{num}.png'

def get_size(num):
    if num in [28, 29, 16, 17, 18, 19, 20, 21]:
        return '180g'
    if num in [30, 31, 32]:
        return '168g'
    return '120g'

def render_transition(t_type, count=0):
    if t_type == 'doors':
        return '<i class="qlove-motion-door qlove-motion-door--left"></i><i class="qlove-motion-door qlove-motion-door--right"></i>'
    if t_type == 'cream':
        cores = ''.join([f'<i class="qlove-motion-cream-core" data-core="{i}"></i><i class="qlove-motion-cream-ribbon" data-ribbon="{i}"></i>' for i in range(count or 6)])
        return f'<i class="qlove-motion-cream-pool"></i><i class="qlove-motion-cream-wave"></i>{cores}'
    if t_type == 'pearls':
        pearls = ''.join([f'<i class="qlove-motion-pearl" style="--pearl-i:{i}"></i>' for i in range(18)])
        return f'<span class="qlove-motion-pearl-field">{pearls}</span>'
    if t_type == 'bands':
        return '<i class="qlove-motion-band qlove-motion-band--a"></i><i class="qlove-motion-band qlove-motion-band--b"></i>'
    return ''

def render_chapter(id, title, subtitle, motion, entry, exit, item_nums):
    prods = []
    for i, num in enumerate(item_nums):
        m = meta[num]
        tags_str = '|'.join(m['tags'])
        img_src = get_img(num, motion)
        size = get_size(num)
        btn = f'''          <button class="qlove-motion-product" type="button" data-index="{i}" data-number="{num}" data-accent="{m['accent']}" data-name="{m['label']}" data-description="{m['desc']}" data-tags="{tags_str}" style="--product-accent:{m['accent']};--product-order:{i}" aria-label="Explore {m['label']}" aria-pressed="false">
            <span class="qlove-motion-product__glow" aria-hidden="true"></span>
            <img src="{img_src}" alt="{m['label']}" loading="lazy" decoding="async" width="1000" height="1000">
            <span class="qlove-motion-product__label"><strong>{m['label']}</strong><small>{size}</small></span>
            <span class="qlove-motion-product__cue">Click to explore</span>
          </button>'''
        prods.append(btn)
    
    prods_html = '\n'.join(prods)
    lens_html = '<i class="qlove-motion-lens" aria-hidden="true"></i>' if motion == 'custard' else ''
    pearls_html = render_transition('pearls') if motion == 'boba' else ''
    entry_html = render_transition(entry, len(item_nums))
    exit_html = render_transition(exit, len(item_nums))
    
    return f'''    <section class="qlove-motion-chapter" id="{id}" data-motion="{motion}" data-entry="{entry}" data-exit="{exit}" aria-labelledby="{id}-title">
      <div class="qlove-motion-chapter__sticky">
        <div class="qlove-motion-chapter__background" aria-hidden="true"></div>
        <div class="qlove-motion-chapter__grain" aria-hidden="true"></div>
        <header class="qlove-motion-chapter__head">
          <h2 id="{id}-title">{title}</h2>
          <span>{subtitle}</span>
        </header>
        <div class="qlove-motion-chapter__scene">
          <strong class="qlove-motion-chapter__ghost" aria-hidden="true">{motion.upper()}</strong>
          {lens_html}
          {pearls_html}
          <div class="qlove-motion-transition qlove-motion-transition--entry" aria-hidden="true">{entry_html}</div>
          <div class="qlove-motion-transition qlove-motion-transition--exit" aria-hidden="true">{exit_html}</div>
          <div class="qlove-motion-products" role="group" aria-label="{title} products">
{prods_html}
          </div>
          <div class="qlove-motion-flavour-bubbles" aria-hidden="true"></div>
        </div>
        <button class="qlove-motion-overlay" type="button" aria-label="Close product details" tabindex="-1"></button>
        <aside class="qlove-motion-panel" role="dialog" aria-modal="false" aria-hidden="true" aria-label="Product details">
          <button class="qlove-motion-panel__x" type="button" aria-label="Close product details">&times;</button>
          <span class="qlove-motion-panel__count"></span>
          <h3></h3>
          <p></p>
          <div class="qlove-motion-panel__tags"></div>
        </aside>
        <p class="qlove-motion-chapter__hint">Hover to highlight &middot; Click to explore</p>
      </div>
    </section>'''

chap1 = render_chapter('mix-180g', 'QLove Mix Mochi', 'Two assortments &middot; one split story.', 'mix', 'none', 'doors', [28, 29])
chap2 = render_chapter('double-filling', 'Double Filling', 'Six creamy centres in a slow flavour orbit.', 'double', 'doors', 'cream', [16, 17, 18, 19, 20, 21])
chap3 = render_chapter('custard-168g', 'Custard Mochi', 'Soft lens focus &middot; three bright flavours.', 'custard', 'cream', 'pearls', [30, 31, 32])
chap4 = render_chapter('boba-pouch-120g', 'Boba Standing Pouch', 'Gravity room &middot; pearls in motion.', 'boba', 'pearls', 'none', [37, 38, 39])

full_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QLove 4 Series Demo (Mix Mochi to Boba Standing Pouch)</title>
  <link rel="stylesheet" href="styles/demo-4seri.css">
  <style>
    *, *::before, *::after {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}
    html {{
      font-family: Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8f3ec;
      color: #211d1a;
      scroll-behavior: smooth;
    }}
    body {{
      overflow-x: clip;
    }}
    /* Top Navigation Bar */
    .demo-nav {{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      display: flex;
      justify-content: center;
      gap: 10px;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }}
    .demo-nav a {{
      padding: 7px 16px;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      text-decoration: none;
      color: #211d1a;
      border: 1px solid rgba(0, 0, 0, 0.12);
      border-radius: 99px;
      transition: all 0.2s ease;
      white-space: nowrap;
    }}
    .demo-nav a:hover, .demo-nav a.active {{
      background: #211d1a;
      color: #fff;
      border-color: #211d1a;
    }}
  </style>
</head>
<body>

  <!-- Sticky Top Navigation -->
  <nav class="demo-nav" aria-label="Series navigation">
    <a href="#mix-180g" class="active">01. Mix 180g</a>
    <a href="#double-filling">02. Double Filling</a>
    <a href="#custard-168g">03. Custard 168g</a>
    <a href="#boba-pouch-120g">04. Boba Standing Pouch</a>
  </nav>

  <!-- 4 Interactive Chapters -->
{chap1}

{chap2}

{chap3}

{chap4}

  <!-- Scripts -->
  <script src="assets/gsap.min.js"></script>
  <script src="assets/ScrollTrigger.min.js"></script>
  <script src="scripts/qlove-integrated-motion.js"></script>
  <script>
    // Smooth navigation active state
    const navLinks = document.querySelectorAll('.demo-nav a');
    const sections = document.querySelectorAll('.qlove-motion-chapter');
    window.addEventListener('scroll', () => {{
      let current = '';
      sections.forEach(sec => {{
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (window.pageYOffset >= top - height / 3) {{
          current = sec.getAttribute('id');
        }}
      }});
      if (current) {{
        navLinks.forEach(link => {{
          link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        }});
      }}
    }}, {{ passive: true }});
  </script>
</body>
</html>
'''

with open('DEMO_4Serri.html', 'w', encoding='utf-8') as f:
    f.write(full_html)

print('Generated DEMO_4Serri.html successfully!')
