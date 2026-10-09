import os

# 1. Create clean DEMO_4Serri.html with only head, styles, and <main id="qlove-main">
clean_html = """<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="QLove Mochi - 4 Seri Showcase" />
    <title>QLove Mochi - 4 Seri Showcase</title>
    <link rel="icon" href="data:," />
    <link rel="stylesheet" href="/styles/qlove-main.css" />
    <link rel="stylesheet" href="/styles/qlove-integrated-motion.css" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: #f8f7f4;
        color: #1a1a1a;
        font-family: Poppins, Arial, sans-serif;
        overflow-x: clip;
      }
      #qlove-main {
        width: 100%;
        min-height: 100vh;
      }
      .qlove-jump {
        position: sticky;
        top: 0;
        z-index: 100;
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(12px);
      }
    </style>
  </head>
  <body id="top">
    <main id="qlove-main" aria-live="polite"></main>
    <script src="/assets/gsap.min.js"></script>
    <script src="/assets/ScrollTrigger.min.js"></script>
    <script src="/scripts/demo-4seri-main.js"></script>
    <script src="/scripts/qlove-integrated-motion.js"></script>
  </body>
</html>
"""

with open('DEMO_4Serri.html', 'w', encoding='utf-8') as f:
    f.write(clean_html)

# 2. Update scripts/demo-4seri-main.js so that root.innerHTML ONLY contains jumpNav and seriesMarkup
with open('scripts/qlove-main.js', 'r', encoding='utf-8') as f:
    qlove_js = f.read()

old_series_part = """    const series = [
      { id: 'mini-mochi', label: 'MINI 80g', products: mini, markup: miniShowcase(mini) },
      { id: 'extra-to-love', label: 'EXTRA TO LOVE', products: premiumOrder, markup: extraMiniShowcase(premiumOrder) },
      { id: 'deluxe-pouch-120g', label: 'DELUXE POUCH', products: deluxePouch, markup: pouchJourney(deluxePouch) },
      { id: 'deluxe-mochi', label: 'DELUXE MOCHI', products: deluxeMochi, markup: deluxeShowcase(deluxeMochi) },
      { id: 'dorayaki', label: 'DORAYAKI', products: dora, markup: dorayakiShowcase(dora) },
      { id: 'snowflake', label: 'SNOWFLAKE', products: snow, markup: snowflakeShowcase(snow) },
      { id: 'dessert-platter', label: 'DESSERT PLATTER', products: mix450, markup: dessertPlatterCollection() },
      { id: 'traditional-mochi', label: 'TRADITIONAL 180g', products: traditional, markup: traditionalCollection(traditional) },
      { id: 'mix-180g', label: 'MIX 180g', products: mixed, markup: integratedChapter({id:'mix-180g',index:10,title:'QLove Mix Mochi',subtitle:'Two assortments · one split story.',motion:'mix',entry:'none',exit:'doors',items:mixed}) },
      { id: 'double-filling', label: 'DOUBLE FILLING', products: double, markup: integratedChapter({id:'double-filling',index:11,title:'Double Filling',subtitle:'Six creamy centres in a slow flavour orbit.',motion:'double',entry:'doors',exit:'cream',items:double}) },
      { id: 'custard-168g', label: 'CUSTARD 168g', products: custard, markup: integratedChapter({id:'custard-168g',index:12,title:'Custard Mochi',subtitle:'Soft lens focus · three bright flavours.',motion:'custard',entry:'cream',exit:'pearls',items:custard}) },
      { id: 'boba-pouch-120g', label: 'BOBA POUCH', products: boba, markup: integratedChapter({id:'boba-pouch-120g',index:13,title:'Boba Standing Pouch',subtitle:'Gravity room · pearls in motion.',motion:'boba',entry:'pearls',exit:'bands',items:boba}) },
      { id: 'pouch-mix-120g', label: 'POUCH MIX', products: pouchMix, markup: integratedChapter({id:'pouch-mix-120g',index:14,title:'QLove Pouch Mix',subtitle:'Two moving shelves · six pouch personalities.',motion:'pouch',entry:'bands',exit:'greenwash',items:pouchMix}) },
      { id: 'dubai', label: 'DUBAI', products: dubai, markup: integratedChapter({id:'dubai',index:15,title:'Dubai Style',subtitle:'Chocolate · pistachio · kunafa.',motion:'dubai',entry:'greenwash',exit:'none',items:dubai,dark:true}) }
    ];"""

new_series_part = """    const series = [
      { id: 'mix-180g', label: 'MIX 180g', products: mixed, markup: integratedChapter({id:'mix-180g',index:1,title:'QLove Mix Mochi',subtitle:'Two assortments · one split story.',motion:'mix',entry:'none',exit:'doors',items:mixed}) },
      { id: 'double-filling', label: 'DOUBLE FILLING', products: double, markup: integratedChapter({id:'double-filling',index:2,title:'Double Filling',subtitle:'Six creamy centres in a slow flavour orbit.',motion:'double',entry:'doors',exit:'cream',items:double}) },
      { id: 'custard-168g', label: 'CUSTARD 168g', products: custard, markup: integratedChapter({id:'custard-168g',index:3,title:'Custard Mochi',subtitle:'Soft lens focus · three bright flavours.',motion:'custard',entry:'cream',exit:'pearls',items:custard}) },
      { id: 'boba-pouch-120g', label: 'BOBA POUCH', products: boba, markup: integratedChapter({id:'boba-pouch-120g',index:4,title:'Boba Standing Pouch',subtitle:'Gravity room · pearls in motion.',motion:'boba',entry:'pearls',exit:'none',items:boba}) }
    ];"""

demo_js = qlove_js.replace(old_series_part, new_series_part)

# Now replace root.innerHTML assignment
# Find start: root.innerHTML = `
# and find end: initQloveIntroTransition();

start_idx = demo_js.find('root.innerHTML = `')
end_idx = demo_js.find('initQloveIntroTransition();')

if start_idx != -1 and end_idx != -1:
    new_render_code = """root.innerHTML = `
      ${jumpNav}
      ${seriesMarkup}
    `;
    initCategoryNav();
    """
    demo_js = demo_js[:start_idx] + new_render_code + demo_js[end_idx:]

with open('scripts/demo-4seri-main.js', 'w', encoding='utf-8') as f:
    f.write(demo_js)

print("Generated clean DEMO_4Serri.html & scripts/demo-4seri-main.js successfully!")
