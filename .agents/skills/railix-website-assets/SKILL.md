---
name: railix-website-assets
description: "Prepare, replace and review Railix website media: images, video loops, posters, favicon and social preview assets."
---

# Website Asset Handling

Use real Railix visuals. Avoid generic abstract decoration when a product/model image is available.

## Assets

Current important files:

- `public/railix-vision.mp4` - English overview hero vision video with audio track.
- `public/railix-vision-de.mp4` - German overview hero vision video with audio track.
- `public/railix-vision-poster.jpg` - English overview hero poster and social preview image.
- `public/railix-vision-de-poster.jpg` - German overview hero poster and social preview image.
- `public/railix-hero-background.mp4` - model page background video.
- `public/railix-hero-background-poster.jpg` - model page background poster.
- `public/railix-mark.svg` and `public/railix-favicon.ico` - brand marks.

## Edit Media

1. Keep videos muted, `playsinline`, poster-backed and reasonably small.
2. Prefer one well-sized image over duplicate near-identical images. If social preview and hero
   poster can share an asset, use one file.
3. Use absolute HTTPS URLs for Open Graph/Twitter image metadata.
4. Check references before deleting or replacing files:

```sh
rg -n 'asset-name|public/path' .
```

5. Do not commit scratch contact sheets, temporary exports or source screen recordings.

## Check

- Use `file` and `ls -lh` for image/video dimensions and size.
- Use `ffprobe` for video codec, duration and pixel format when videos change.
- Verify served asset URLs return `200 OK` with `curl -I` when preview metadata changes.
