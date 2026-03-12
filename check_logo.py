from PIL import Image

img = Image.open('logo.png').convert("RGBA")
print(f"Original size: {img.size}")
bbox = img.getbbox()
print(f"Bounding box (non-transparent area): {bbox}")
