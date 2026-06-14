# 🎙️ Generate Podcast UT - Quick Guide

Script otomatis buat bikin podcast persiapan ujian UT dengan gaya santai anak Jakarta.

## 📦 Prerequisites

Install `poppler-utils` (buat ekstrak PDF):

```bash
# Ubuntu/Debian
sudo apt-get install poppler-utils

# macOS
brew install poppler
```

## 🚀 Usage

```bash
node scripts/generate-podcast.js <path-to-pdf> --code <KODE> --name "<Nama Mata Kuliah>"
```

### Contoh:

```bash
node scripts/generate-podcast.js \
  "podcast/source/Hukum Adat/HKUM4101.pdf" \
  --code HKUM4101 \
  --name "Hukum Adat"
```

## 📤 Output

Script akan generate:

1. **Folder baru**: `podcast/source/<Nama Mata Kuliah>/`
2. **notebooklm.md**: Prompt untuk NotebookLM (gaya santai, fokus latihan soal)
3. **series.json**: Metadata podcast (code, episodes, file names)

## 📋 Workflow Lengkap

### 1️⃣ Generate prompt & metadata
```bash
node scripts/generate-podcast.js "path/to/pdf" --code HKUM4101 --name "Hukum Adat"
```

### 2️⃣ Edit notebooklm.md
- Buka file: `podcast/source/Hukum Adat/notebooklm.md`
- Isi detail topik per modul (dari PDF)
- Tambahin contoh soal kalo perlu

### 3️⃣ Generate audio di NotebookLM
- Copy isi `notebooklm.md`
- Paste ke NotebookLM
- Generate podcast per episode

### 4️⃣ Download audio
Download dengan nama sesuai `series.json`:
```
ep1-modul1-2-3.m4a
ep2-modul4-5-6.m4a
...
```

Taruh di folder: `podcast/source/Hukum Adat/`

### 5️⃣ Generate site
```bash
node scripts/generate-site.js --audio-base "https://archive.org/download/temantuton-podcast/"
```

### 6️⃣ Push ke GitHub
```bash
git add .
git commit -m "Add podcast: Hukum Adat"
git push
```

CI otomatis:
- Upload audio ke archive.org
- Deploy site ke GitHub Pages

## 🎯 Features

- **Auto-detect modules** dari PDF
- **3 modul per episode** (otomatis)
- **Gaya santai** anak Jakarta (no bullshit dosen)
- **Fokus latihan soal** buat persiapan ujian
- **Template konsisten** semua mata kuliah

## 📝 Struktur Episode

Setiap episode:
1. **Warm up** (2 menit) - Recap materi sebelumnya
2. **Deep dive** (15-20 menit) - Bahas konsep inti
3. **Latihan soal** (8-10 menit) - Bahas 3-5 soal tipikal ujian
4. **Wrap up** (2 menit) - Rangkuman + preview

Durasi ideal: **25-35 menit**

## 🛠️ Troubleshooting

**Error: pdftotext not found**
```bash
sudo apt-get install poppler-utils
```

**Error: Tidak ditemukan modul**
- Pastikan PDF ada kata "Modul 1", "Modul 2", dst
- Cek format teks PDF (bukan scan image)

**Audio terlalu panjang**
- Edit `notebooklm.md`, kurangin detail
- Fokus ke poin penting aja

## 📂 Contoh Struktur

```
podcast/source/
├── Hukum Adat/
│   ├── HKUM4101.pdf           # PDF buku (gitignored)
│   ├── notebooklm.md          # Prompt NotebookLM
│   ├── series.json            # Metadata
│   ├── ep1-modul1-2-3.m4a     # Audio (gitignored, uploaded to archive.org)
│   ├── ep2-modul4-5-6.m4a
│   └── ...
├── Hukum Dagang dan Kepailitan/
│   ├── HKUM4207.pdf
│   ├── notebooklm.md
│   ├── series.json
│   └── ...
```

## 🎨 Customization

Edit script di: `scripts/generate-podcast.js`

- Ubah `modulesPerEpisode` (default: 3)
- Ubah tone/gaya bahasa di template
- Tambahin tags di `series.json`
