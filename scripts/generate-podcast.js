#!/usr/bin/env node

/**
 * generate-podcast.js
 * 
 * Script otomatis buat generate podcast UT:
 * - Input: PDF buku UT
 * - Output: notebooklm.md + series.json
 * - Gaya: santai anak Jakarta, fokus latihan soal
 * 
 * Usage:
 *   node scripts/generate-podcast.js <path-to-pdf> --code HKUM4101 --name "Hukum Adat"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse arguments
const args = process.argv.slice(2);
const pdfPath = args[0];
const codeIndex = args.indexOf('--code');
const nameIndex = args.indexOf('--name');

if (!pdfPath || codeIndex === -1 || nameIndex === -1) {
  console.error('Usage: node generate-podcast.js <pdf-path> --code <CODE> --name <Name>');
  console.error('Example: node generate-podcast.js /path/to/book.pdf --code HKUM4101 --name "Hukum Adat"');
  process.exit(1);
}

const courseCode = args[codeIndex + 1];
const courseName = args[nameIndex + 1];

if (!courseCode || !courseName) {
  console.error('Error: --code dan --name harus diisi');
  process.exit(1);
}

console.log(`📚 Generating podcast untuk: ${courseName} (${courseCode})`);
console.log(`📄 PDF: ${pdfPath}`);

// 1. Extract text from PDF
console.log('\n🔍 Ekstrak teks dari PDF...');
let pdfText;
try {
  pdfText = execSync(`pdftotext "${pdfPath}" -`, { encoding: 'utf-8', maxBuffer: 50 * 1024 * 1024 });
} catch (err) {
  console.error('Error: pdftotext gagal. Pastikan poppler-utils terinstall.');
  process.exit(1);
}

// 2. Detect modules
console.log('🔢 Deteksi jumlah modul...');
const moduleMatches = pdfText.match(/Modul\s+\d+/gi) || [];
const uniqueModules = [...new Set(moduleMatches.map(m => m.match(/\d+/)[0]))];
const totalModules = uniqueModules.length;

console.log(`   Total modul: ${totalModules}`);

if (totalModules === 0) {
  console.error('Error: Tidak ditemukan modul dalam PDF');
  process.exit(1);
}

// 3. Calculate episodes (3 modules per episode)
const modulesPerEpisode = 3;
const totalEpisodes = Math.ceil(totalModules / modulesPerEpisode);

console.log(`   Total episode: ${totalEpisodes} (${modulesPerEpisode} modul per episode)`);

// 4. Create output directory
const outputDir = path.join(process.cwd(), 'podcast', 'source', courseName);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`\n📁 Folder dibuat: ${outputDir}`);
}

// 5. Generate notebooklm.md
console.log('\n📝 Generate notebooklm.md...');

const prefix = courseName.toLowerCase().replace(/\s+/g, '-');

let notebooklmContent = `# Podcast Prompt: ${courseName} (${courseCode})

Bikin podcast persiapan ujian buat mahasiswa UT. Gaya ngobrol **santai ala anak Jakarta**, no bullshit, bukan gaya dosen. Fokus **deep dive latihan soal** biar paham konsep.

**Tone:**
- Bahasa gaul tapi tetap jelas
- Jelasin konsep sambil ngasih contoh nyata
- Kasih tips ngerjain soal ujian
- Durasi ideal: 25-35 menit per episode

---
`;

// Generate episodes
const episodes = [];
for (let i = 0; i < totalEpisodes; i++) {
  const episodeNum = i + 1;
  const startModule = i * modulesPerEpisode + 1;
  const endModule = Math.min((i + 1) * modulesPerEpisode, totalModules);
  
  const modulesRange = startModule === endModule 
    ? `Modul ${startModule}` 
    : `Modul ${startModule}-${endModule}`;
  
  notebooklmContent += `
## Episode ${episodeNum}: ${modulesRange}

**Yang dibahas:**
`;
  
  for (let m = startModule; m <= endModule; m++) {
    notebooklmContent += `- Modul ${m}: [topik akan diisi dari PDF]\n`;
  }
  
  notebooklmContent += `
**Struktur:**
1. **Warm up** (2 menit) - Recap singkat materi sebelumnya
2. **Deep dive** (15-20 menit) - Bahas konsep inti per modul dengan contoh
3. **Latihan soal** (8-10 menit) - Bahas 3-5 soal tipikal ujian, kasih tips ngerjain
4. **Wrap up** (2 menit) - Rangkuman 3 poin penting, preview episode berikutnya

**Catatan penting:**
- Jelasin istilah hukum dengan bahasa sehari-hari
- Kasih analogi/contoh kasus yang relatable
- Tips: "Kalo di ujian keluar soal kayak gini, langsung fokus ke..."

---
`;

  // Prepare episode data for series.json
  const modulesList = [];
  for (let m = startModule; m <= endModule; m++) {
    modulesList.push(m);
  }
  
  episodes.push({
    number: episodeNum,
    title: `Episode ${episodeNum}`,
    subtitle: modulesRange,
    file: `ep${episodeNum}-modul${modulesList.join('-')}.m4a`,
    description: `Pembahasan ${modulesRange} dengan latihan soal.`
  });
}

notebooklmContent += `
## Referensi
- Buku: ${courseName} (${courseCode}) - Universitas Terbuka
- Fokus: Persiapan ujian dengan latihan soal
`;

fs.writeFileSync(path.join(outputDir, 'notebooklm.md'), notebooklmContent);
console.log(`   ✅ notebooklm.md berhasil dibuat`);

// 6. Generate series.json
console.log('📝 Generate series.json...');

const seriesData = {
  code: courseCode,
  description: `Podcast persiapan ujian ${courseName} UT. Gaya santai anak Jakarta, fokus latihan soal dan tips ngerjain ujian.`,
  prefix: prefix,
  tags: ["s1-ilmu-hukum", "fhisip"],
  episodes: episodes
};

fs.writeFileSync(
  path.join(outputDir, 'series.json'), 
  JSON.stringify(seriesData, null, 2)
);
console.log(`   ✅ series.json berhasil dibuat`);

// 7. Done
console.log(`\n✨ Done! File ada di: ${outputDir}`);
console.log(`\n📋 Next steps:`);
console.log(`   1. Edit notebooklm.md - isi detail topik per modul`);
console.log(`   2. Generate audio di NotebookLM`);
console.log(`   3. Download audio dengan nama sesuai series.json`);
console.log(`   4. Taruh audio di folder: ${outputDir}`);
console.log(`   5. Run: node scripts/generate-site.js --audio-base "https://archive.org/download/temantuton-podcast/"`);
console.log(`   6. Git push - CI akan upload ke archive.org`);
