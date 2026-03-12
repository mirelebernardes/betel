from PIL import Image
import os

def process_logo():
    # Load the newly provided logo
    original_path = '/Users/mirelebernardes/.gemini/antigravity/brain/bc536422-e80c-40bb-b018-2885309d6427/media__1773354993070.png'
    dest_path = '/Users/mirelebernardes/Desktop/betel/logo.png'
    
    img = Image.open(original_path).convert("RGBA")
    print(f"Original logo size: {img.size}")
    
    # Get bounding box of non-transparent pixels
    bbox = img.getbbox()
    print(f"Bounding box: {bbox}")
    
    if bbox:
        # Crop to contents
        cropped = img.crop(bbox)
        
        # Add a tiny bit of padding (e.g., 10px on all sides) to avoid edge cut-offs on the site
        pad = 10
        padded_size = (cropped.width + pad * 2, cropped.height + pad * 2)
        final_img = Image.new("RGBA", padded_size, (255, 255, 255, 0))
        final_img.paste(cropped, (pad, pad))
        
        final_img.save(dest_path)
        print(f"Cropped and padded logo saved to {dest_path}. Size: {final_img.size}")
    else:
        print("Could not find bounding box, saving original.")
        img.save(dest_path)

process_logo()
