# AGENTS.md — TemanTuton Podcast

## Project Overview

TemanTuton is a static podcast site for Universitas Terbuka (UT) students. Audio files are hosted on archive.org (free, unlimited, hotlinkable). The site is a single-page vanilla HTML/CSS/JS app with background playback via Media Session API.

All UI text is in **Bahasa Indonesia**.

## Architecture

```
podcast/                    ← Audio + metadata source of truth
  Subject Name/
    series.json             ← Metadata (REQUIRED for each subject)
    ep1-modul1-2.m4a         ← Audio files (gitignored, uploaded to archive.org)
    ep2-modul3-4.m4a
    ...
scripts/
  generate-site.js          ← Reads series.json files → regenerates js/app.js
  upload-archive-org.sh     ← Uploads .m4a files to archive.org S3 API
.github/workflows/
  deploy-podcast.yml        ← CI: upload → regenerate → clean audio from repo
  deploy-site.yml           ← CI: deploy to GitHub Pages
js/app.js                  ← Generated from series.json (DO NOT hand-edit PODCAST_DATA)
css/style.css               ← Styles
index.html                  ← Main page
```

## How to Add a New Podcast Subject

When a user wants to add a new subject (e.g., "Pendidikan Kewarganegaraan"):

1. **Create the directory**: `podcast/Pendidikan Kewarganegaraan/`
2. **Create `series.json`** in that directory with this schema:

```json
{
  "code": "MKDU4110",
  "description": "Podcast persiapan ujian Pendidikan Kewarganegaraan UT.",
  "prefix": "pkn",
  "episodes": [
    {
      "number": 1,
      "title": "Episode title in Bahasa Indonesia",
      "subtitle": "Modul 1 & 2",
      "file": "ep1-modul1-2.m4a",
      "description": "Short description in Bahasa Indonesia."
    }
  ]
}
```

3. **Place audio files** in the same directory with names matching `epN-modulX-Y.m4a`
4. **Run `node scripts/generate-site.js --audio-base "https://archive.org/download/temantuton-podcast/"`** to regenerate `js/app.js`
5. Git commit and push — CI handles the rest

### series.json Fields

| Field | Required | Description |
|-------|----------|-------------|
| `code` | Yes | UT course code (e.g., `FSIH4206`, `ISBU4216`) |
| `description` | Yes | Series description in Bahasa Indonesia |
| `prefix` | Yes | URL-safe prefix for filenames (e.g., `hukum-adat`, `tipikor`). Used as: `{prefix}-{episode.file}` |
| `episodes` | Yes | Array of episode objects |
| `episodes[].number` | Yes | Episode number (1, 2, 3...) |
| `episodes[].title` | Yes | Episode title in Bahasa Indonesia |
| `episodes[].subtitle` | No | Module coverage label (e.g., "Modul 1 & 2") |
| `episodes[].file` | Yes | Audio filename as it exists locally (e.g., `ep1-modul1-2.m4a`). Remote filename becomes `{prefix}-{file}` |
| `episodes[].description` | Yes | Short description of episode content |

### File Naming Conventions

- Local audio: `ep{N}-modul{X}-{Y}.m4a` (e.g., `ep1-modul1-2.m4a`)
- Remote audio on archive.org: `{prefix}-{local filename}` (e.g., `hukum-adat-ep1-modul1-2.m4a`)
- `prefix` must be lowercase, hyphens only, no spaces

## CI/CD Pipeline

### Deploy Podcast (`deploy-podcast.yml`)
Triggers on push to `main` when `podcast/**` paths change.

1. Uploads `.m4a` files to archive.org via S3 API
2. Runs `generate-site.js` to rebuild `js/app.js`
3. Deletes `.m4a` files from the repo (they live on archive.org now)
4. Auto-commits with `[skip ci]` to prevent loops

### Deploy Site (`deploy-site.yml`)
Triggers on push to `main` (including auto-commits from above).

Deploys the static site to GitHub Pages.

## Secrets Required

Set in GitHub repo → Settings → Secrets and variables → Actions:

| Secret | Description |
|--------|-------------|
| `IA_S3_ACCESS_KEY` | Archive.org S3 access key |
| `IA_S3_SECRET_KEY` | Archive.org S3 secret key |

## Key Technical Details

- **Audio hosting**: archive.org S3. Download URL format: `https://archive.org/download/temantuton-podcast/{prefix}-{filename}`
- **Background playback**: Media Session API in `js/app.js` (iOS Safari + Android Chrome lock-screen controls)
- **Client-side storage**: IndexedDB (`TemanTutonDB`) for progress tracking and "Lanjutkan Mendengar" feature
- **Subject filter**: Horizontal pill bar generated from PODCAST_DATA at render time
- **`AUDIO_BASE`** in `js/app.js`: Controlled by `generate-site.js`. For local dev with local files, run `node scripts/generate-site.js` (no `--audio-base` flag) to set it to `''`

## Files NOT to Hand-Edit

| File | Why |
|------|-----|
| `js/app.js` | PODCAST_DATA block is auto-generated. Other code (player, IndexedDB, filters) is safe to edit. |
| `.env` | Contains secrets, gitignored. Never commit. |

## When Editing

- All UI text must be in **Bahasa Indonesia**
- No frameworks, no build tools, no npm dependencies
- Test locally with `python3 -m http.server` or similar
- After editing `podcast/*/series.json`, always run `node scripts/generate-site.js --audio-base "https://archive.org/download/temantuton-podcast/"`