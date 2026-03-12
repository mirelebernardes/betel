from PIL import Image

def process_logo():
    img = Image.open('logo.png').convert("RGBA")
    print(f"Original size: {img.size}")
    bbox = img.getbbox()
    print(f"Bounding box (non-transparent area): {bbox}")
    if bbox:
        # crop and override original image to make it proportionally larger
        cropped_img = img.crop(bbox)
        # Give it a small padding around the logo so it's not perfectly flushed, say 20px
        padded_size = (cropped_img.width + 40, cropped_img.height + 40)
        final_img = Image.new("RGBA", padded_size, (255, 255, 255, 0))
        final_img.paste(cropped_img, (20, 20))
        final_img.save('logo.png')
        print(f"Cropped logo size: {final_img.size}")
        
process_logo()
