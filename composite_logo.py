from PIL import Image

def composite():
    truck = Image.open('about_truck_raw.png').convert("RGBA")
    logo = Image.open('logo.png').convert("RGBA")

    # Resize logo
    target_width = 400
    ratio = target_width / logo.width
    logo = logo.resize((target_width, int(logo.height * ratio)))
    
    # Slight perspective/rotation if needed. Let's just do a tiny rotation to match perspective
    logo = logo.rotate(1, expand=True)

    # We will place it on the right side of the image, where the trailer usually is.
    # Center-right.
    # The image is 1024x1024
    truck.alpha_composite(logo, (500, 480))
    
    truck.convert("RGB").save('about_truck.png')

composite()
print("Composited image successfully.")
