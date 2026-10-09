import re, base64, json
from PIL import Image

with open('E:/Download_E/qlove-dorayaki-final-sticky-scroll.html', 'r', encoding='utf-8') as f:
    html = f.read()

m = re.search(r'const scenes = (\[.*?\]);\s*const ingredientNames', html, re.DOTALL)
if m:
    data = json.loads(m.group(1))
    for i, s in enumerate(data):
        b64 = s['pack'].split('base64,')[1]
        out_name = f'assets/qlove/dorayaki-pack-demo-{i+1}.png'
        with open(out_name, 'wb') as of:
            of.write(base64.b64decode(b64))
        im = Image.open(out_name)
        bbox = im.getbbox()
        cropped = im.crop(bbox)
        cropped_name = f'assets/qlove/dorayaki-pack-crop-{i+1}.png'
        cropped.save(cropped_name)
        print('Pack', i+1, s['name'], 'size:', im.size, 'bbox:', bbox, 'cropped:', cropped.size)
else:
    print('Pattern not matched')
