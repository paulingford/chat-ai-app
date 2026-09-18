# With Kare

Halftone / pattern-fill image tool. Upload a photo, rebuild it from black & white fill patterns, adjust levels and tile size, then export SVG or PNG.

**Live:** https://paulingford.com/withkare/

## Local preview

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

## Deploy

Upload `index.html` to the `withkare/` prefix on the paulingford.com S3 bucket, then invalidate CloudFront.

(Previously lived at `/patternpress/`.)
