import os

# 1. Read the original index.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# 2. In index.html, replace qlove-main.js with demo-4seri-main.js and change title
demo_html = index_html.replace(
    '<title>QLove Mochi</title>',
    '<title>QLove Mochi - 4 Seri Showcase Demo</title>'
).replace(
    '<script src="/scripts/qlove-main.js"></script>',
    '<script src="/scripts/demo-4seri-main.js"></script>'
)

with open('DEMO_4Serri.html', 'w', encoding='utf-8') as f:
    f.write(demo_html)

# 3. Read the original scripts/qlove-main.js
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
      { id: 'custard-168g', label: 'CUSTARD 168g', products: custard, markup: integratedChapter({id:'custard-168g',index:12,title:'Custard Mochi',subtitle:'Soft lens focus · three bright flavours.',motion:'custard',entry:'cream',exit:'pearls',items:custard}) },
      { id: 'boba-pouch-120g', label: 'BOBA POUCH', products: boba, markup: integratedChapter({id:'boba-pouch-120g',index:13,title:'Boba Standing Pouch',subtitle:'Gravity room · pearls in motion.',motion:'boba',entry:'pearls',exit:'bands',items:boba}) }
    ];"""

demo_js = qlove_js.replace(old_series_part, new_series_part)

with open('scripts/demo-4seri-main.js', 'w', encoding='utf-8') as f:
    f.write(demo_js)

print("Generated DEMO_4Serri.html and scripts/demo-4seri-main.js successfully!")
