#!/usr/bin/env bash
# Regenerates the favicon set in public/ from the island in public/libc-logo.png.
# Needs ImageMagick 7 (`magick`). Run from the repo root: scripts/favicon.sh
set -euo pipefail

OUT=public
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

# The island is the top part of the logo; tilt it so it fills a square.
magick "$OUT/libc-logo.png" -crop 497x165+0+0 +repage -trim +repage \
  -background none -rotate -22 -trim +repage -resize 920x "$TMP/island.png"

# White silhouette of the island.
magick "$TMP/island.png" -alpha extract -threshold 35% -strip PNG8:"$TMP/alpha.png"
magick -size "$(magick identify -format '%wx%h' "$TMP/island.png")" xc:'#ffffff' \
  -type TrueColor PNG24:"$TMP/white.png"
magick "$TMP/white.png" "$TMP/alpha.png" -alpha off -compose CopyOpacity -composite \
  PNG32:"$TMP/silhouette.png"

# Brand gradient (the island's own blue -> purple -> pink), bottom-left to top-right.
magick -size 1024x1024 xc:black -type TrueColor -sparse-color bilinear \
  '0,1023 #2f7fc8 0,0 #6d3fa3 1023,1023 #6d3fa3 1023,0 #d0609c' PNG24:"$TMP/gradient.png"

# Full-bleed square: for iOS and Android, which apply their own mask.
magick "$TMP/gradient.png" "$TMP/silhouette.png" -gravity center -compose over -composite \
  PNG24:"$TMP/square.png"

# Rounded tile with transparent corners: for browser tabs.
magick -size 1024x1024 xc:none -fill white -draw 'roundrectangle 0,0 1023,1023 220,220' \
  "$TMP/mask.png"
magick "$TMP/square.png" "$TMP/mask.png" -alpha off -compose CopyOpacity -composite \
  PNG32:"$TMP/rounded.png"

magick "$TMP/square.png" -resize 180x180 -strip PNG24:"$OUT/apple-touch-icon.png"
magick "$TMP/square.png" -resize 192x192 -strip PNG24:"$OUT/icon-192.png"
magick "$TMP/square.png" -resize 512x512 -strip PNG24:"$OUT/icon-512.png"
magick "$TMP/rounded.png" -resize 32x32 -strip PNG32:"$OUT/favicon-32.png"
magick "$TMP/rounded.png" -define icon:auto-resize=48,32,16 "$OUT/favicon.ico"
