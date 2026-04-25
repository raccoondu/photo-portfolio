#!/bin/bash
# Generates placeholder SVG images for development
# Delete these and replace with your actual photos

LOCATIONS=("tokyo" "paris" "new-york")
COLORS=("#2d3436" "#636e72" "#b2bec3")

for i in "${!LOCATIONS[@]}"; do
  LOC="${LOCATIONS[$i]}"
  COLOR="${COLORS[$i]}"
  DIR="public/photos/$LOC"

  # Cover image (4:5 aspect)
  cat > "$DIR/cover.jpg.svg" << EOF
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <rect fill="$COLOR" width="800" height="1000"/>
  <text fill="white" font-family="sans-serif" font-size="32" x="400" y="500" text-anchor="middle">${LOC^^}</text>
</svg>
EOF
  # Rename to .jpg for next/image compatibility in dev
  mv "$DIR/cover.jpg.svg" "$DIR/cover.jpg"

  # Photo 1 (portrait)
  cat > "$DIR/${LOC}-1.jpg" << EOF
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="2400" viewBox="0 0 1600 2400">
  <rect fill="$COLOR" width="1600" height="2400"/>
  <text fill="white" font-family="sans-serif" font-size="48" x="800" y="1200" text-anchor="middle">${LOC^^} — 1</text>
</svg>
EOF

  # Photo 2 (landscape)
  cat > "$DIR/${LOC}-2.jpg" << EOF
<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="1600" viewBox="0 0 2400 1600">
  <rect fill="$COLOR" width="2400" height="1600"/>
  <text fill="white" font-family="sans-serif" font-size="48" x="1200" y="800" text-anchor="middle">${LOC^^} — 2</text>
</svg>
EOF

  # Photo 3 (portrait)
  cat > "$DIR/${LOC}-3.jpg" << EOF
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="2400" viewBox="0 0 1600 2400">
  <rect fill="$COLOR" width="1600" height="2400"/>
  <text fill="white" font-family="sans-serif" font-size="48" x="800" y="1200" text-anchor="middle">${LOC^^} — 3</text>
</svg>
EOF

  echo "Created placeholders for $LOC"
done

echo "Done! Replace these with your actual .jpg photos."
