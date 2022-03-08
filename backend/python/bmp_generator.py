from PIL import Image
import json
import requests

url = 'https://services.swpc.noaa.gov/json/ovation_aurora_latest.json'
r = requests.get(url, allow_redirects=True)
open('latest.json', 'wb').write(r.content)

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
    if (i[1] < -3 or i[1] > 3):
        pixels[i[0], min(i[1]+90, 179)] = (123, 173, 123, i[2]*30)

# Closing file
f.close()

# Save image to disk
img.save("latest.png", "PNG")
