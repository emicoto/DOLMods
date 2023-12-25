import os
import json

#directory file path
folder_path = os.path.dirname(os.path.realpath(__file__))

def list_images(folder_path):
    image_paths = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                image_paths.append(os.path.join(root, file))
    return image_paths

def create_json(image_paths, json_filename):
    with open(json_filename, 'w') as json_file:
        json.dump(image_paths, json_file, indent=2)

json_filename = 'imagepath.json'

image_paths = list_images(folder_path)

create_json(image_paths, json_filename)