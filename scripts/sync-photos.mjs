#!/usr/bin/env node

/**
 * Lightroom → Website Photo Sync Script
 *
 * USAGE:
 *   node scripts/sync-photos.mjs <source-folder>
 *
 * FOLDER STRUCTURE (your Lightroom export):
 *   <source-folder>/
 *     japan/
 *       shibuya-crossing.jpg
 *       temple-morning.jpg
 *     california/
 *       big-sur-coast.jpg
 *
 * Each subfolder name must match a location slug in photos.ts.
 * The script will:
 *   1. Read EXIF data (title, description, dimensions) from each image
 *   2. Resize for web (max 2400px on longest side) + generate a thumbnail
 *   3. Copy optimized images to public/photos/<location>/
 *   4. Update src/data/photos.ts with new entries
 *
 * Lightroom export tips:
 *   - File Settings: JPEG, quality 90-100%
 *   - Image Sizing: Don't resize (the script handles it)
 *   - Metadata: Include Title and Caption in export
 *   - File Naming: Use descriptive names (they become the photo ID)
 */

import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import sharp from "sharp";

// Config
const MAX_LONG_SIDE = 2400;
const JPEG_QUALITY = 85;
const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC_PHOTOS = path.join(PROJECT_ROOT, "public/photos");
const DATA_FILE = path.join(PROJECT_ROOT, "src/data/photos.ts");

// Supported image extensions
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"]);

async function getExif(filePath) {
  // Dynamic import exifr since it's ESM
  const exifr = await import("exifr");
  try {
    const data = await exifr.default.parse(filePath, {
      pick: [
        "ImageDescription",
        "Title",
        "ObjectName",
        "Caption",
        "XPTitle",
        "XPComment",
        "Description",
        "UserComment",
      ],
    });
    return data || {};
  } catch {
    return {};
  }
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\.[^.]+$/, "") // remove extension
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function titleFromFilename(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function processImage(srcPath, destDir, locationSlug) {
  const filename = path.basename(srcPath);
  const slug = slugify(filename);
  const destFilename = `${slug}.jpg`;
  const destPath = path.join(destDir, destFilename);
  const webPath = `/photos/${locationSlug}/${destFilename}`;

  // Read image metadata with sharp
  const image = sharp(srcPath);
  const metadata = await image.metadata();
  const { width: origW, height: origH } = metadata;

  // Calculate resize dimensions (max 2400px on longest side)
  let width, height;
  if (origW >= origH) {
    width = Math.min(origW, MAX_LONG_SIDE);
    height = Math.round((width / origW) * origH);
  } else {
    height = Math.min(origH, MAX_LONG_SIDE);
    width = Math.round((height / origH) * origW);
  }

  // Resize and save as optimized JPEG
  await image
    .resize(width, height, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, progressive: true })
    .toFile(destPath);

  // Read EXIF for title/description
  const exif = await getExif(srcPath);
  const alt =
    exif.Title ||
    exif.ObjectName ||
    exif.XPTitle ||
    titleFromFilename(filename);
  const description =
    exif.ImageDescription ||
    exif.Caption ||
    exif.Description ||
    exif.XPComment ||
    exif.UserComment ||
    "";

  const fileSize = (await fs.stat(destPath)).size;
  const sizeMB = (fileSize / 1024 / 1024).toFixed(1);

  console.log(
    `  ✓ ${filename} → ${destFilename} (${width}×${height}, ${sizeMB}MB)`
  );

  return {
    id: `${locationSlug}-${slug}`,
    src: webPath,
    alt: typeof alt === "string" ? alt : String(alt),
    description: typeof description === "string" ? description : String(description),
    location: locationSlug,
    width,
    height,
  };
}

async function generateCover(destDir, locationSlug, firstPhoto) {
  // Use the first photo as cover if no cover.jpg exists
  const coverPath = path.join(destDir, "cover.jpg");
  if (existsSync(coverPath)) return;

  const srcPath = path.join(destDir, path.basename(firstPhoto.src));
  await sharp(srcPath)
    .resize(800, 1000, { fit: "cover", position: "attention" })
    .jpeg({ quality: JPEG_QUALITY })
    .toFile(coverPath);

  console.log(`  ✓ Generated cover.jpg from ${path.basename(firstPhoto.src)}`);
}

async function readExistingPhotos() {
  const content = await fs.readFile(DATA_FILE, "utf-8");

  // Extract existing photo IDs to avoid duplicates
  const idMatches = content.matchAll(/id:\s*"([^"]+)"/g);
  const existingIds = new Set([...idMatches].map((m) => m[1]));

  return { content, existingIds };
}

function buildPhotoEntry(photo) {
  const desc = photo.description
    ? `\n    description: ${JSON.stringify(photo.description)},`
    : "";
  return `  {
    id: ${JSON.stringify(photo.id)},
    src: ${JSON.stringify(photo.src)},
    alt: ${JSON.stringify(photo.alt)},${desc}
    location: ${JSON.stringify(photo.location)},
    width: ${photo.width},
    height: ${photo.height},
  }`;
}

async function updateDataFile(newPhotos) {
  if (newPhotos.length === 0) return;

  let content = await fs.readFile(DATA_FILE, "utf-8");

  // Find the closing bracket of the `export const photos: Photo[] = [` array
  // We locate the array declaration first, then find its matching `];`
  const photosArrayStart = content.indexOf("export const photos");
  if (photosArrayStart === -1) {
    console.error("Could not find 'export const photos' in data file");
    return;
  }

  // Find the first `];` after the photos array declaration
  const closingIndex = content.indexOf("];", photosArrayStart);
  if (closingIndex === -1) {
    console.error("Could not find closing bracket of photos array");
    return;
  }

  // Group new photos by location for readability
  const byLocation = {};
  for (const photo of newPhotos) {
    if (!byLocation[photo.location]) byLocation[photo.location] = [];
    byLocation[photo.location].push(photo);
  }

  let insertion = "";
  for (const [location, photos] of Object.entries(byLocation)) {
    insertion += `\n  // ${location} (synced)\n`;
    insertion += photos.map(buildPhotoEntry).join(",\n");
    insertion += ",";
  }

  content =
    content.slice(0, closingIndex) + insertion + "\n" + content.slice(closingIndex);

  await fs.writeFile(DATA_FILE, content, "utf-8");
  console.log(`\nUpdated ${DATA_FILE}`);
}

async function main() {
  const sourceDir = process.argv[2];

  if (!sourceDir) {
    console.log(`
Photo Sync — Import photos from Lightroom exports

USAGE:
  node scripts/sync-photos.mjs <source-folder>

FOLDER STRUCTURE:
  <source-folder>/
    japan/           ← must match a location slug
      photo1.jpg
      photo2.jpg
    california/
      sunset.jpg

The script reads EXIF title/caption from each image,
resizes for web, and updates the photos data file.

LIGHTROOM EXPORT TIPS:
  • Title field   → becomes the photo title
  • Caption field → becomes the 2-3 line description
  • Export as JPEG, quality 90-100%, full resolution
  • Use descriptive filenames
`);
    process.exit(1);
  }

  const absSource = path.resolve(sourceDir);
  if (!existsSync(absSource)) {
    console.error(`Source folder not found: ${absSource}`);
    process.exit(1);
  }

  const { existingIds } = await readExistingPhotos();
  const allNewPhotos = [];

  // Iterate location subfolders
  const entries = await fs.readdir(absSource, { withFileTypes: true });
  const locationDirs = entries.filter((e) => e.isDirectory());

  if (locationDirs.length === 0) {
    console.error(
      "No subfolders found. Organize photos into location folders (e.g., japan/, california/)"
    );
    process.exit(1);
  }

  for (const dir of locationDirs) {
    const locationSlug = dir.name.toLowerCase();
    const srcDir = path.join(absSource, dir.name);
    const destDir = path.join(PUBLIC_PHOTOS, locationSlug);

    // Ensure destination exists
    await fs.mkdir(destDir, { recursive: true });

    console.log(`\n📍 ${locationSlug}`);

    // Get image files
    const files = await fs.readdir(srcDir);
    const imageFiles = files.filter((f) =>
      IMAGE_EXTS.has(path.extname(f).toLowerCase())
    );

    if (imageFiles.length === 0) {
      console.log("  No images found, skipping");
      continue;
    }

    const locationPhotos = [];

    for (const file of imageFiles) {
      const photoId = `${locationSlug}-${slugify(file)}`;

      if (existingIds.has(photoId)) {
        console.log(`  ⊘ ${file} (already exists, skipping)`);
        continue;
      }

      const photo = await processImage(
        path.join(srcDir, file),
        destDir,
        locationSlug
      );
      locationPhotos.push(photo);
    }

    // Generate cover from first photo if needed
    if (locationPhotos.length > 0) {
      await generateCover(destDir, locationSlug, locationPhotos[0]);
    }

    allNewPhotos.push(...locationPhotos);
  }

  // Update the data file
  if (allNewPhotos.length > 0) {
    await updateDataFile(allNewPhotos);
    console.log(`\n✅ Synced ${allNewPhotos.length} new photos`);
    console.log("   Run 'git add . && git commit && git push' to deploy");
  } else {
    console.log("\nNo new photos to sync");
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
