from PIL import Image, ImageDraw, ImageFont

# Step 1: Create a blank white image (you can adjust size)
img = Image.new('RGB', (1000, 600), color=(255, 255, 255))
draw = ImageDraw.Draw(img)

# Step 2: Load a handwriting-like font (you can download better ones below)
font_path = "C:\\Windows\\Fonts\\seguisbi.ttf"  # Use any installed .ttf font
font = ImageFont.truetype(font_path, 22)

# Step 3: Define the text
text = """Python is an interpreted high-level general-purpose programming language.
Its design philosophy emphasizes code readability with its use of significant indentation."""

# Step 4: Handle line wrapping manually (optional improvement)
x, y = 40, 40
for line in text.split('\n'):
    draw.text((x, y), line, font=font, fill=(0, 0, 138))
    y += 40  # Move to next line

# Step 5: Save the image 
img.save("demo1.png")
print("✅ Image saved as demo1.png")
