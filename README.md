# TemanTuton 🎧

Podcast belajar untuk ujian Universitas Terbuka (UT). Dengarkan kapan saja, bahkan di latar belakang.

**[temantuton.kris.my.id](https://temantuton.kris.my.id/)**

## Features

- **Background playback** — lock-screen controls via Media Session API (iOS Safari & Android Chrome)
- **Progress tracking** — resume where you left off with IndexedDB
- **Tag & search filtering** — filter by program/fakultas tags or search across all episodes
- **Auto-play next** — continues to the next episode in the series
- **Playback speed** — 0.5× to 2×
- **Static site** — no frameworks, no build tools, no npm dependencies

## Adding a New Subject

### 🚀 Quick Way (Automated)

Use the podcast generator script:

```bash
node scripts/generate-podcast.js "path/to/book.pdf" --code HKUM4101 --name "Hukum Adat"
```

This will:
- Auto-detect modules from PDF
- Generate `notebooklm.md` (podcast prompt with casual Jakarta style)
- Generate `series.json` (metadata)
- Create folder structure

Then:
1. Edit `notebooklm.md` - fill in module details
2. Generate audio at NotebookLM
3. Download audio files (names match `series.json`)
4. Place audio in the subject folder
5. Run `node scripts/generate-site.js --audio-base "https://archive.org/download/temantuton-podcast/"`
6. Commit and push

See [PODCAST_GENERATOR.md](PODCAST_GENERATOR.md) for details.

### 📝 Manual Way

1. Create `podcast/source/{Subject Name}/series.json`:

```json
{
  "code": "MKDU4110",
  "description": "Podcast persiapan ujian Pendidikan Kewarganegaraan UT.",
  "prefix": "pkn",
  "tags": ["s1-ilmu-hukum", "fhisip"],
  "episodes": [
    {
      "number": 1,
      "title": "Episode title",
      "subtitle": "Modul 1 & 2",
      "file": "ep1-modul1-2.m4a",
      "description": "Short description."
    }
  ]
}
```

2. Place `.m4a` audio files in the same directory
3. Run `node scripts/generate-site.js --audio-base "https://archive.org/download/temantuton-podcast/"`
4. Commit and push

Tags are defined in `podcast/tags.json`:

```json
{
  "s1-ilmu-hukum": "S1 Ilmu Hukum",
  "fhisip": "FHISIP"
}
```

## Local Development

```bash
node scripts/generate-site.js   # generates js/app.js with local audio paths
python3 -m http.server           # serve the site
```

## Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | Vanilla HTML/CSS/JS |
| Audio hosting | archive.org S3 (free, unlimited, hotlinkable) |
| Storage | IndexedDB (`TemanTutonDB`) |
| Deployment | GitHub Pages via CI |

## License

[Unlicense](https://unlicense.org) — public domain.