# =======
# This script processes all .jpg files in the directory ../src/images
# relative to the location of the script. It checks the EXIF orientation 
# metadata of each image and rotates the image if needed to correct its 
# orientation. After rotating, the EXIF orientation is reset to "Horizontal 
# (normal)" to ensure the metadata is consistent with the visual rotation. 
# This script modifies the original images in place, overwriting them with 
# the corrected versions. It's useful for batch fixing images that have 
# incorrect EXIF rotation data (commonly seen in photos taken with phones or cameras).
# 
# Requirements:
# - ExifTool for reading and resetting EXIF metadata.
# - ImageMagick's convert command for rotating the images.
# 
# Usage:
# Run this script from the terminal: ./fix_orientation.sh
# It will process every .jpg file in the ../src/images directory relative to 
# the script location.
# =======

#!/bin/bash

# Get the directory where the script is located
script_dir=$(dirname "$(realpath "$0")")

# Set the target directory (relative to the script's location)
image_dir="$script_dir/../src/images"

# Check if the directory exists
if [ ! -d "$image_dir" ]; then
  echo "Error: Directory '$image_dir' does not exist."
  exit 1
fi

# Iterate over each .jpg file in the target directory
for image_name in "$image_dir"/*.jpg; do
  # Check if any .jpg files exist in the directory
  if [ ! -f "$image_name" ]; then
    continue
  fi

  # Extract the EXIF orientation tag using ExifTool
  orientation=$(exiftool -Orientation -s -s -s "$image_name")

  # If orientation is normal (Horizontal (normal)), no rotation is needed
  case "$orientation" in
    "Horizontal (normal)")
      ;;
    "Rotate 90 CW") # 90 degrees clockwise
      convert "$image_name" -rotate 90 "$image_name"  # Overwrites the original file
      ;;
    "Rotate 180") # 180 degrees
      convert "$image_name" -rotate 180 "$image_name"  # Overwrites the original file
      ;;
    "Rotate 270 CW") # 90 degrees counterclockwise
      convert "$image_name" -rotate -90 "$image_name"  # Overwrites the original file
      ;;
    *)
      echo "Unknown orientation value for '$image_name': $orientation"  # You can keep or remove this
      ;;
  esac

  # Reset EXIF orientation to normal (Horizontal (normal)) and overwrite the original file
  exiftool -quiet -Orientation="Horizontal (normal)" "$image_name" -overwrite_original
done

