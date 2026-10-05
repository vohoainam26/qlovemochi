import re

file_path = r"E:\Download_E\create-an-image-of-3\scripts\qlove-main.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Remove the inline background style
content = content.replace('style="background: white; padding: 10px; border-radius: 20px;"', '')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
