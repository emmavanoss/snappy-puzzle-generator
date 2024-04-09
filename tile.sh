#!/bin/bash

INPUT_PATH=$1
OUT_DIR=$2

INPUT_FILE="$(basename $INPUT_PATH)"

CROPPED_FILE="$INPUT_FILE-cropped.png"

echo "Cropping $INPUT_FILE..."

convert -gravity center -resize 256x256^ -extent 256x256 $INPUT_PATH $CROPPED_FILE

echo "Tiling $CROPPED_FILE..."

convert $CROPPED_FILE -crop 64x64 +repage +adjoin "$OUT_DIR/tile_$INPUT_FILE.%02d.png"

echo "Deleting temporary cropped file..."

rm $CROPPED_FILE

echo "Done"
