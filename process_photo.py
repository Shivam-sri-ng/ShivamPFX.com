import os
import sys
from PIL import Image

def process_image(input_file, output_file):
    print(f"Processing {input_file} -> {output_file}")
    img = Image.open(input_file).convert("RGBA")
    width, height = img.size
    
    # Process pixels to remove light background (white / off-white studio background)
    datas = img.getdata()
    new_data = []
    
    for item in datas:
        r, g, b, a = item
        # Light studio background threshold check
        if r > 195 and g > 195 and b > 195:
            # Color variance check
            diff = max(abs(r - g), abs(g - b), abs(r - b))
            if diff < 30:
                # Calculate smooth alpha transparency gradient
                brightness = (r + g + b) / 3.0
                if brightness > 235:
                    new_data.append((255, 255, 255, 0))
                else:
                    alpha = int(255 * (1.0 - (brightness - 195) / 40.0))
                    new_data.append((r, g, b, max(0, min(255, alpha))))
            else:
                new_data.append(item)
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_file, "PNG")
    print("[SUCCESS] Image background removed and saved successfully!")

if __name__ == "__main__":
    input_p = "client/public/profile.jpg"
    output_p = "client/public/profile-nobg.png"
    if os.path.exists(input_p):
        process_image(input_p, output_p)
    else:
        print("Input file not found:", input_p)
