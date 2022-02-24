from PIL import Image
import json


# Opening JSON file
f = open('latest.json')

# load json data into memore
data = json.load(f)

# Create blank image
img = Image.new('RGBA', (360, 180), "#ffffff00")

# Create pixel map
pixels = img.load()

# map coordinates to respective pixel and set color to green with varying opacity
for i in data['coordinates']:
    pixels[i[0], min(i[1]+90, 179)] = (123, 173, 123, i[2]*30)

# Closing file
f.close()

# Save image to disk
img.save("borealis_cover.png", "PNG")
