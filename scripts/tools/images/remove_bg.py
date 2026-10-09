import os
from PIL import Image

src_dir = r"E:\Download_E\create-an-image-of-3\assets\Mochiheader"
dest_dir = r"E:\Download_E\create-an-image-of-3\header_qlove\assets\images\mochiheader"

os.makedirs(dest_dir, exist_ok=True)

def remove_white(img_path, dest_path):
    img = Image.open(img_path).convert("RGBA")
    data = img.getdata()
    new_data = []
    for item in data:
        # Check if the pixel is white-ish (tolerance up to 240 to catch compression artifacts)
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
    img.putdata(new_data)
    img.save(dest_path, "PNG")
    print(f"Processed {os.path.basename(img_path)}")

for f in os.listdir(src_dir):
    if f.lower().endswith(".png") or f.lower().endswith(".jpg"):
        # Rename complex names if necessary, but preserving original is fine too. Let's rename the dorayaki one for simplicity.
        out_name = f
        if "Dorayaki" in f:
            out_name = "DORAYAKI.png"
        remove_white(os.path.join(src_dir, f), os.path.join(dest_dir, out_name))
