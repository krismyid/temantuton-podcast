#!/usr/bin/env node
// Generates PODCAST_DATA in js/app.js from podcast/*/series.json files.
// Usage: node scripts/generate-site.js [--audio-base URL]
//
// This script:
// 1. Scans podcast/ for subdirectories containing series.json
// 2. Reads each series.json for metadata (code, description, prefix, episodes)
// 3. Builds PODCAST_DATA array with remote filenames (prefix + episode file)
// 4. Replaces the PODCAST_DATA block in js/app.js
// 5. Optionally sets AUDIO_BASE

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PODCAST_DIR = path.join(ROOT, 'podcast');
const TAGS_FILE = path.join(ROOT, 'podcast', 'tags.json');
const APP_JS = path.join(ROOT, 'js', 'app.js');

let audioBase = ''; // default: relative (same origin)
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--audio-base' && args[i + 1]) {
    audioBase = args[i + 1];
    i++;
  }
}

// Load tag labels
const TAGS_MAP = fs.existsSync(TAGS_FILE) ? JSON.parse(fs.readFileSync(TAGS_FILE, 'utf8')) : {};

function scanPodcastDir() {
  const series = [];

  if (!fs.existsSync(PODCAST_DIR)) {
    console.error('ERROR: podcast/ directory not found');
    process.exit(1);
  }

  const dirs = fs.readdirSync(PODCAST_DIR).filter(d => {
    const full = path.join(PODCAST_DIR, d);
    return fs.statSync(full).isDirectory();
  });

  for (const dir of dirs) {
    const seriesFile = path.join(PODCAST_DIR, dir, 'series.json');
    if (!fs.existsSync(seriesFile)) {
      console.warn(`SKIP: podcast/${dir}/ has no series.json`);
      continue;
    }

    try {
      const meta = JSON.parse(fs.readFileSync(seriesFile, 'utf8'));
      const prefix = meta.prefix || dir.toLowerCase().replace(/\s+/g, '-');

      const episodes = (meta.episodes || []).map(ep => ({
        number: ep.number,
        title: ep.title || `Episode ${ep.number}`,
        subtitle: ep.subtitle || '',
        file: `${prefix}-${ep.file}`,
        description: ep.description || ''
      }));

      series.push({
        series: dir,
        seriesCode: meta.code || '',
        description: meta.description || '',
        prefix,
        tags: meta.tags || [],
        episodes
      });

      console.log(`  Loaded: ${dir} (${episodes.length} episodes, prefix: ${prefix})`);
    } catch (e) {
      console.error(`ERROR: Failed to parse ${dir}/series.json: ${e.message}`);
    }
  }

  return series;
}

function buildPodcastDataJS(data) {
  const lines = [];
  lines.push('const PODCAST_DATA = [');
  for (const s of data) {
    lines.push('  {');
    lines.push(`    series: '${escapeJS(s.series)}',`);
    lines.push(`    seriesCode: '${escapeJS(s.seriesCode)}',`);
    lines.push(`    description: '${escapeJS(s.description)}',`);
    lines.push(`    tags: [${s.tags.map(t => `'${escapeJS(t)}'`).join(', ')}],`);
    lines.push('    episodes: [');
    for (const ep of s.episodes) {
      lines.push('      {');
      lines.push(`        number: ${ep.number},`);
      lines.push(`        title: '${escapeJS(ep.title)}',`);
      lines.push(`        subtitle: '${escapeJS(ep.subtitle)}',`);
      lines.push(`        file: '${escapeJS(ep.file)}',`);
      lines.push(`        description: '${escapeJS(ep.description)}'`);
      lines.push('      },');
    }
    lines.push('    ]');
    lines.push('  },');
  }
  lines.push('];');
  return lines.join('\n');
}

function escapeJS(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

function buildTagsMapJS() {
  const entries = Object.entries(TAGS_MAP).map(([k, v]) => `  '${escapeJS(k)}': '${escapeJS(v)}'`);
  return `const TAGS_MAP = {\n${entries.join(',\n')}\n};`;
}

function updateAppJS(podcastDataJS, tagsMapJS, audioBaseVal) {
  let content = fs.readFileSync(APP_JS, 'utf8');

  content = content.replace(
    /const AUDIO_BASE = '[^']*';/,
    `const AUDIO_BASE = '${audioBaseVal}';`
  );

  // Replace TAGS_MAP block (insert if not present)
  if (/const TAGS_MAP = \{[\s\S]*?\};/.test(content)) {
    content = content.replace(
      /const TAGS_MAP = \{[\s\S]*?\};/,
      tagsMapJS
    );
  } else {
    // Insert TAGS_MAP right after AUDIO_BASE
    content = content.replace(
      /const AUDIO_BASE = '[^']*';\n/,
      `const AUDIO_BASE = '${audioBaseVal}';\n\n${tagsMapJS}\n`
    );
  }

  content = content.replace(
    /const PODCAST_DATA = \[[\s\S]*?\];/,
    podcastDataJS
  );

  fs.writeFileSync(APP_JS, content, 'utf8');
  console.log(`\nUpdated: js/app.js (${audioBaseVal ? 'AUDIO_BASE=' + audioBaseVal : 'relative AUDIO_BASE'})`);
}

// Main
console.log('Scanning podcast/ directory...\n');
const data = scanPodcastDir();

if (data.length === 0) {
  console.error('ERROR: No series found. Add series.json to podcast subdirectories.');
  process.exit(1);
}

console.log(`\nFound ${data.length} series with ${data.reduce((s, d) => s + d.episodes.length, 0)} total episodes.`);

const podcastDataJS = buildPodcastDataJS(data);
const tagsMapJS = buildTagsMapJS();
updateAppJS(podcastDataJS, tagsMapJS, audioBase);