from PIL import Image

def remove_white_bg(input_path, output_path, tolerance=50):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    # Find bounding box manually after removing white
    min_x, min_y = img.width, img.height
    max_x, max_y = 0, 0
    
    for y in range(img.height):
        for x in range(img.width):
            item = img.getpixel((x, y))
            # Check if it's close to white
            if item[0] > 255 - tolerance and item[1] > 255 - tolerance and item[2] > 255 - tolerance:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    img.putdata(new_data)
    
    # Crop to non-transparent bounding box
    if min_x < max_x and min_y < max_y:
        img = img.crop((min_x, min_y, max_x + 1, max_y + 1))
        
        # Add padding
        pad = 10
        padded_size = (img.width + pad * 2, img.height + pad * 2)
        final_img = Image.new("RGBA", padded_size, (255, 255, 255, 0))
        final_img.paste(img, (pad, pad))
        final_img.save(output_path)
        print(f"Saved transparent cropped logo to {output_path}")
    else:
        print("Error cropping image.")

remove_white_bg('/Users/mirelebernardes/.gemini/antigravity/brain/bc536422-e80c-40bb-b018-2885309d6427/media__1773354993070.png', '/Users/mirelebernardes/Desktop/betel/logo.png', tolerance=15)
