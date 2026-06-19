// ===== TemanTuton - Podcast Player =====
// Audio URLs: points to archive.org CDN (free, unlimited, hotlinkable)
// For local development with files in podcast/: set to ''
const AUDIO_BASE = 'https://archive.org/download/temantuton-podcast/';

const TAGS_MAP = {
  's1-ilmu-hukum': 'S1 Ilmu Hukum',
  'fhisip': 'FHISIP'
};

const PODCAST_DATA = [
  {
    series: 'Hukum Adat',
    seriesCode: 'FSIH4206',
    description: 'Podcast persiapan ujian Hukum Adat UT. Deep dive latihan soal dan tes formatif.',
    tags: ['s1-ilmu-hukum', 'fhisip'],
    episodes: [
      {
        number: 1,
        title: 'Dari Adat Sampai Sejarah',
        subtitle: 'Modul 1 & 2',
        file: 'hukum-adat-ep1-modul1-2.m4a',
        description: 'Asas-asas hukum adat, istilah dan pengertian, corak dan sifat, sistem hukum adat vs Barat, masyarakat hukum adat, 19 lingkungan Van Vollenhoven.'
      },
      {
        number: 2,
        title: 'Orang, Pribadi, dan Keluarga',
        subtitle: 'Modul 3 & 4',
        file: 'hukum-adat-ep2-modul3-4.m4a',
        description: 'Hukum tentang orang/pribadi, kecakapan bertindak, dewasa menurut hukum adat vs UU, hukum keluarga dan kekerabatan, sistem patrilineal/matrilineal/parental.'
      },
      {
        number: 3,
        title: 'Kawin, Harta, dan Eksistensi Hukum Adat',
        subtitle: 'Modul 5 & 6',
        file: 'hukum-adat-ep3-modul5-6.m4a',
        description: 'Hukum perkawinan, bentuk-bentuk perkawinan, harta perkawinan, eksistensi hukum adat dalam hukum nasional, the living law.'
      },
    ]
  },
  {
    series: 'Hukum Dagang dan Kepailitan',
    seriesCode: 'HKUM4207',
    description: 'Podcast persiapan ujian Hukum Dagang dan Kepailitan UT. Membahas penyehatan perusahaan melalui merger, akuisisi, konsolidasi, serta aspek hukum kepailitan dan PKPU.',
    tags: ['s1-ilmu-hukum', 'fhisip'],
    episodes: [
      {
        number: 1,
        title: 'Pengantar Penyehatan Perusahaan & Merger',
        subtitle: 'Modul 1, 2 & 3',
        file: 'hukum-dagang-kepailitan-ep1.m4a',
        description: 'Konsep dasar penyehatan perusahaan, dasar hukum merger, dan tipe-tipe merger (horizontal, vertikal, konglomerat).'
      },
      {
        number: 2,
        title: 'Akuisisi (Pengambilalihan Perusahaan)',
        subtitle: 'Modul 4, 5 & 6',
        file: 'hukum-dagang-kepailitan-ep2.m4a',
        description: 'Pengertian akuisisi, bentuk-bentuk akuisisi (stock vs asset), prosedur dan implikasi hukum pengambilalihan.'
      },
      {
        number: 3,
        title: 'Konsolidasi & Praktik Penyehatan Lainnya',
        subtitle: 'Modul 7, 8 & 9',
        file: 'hukum-dagang-kepailitan-ep3.m4a',
        description: 'Peleburan (konsolidasi), tata cara konsolidasi, serta praktik LBO, MBO, dan joint venture.'
      },
      {
        number: 4,
        title: 'Aspek Hukum Kepailitan & Evaluasi',
        subtitle: 'Modul 10, 11 & 12',
        file: 'hukum-dagang-kepailitan-ep4.m4a',
        description: 'Kepailitan dan PKPU, aspek hukum perdata internasional, rangkuman materi dan soal-soal formatif.'
      },
    ]
  },
  {
    series: 'Pengujian Peraturan Perundang-Undangan',
    seriesCode: 'FSIH4310',
    description: 'Podcast persiapan ujian Pengujian Peraturan Perundang-Undangan UT.',
    tags: ['s1-ilmu-hukum', 'fhisip'],
    episodes: [
      {
        number: 1,
        title: 'Mahkamah Konstitusi Sang Wasit Hukum',
        subtitle: 'Episode 1',
        file: 'pengujian-peruu-ep1.m4a',
        description: 'Peran dan fungsi Mahkamah Konstitusi dalam sistem ketatanegaraan Indonesia.'
      },
      {
        number: 2,
        title: 'Siasat Politik di Puncak Piramida Peradilan',
        subtitle: 'Episode 2',
        file: 'pengujian-peruu-ep2.m4a',
        description: 'Dinamika politik di balik proses pengujian undang-undang.'
      },
      {
        number: 3,
        title: 'Hak Rakyat Menggugat Lampiran Undang-Undang',
        subtitle: 'Episode 3',
        file: 'pengujian-peruu-ep3.m4a',
        description: 'Hak masyarakat untuk mengajukan pengujian peraturan perundang-undangan.'
      },
      {
        number: 4,
        title: 'Cara Menggugat Peraturan Daerah ke Mahkamah Agung',
        subtitle: 'Episode 4',
        file: 'pengujian-peruu-ep4.m4a',
        description: 'Prosedur pengujian peraturan daerah di Mahkamah Agung.'
      },
      {
        number: 0,
        title: 'Sembilan Hakim yang Bisa Membatalkan Undang-Undang',
        subtitle: 'Bonus',
        file: 'pengujian-peruu-Bonus.m4a',
        description: 'Profil sembilan hakim konstitusi dan kewenangan membatalkan UU.'
      },
    ]
  },
  {
    series: 'Tindak Pidana Korupsi',
    seriesCode: 'ISBU4216',
    description: 'Podcast persiapan ujian Tindak Pidana Korupsi UT. Sesi belajar interaktif soal latihan dan tes formatif.',
    tags: ['s1-ilmu-hukum', 'fhisip'],
    episodes: [
      {
        number: 1,
        title: 'Istilah, Sejarah, dan Hukum Positif',
        subtitle: 'Modul 1 & 2',
        file: 'tipikor-ep1-modul1-2.m4a',
        description: 'Pengertian korupsi, tipologi korupsi, dampak destruktif, sejarah undang-undang pemberantasan korupsi di Indonesia.'
      },
      {
        number: 2,
        title: 'Sifat Melawan Hukum dan Sistem Pemidanaan',
        subtitle: 'Modul 3 & 4',
        file: 'tipikor-ep2-modul3-4.m4a',
        description: 'Sifat melawan hukum (materiil dan formil), pemidanaan korporasi, pidana pokok, pidana tambahan, dan pidana mati dalam UU Tipikor.'
      },
      {
        number: 3,
        title: 'Hukum Acara Khusus dan Lembaga Penegak Hukum',
        subtitle: 'Modul 5 & 6',
        file: 'tipikor-ep3-modul5-6.m4a',
        description: 'Hukum acara khusus, pembuktian terbalik, peradilan in absentia, bukti elektronik, kewenangan KPK, Kepolisian, dan Kejaksaan.'
      },
      {
        number: 4,
        title: 'Pengembalian Aset, Peran Masyarakat, UNCAC, dan TPPU',
        subtitle: 'Modul 7, 8 & 9',
        file: 'tipikor-ep4-modul7-8-9.m4a',
        description: 'Mekanisme pengembalian aset (StAR), bantuan timbal balik (MLA), peran serta masyarakat, hubungan korupsi dengan TPPU.'
      },
    ]
  },
];

// ===== Playback Speeds =====
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

// ===== State =====
let currentEpisode = null;
let currentSeries = null;
let isPlaying = false;
let speedIndex = 2; // default 1x
let activeFilter = 'semua'; // 'semua', a tag id, or a series name
let searchQuery = '';

// ===== IndexedDB for Continue Listening =====
const DB_NAME = 'TemanTutonDB';
const DB_VERSION = 1;
const STORE_NAME = 'progress';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('lastPlayed', 'lastPlayed', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function saveProgress(seriesName, epNumber, currentTime, duration) {
  if (!currentTime || !duration || duration === 0) return;
  const id = `${seriesName}::${epNumber}`;
  const progress = currentTime / duration;
  openDB().then(db => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({
      id,
      series: seriesName,
      epNumber,
      currentTime,
      duration,
      progress, // 0-1 ratio
      lastPlayed: Date.now()
    });
  }).catch(err => console.warn('saveProgress fail:', err));
}

function getAllProgress() {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const idx = store.index('lastPlayed');
      const req = idx.openCursor(null, 'prev'); // most recent first
      const results = [];
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      req.onerror = () => reject(req.error);
    });
  }).catch(err => { console.warn('getAllProgress fail:', err); return []; });
}

function getProgress(seriesName, epNumber) {
  const id = `${seriesName}::${epNumber}`;
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }).catch(err => { console.warn('getProgress fail:', err); return null; });
}

// ===== DOM Refs =====
const audio = document.getElementById('audio');
const player = document.getElementById('player');
const playerProgress = document.getElementById('playerProgress');
const playerProgressBar = document.getElementById('playerProgressBar');
const playerProgressHandle = document.getElementById('playerProgressHandle');
const playerSeries = document.getElementById('playerSeries');
const playerTitle = document.getElementById('playerTitle');
const playerCurrentTime = document.getElementById('playerCurrentTime');
const playerDuration = document.getElementById('playerDuration');
const btnPlay = document.getElementById('btnPlay');
const btnRewind = document.getElementById('btnRewind');
const btnForward = document.getElementById('btnForward');
const btnSpeed = document.getElementById('btnSpeed');
const content = document.getElementById('content');

// ===== Icons =====
const PLAY_ICON = '<svg viewBox="0 0 24 24" width="36" height="36"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
const PAUSE_ICON = '<svg viewBox="0 0 24 24" width="36" height="36"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/></svg>';
const SMALL_PLAY_ICON = '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
const SMALL_PAUSE_ICON = '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/></svg>';

// ===== Utility =====
function formatTime(seconds) {
  if (!seconds || !isFinite(seconds)) return '0:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function getAudioUrl(file) {
  return AUDIO_BASE + file;
}

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function findEpisode(seriesName, epNumber) {
  const series = PODCAST_DATA.find(s => s.series === seriesName);
  if (!series) return null;
  return series.episodes.find(e => e.number === epNumber) || null;
}

// ===== Progress cache (for rendering) =====
let progressCache = {};

async function loadProgressCache() {
  const allProgress = await getAllProgress();
  progressCache = {};
  allProgress.forEach(p => {
    progressCache[p.id] = p;
  });
}

// ===== Render =====
function renderContent() {
  let html = '';

  html += '<div class="search-bar">';
  html += '  <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/></svg>';
  html += `  <input type="text" id="searchInput" class="search-input" placeholder="Cari episode atau mata kuliah..." value="${escapeHTML(searchQuery)}">`;
  if (searchQuery) {
    html += '  <button class="search-clear" id="searchClear" aria-label="Hapus pencarian">&times;</button>';
  }
  html += '</div>';

  const allTags = [...new Set(PODCAST_DATA.flatMap(s => s.tags || []))];

  html += '<div class="filter-bar" id="filterBar">';
  html += `<button class="filter-pill ${activeFilter === 'semua' ? 'active' : ''}" data-filter="semua">Semua</button>`;
  allTags.forEach(tag => {
    const label = TAGS_MAP[tag] || tag;
    html += `<button class="filter-pill filter-pill-tag ${activeFilter === tag ? 'active' : ''}" data-filter="${tag}" data-filter-type="tag">${label}</button>`;
  });
  PODCAST_DATA.forEach(series => {
    html += `<button class="filter-pill ${activeFilter === series.series ? 'active' : ''}" data-filter="${series.series}">${series.series}</button>`;
  });
  html += '</div>';

  // Continue listening section
  html += '<div id="continueSection" class="continue-section" style="display:none;"></div>';

  // Series sections
  PODCAST_DATA.forEach((series, si) => {
    const matchesFilter = activeFilter === 'semua'
      || activeFilter === series.series
      || (series.tags || []).includes(activeFilter);
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q
      || series.series.toLowerCase().includes(q)
      || series.seriesCode.toLowerCase().includes(q)
      || series.description.toLowerCase().includes(q)
      || (series.tags || []).some(t => (TAGS_MAP[t] || t).toLowerCase().includes(q) || t.toLowerCase().includes(q))
      || series.episodes.some(ep =>
          ep.title.toLowerCase().includes(q)
          || (ep.subtitle || '').toLowerCase().includes(q)
          || ep.description.toLowerCase().includes(q)
        );
    const isVisible = matchesFilter && matchesSearch;
    const isOpen = isVisible && (activeFilter === series.series || (series.tags || []).includes(activeFilter) || (activeFilter === 'semua' && si === 0 && !q));
    const tagBadges = (series.tags || []).map(t =>
      `<span class="series-tag" data-tag="${t}">${TAGS_MAP[t] || t}</span>`
    ).join('');
    html += `
      <section class="series-section ${isVisible ? '' : 'filtered-out'}" data-series="${si}">
        <div class="series-header" data-series="${si}" role="button" tabindex="0" aria-expanded="${isOpen}">
          <div class="series-header-left">
            <div class="series-title-row">
              <div class="series-title">${series.series}</div>
              <div class="series-tags">${tagBadges}</div>
            </div>
            <div class="series-code">${series.seriesCode}</div>
            <div class="series-desc">${series.description}</div>
          </div>
          <div class="series-chevron ${isOpen ? 'open' : ''}">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
          </div>
        </div>
        <div class="series-episodes ${isOpen ? '' : 'collapsed'}" data-episodes="${si}">
          ${series.episodes.map((ep) => {
            const epMatchesSearch = !q
              || ep.title.toLowerCase().includes(q)
              || (ep.subtitle || '').toLowerCase().includes(q)
              || ep.description.toLowerCase().includes(q);
            if (!epMatchesSearch && q) return '';
            const progId = `${series.series}::${ep.number}`;
            const prog = progressCache[progId];
            const progressPct = prog ? Math.round(prog.progress * 100) : 0;
            const isCompleted = prog && prog.progress > 0.95;
            return `
              <div class="episode-card ${isCompleted ? 'completed' : ''}" data-series="${si}" data-ep="${ep.number}" role="button" tabindex="0">
                <div class="ep-number">
                  <span class="ep-number-text">${ep.number}</span>
                  <div class="ep-playing-indicator">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                  </div>
                </div>
                <div class="ep-content">
                  <div class="ep-title">${ep.title}</div>
                  <div class="ep-subtitle">${ep.subtitle}</div>
                  <div class="ep-desc">${ep.description}</div>
                  ${progressPct > 0 ? `<div class="ep-progress-bar"><div class="ep-progress-fill" style="width:${progressPct}%"></div></div>` : ''}
                </div>
                <button class="ep-play-btn" aria-label="Putar ${ep.title}" data-series="${si}" data-ep="${ep.number}">
                  ${SMALL_PLAY_ICON}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </section>
    `;
  });
  content.innerHTML = html;

  // Bind filter pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      activeFilter = pill.dataset.filter;
      renderContent();
    });
  });

  // Bind tag clicks on series headers
  document.querySelectorAll('.series-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.stopPropagation();
      activeFilter = tag.dataset.tag;
      renderContent();
    });
  });

  // Bind search input
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');

  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        searchQuery = searchInput.value;
        renderContent();
      }, 200);
    });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchQuery = '';
        renderContent();
      }
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchQuery = '';
      renderContent();
    });
  }

  // Bind series toggle
  document.querySelectorAll('.series-header').forEach(header => {
    header.addEventListener('click', () => toggleSeries(header.dataset.series));
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleSeries(header.dataset.series);
      }
    });
  });

  // Bind episode cards & play buttons
  bindEpisodeCards();

  // Bind continue section
  renderContinueSection();

  // Restore search focus after re-render
  if (searchQuery) {
    const input = document.getElementById('searchInput');
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }
}

function bindEpisodeCards() {
  document.querySelectorAll('.episode-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.ep-play-btn')) return;
      playEpisode(parseInt(card.dataset.series), parseInt(card.dataset.ep));
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playEpisode(parseInt(card.dataset.series), parseInt(card.dataset.ep));
      }
    });
  });
  document.querySelectorAll('.ep-play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      playEpisode(parseInt(btn.dataset.series), parseInt(btn.dataset.ep));
    });
  });
}

function toggleSeries(seriesIndex) {
  const episodes = document.querySelector(`[data-episodes="${seriesIndex}"]`);
  const header = document.querySelector(`.series-header[data-series="${seriesIndex}"]`);
  if (!episodes || !header) return;
  const chevron = header.querySelector('.series-chevron');
  const isOpen = !episodes.classList.contains('collapsed');

  if (isOpen) {
    episodes.classList.add('collapsed');
    chevron.classList.remove('open');
    header.setAttribute('aria-expanded', 'false');
  } else {
    episodes.classList.remove('collapsed');
    chevron.classList.add('open');
    header.setAttribute('aria-expanded', 'true');
  }
}

// ===== Continue Listening =====
async function renderContinueSection() {
  const section = document.getElementById('continueSection');
  if (!section) return;

  // Get all progress, filter out completed, sort by lastPlayed
  const entries = Object.values(progressCache)
    .filter(p => p.progress > 0.01 && p.progress < 0.95) // started but not completed
    .sort((a, b) => b.lastPlayed - a.lastPlayed)
    .slice(0, 3); // max 3 recent

  if (entries.length === 0) {
    section.style.display = 'none';
    return;
  }

  let html = '<div class="continue-label">Lanjutkan Mendengar</div>';
  html += '<div class="continue-cards">';
  entries.forEach(entry => {
    const series = PODCAST_DATA.find(s => s.series === entry.series);
    const ep = series ? series.episodes.find(e => e.number === entry.epNumber) : null;
    if (!ep) return;
    const si = PODCAST_DATA.indexOf(series);
    const progressPct = Math.round(entry.progress * 100);
    const timeLeft = entry.duration - entry.currentTime;
    html += `
      <div class="continue-card" data-series="${si}" data-ep="${entry.epNumber}" role="button" tabindex="0">
        <div class="continue-info">
          <div class="continue-series">${entry.series}</div>
          <div class="continue-title">${ep.title}</div>
          <div class="continue-meta">${ep.subtitle} · ${formatTime(timeLeft)} tersisa</div>
          <div class="continue-progress-bar">
            <div class="continue-progress-fill" style="width:${progressPct}%"></div>
          </div>
        </div>
        <div class="continue-play">
          <button class="ep-play-btn continue-play-btn" aria-label="Lanjutkan ${ep.title}" data-series="${si}" data-ep="${entry.epNumber}">
            ${SMALL_PLAY_ICON}
          </button>
        </div>
      </div>
    `;
  });
  html += '</div>';
  section.innerHTML = html;
  section.style.display = '';

  // Bind continue cards
  section.querySelectorAll('.continue-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.continue-play-btn')) return;
      playEpisode(parseInt(card.dataset.series), parseInt(card.dataset.ep));
    });
  });
  section.querySelectorAll('.continue-play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      playEpisode(parseInt(btn.dataset.series), parseInt(btn.dataset.ep));
    });
  });
}

// ===== Playback =====
function playEpisode(seriesIndex, epNumber) {
  const series = PODCAST_DATA[seriesIndex];
  const episode = series.episodes.find(e => e.number === epNumber);
  if (!episode) return;

  // If same episode, toggle play/pause
  if (currentEpisode && currentEpisode.number === epNumber && currentSeries.series === series.series) {
    togglePlayPause();
    return;
  }

  // Update current
  currentEpisode = episode;
  currentSeries = series;

  // Set audio source
  audio.src = getAudioUrl(episode.file);
  audio.load();

  // Show player
  player.classList.add('visible');
  player.setAttribute('aria-hidden', 'false');

  // Update player UI
  playerSeries.textContent = series.series;
  playerTitle.textContent = `${episode.title} — ${episode.subtitle}`;

  // Update card highlights
  updateCardHighlights();

  // Check for saved position
  const progId = `${series.series}::${epNumber}`;
  const savedProgress = progressCache[progId];
  if (savedProgress && savedProgress.currentTime > 5) {
    // Resume from saved position (skip first 5 seconds to avoid replaying intro)
    audio.addEventListener('loadedmetadata', function onMeta() {
      audio.currentTime = savedProgress.currentTime;
      audio.removeEventListener('loadedmetadata', onMeta);
    }, { once: true });
  }

  // Play (must be from user gesture for autoplay policy)
  audio.play().then(() => {
    isPlaying = true;
    updatePlayButton();
    updateMediaSession();
  }).catch(err => {
    console.warn('Autoplay blocked:', err);
    isPlaying = false;
    updatePlayButton();
  });
}

function togglePlayPause() {
  if (!currentEpisode) return;
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play().catch(err => console.warn('Play failed:', err));
  }
}

function updatePlayButton() {
  if (isPlaying) {
    btnPlay.innerHTML = PAUSE_ICON;
    btnPlay.setAttribute('aria-label', 'Jeda');
    btnPlay.setAttribute('title', 'Jeda');
  } else {
    btnPlay.innerHTML = PLAY_ICON;
    btnPlay.setAttribute('aria-label', 'Putar');
    btnPlay.setAttribute('title', 'Putar');
  }

  // Update play buttons on cards
  document.querySelectorAll('.ep-play-btn').forEach(btn => {
    const si = parseInt(btn.dataset.series);
    const ep = parseInt(btn.dataset.ep);
    if (currentEpisode && currentEpisode.number === ep && PODCAST_DATA[si].series === currentSeries.series) {
      btn.innerHTML = isPlaying ? SMALL_PAUSE_ICON : SMALL_PLAY_ICON;
    } else {
      btn.innerHTML = SMALL_PLAY_ICON;
    }
  });
}

function updateCardHighlights() {
  document.querySelectorAll('.episode-card').forEach(card => {
    const si = parseInt(card.dataset.series);
    const ep = parseInt(card.dataset.ep);
    const isCurrent = currentEpisode && currentEpisode.number === ep && PODCAST_DATA[si].series === currentSeries.series;
    card.classList.toggle('playing', isCurrent && isPlaying);
    card.classList.toggle('paused', isCurrent && !isPlaying);
    if (!isCurrent) {
      card.classList.remove('playing', 'paused');
    }
  });
}

// ===== Media Session API (background playback) =====
function updateMediaSession() {
  if (!('mediaSession' in navigator)) return;

  navigator.mediaSession.metadata = new MediaMetadata({
    title: currentEpisode.title,
    artist: `TemanTuton — ${currentSeries.series}`,
    album: currentSeries.series,
    artwork: [
      { src: `${AUDIO_BASE || '/'}img/icon-512.png`, sizes: '512x512', type: 'image/png' },
      { src: `${AUDIO_BASE || '/'}img/icon-192.png`, sizes: '192x192', type: 'image/png' }
    ]
  });

  navigator.mediaSession.setActionHandler('play', () => {
    audio.play().catch(() => {});
  });
  navigator.mediaSession.setActionHandler('pause', () => {
    audio.pause();
  });
  navigator.mediaSession.setActionHandler('seekbackward', (details) => {
    audio.currentTime = Math.max(0, audio.currentTime - (details.seekOffset || 15));
  });
  navigator.mediaSession.setActionHandler('seekforward', (details) => {
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + (details.seekOffset || 15));
  });
  navigator.mediaSession.setActionHandler('seekto', (details) => {
    if (details.fastSeek && 'fastSeek' in audio) {
      audio.fastSeek(details.seekTime);
    } else {
      audio.currentTime = details.seekTime;
    }
  });
}

// ===== Audio Events =====
audio.addEventListener('play', () => {
  isPlaying = true;
  updatePlayButton();
  updateCardHighlights();
});

audio.addEventListener('pause', () => {
  isPlaying = false;
  updatePlayButton();
  updateCardHighlights();
  // Save progress on pause
  if (currentEpisode && currentSeries && audio.currentTime > 0) {
    saveProgress(currentSeries.series, currentEpisode.number, audio.currentTime, audio.duration || 0);
  }
});

audio.addEventListener('ended', () => {
  isPlaying = false;
  updatePlayButton();
  updateCardHighlights();
  // Mark as completed
  if (currentSeries && currentEpisode) {
    saveProgress(currentSeries.series, currentEpisode.number, audio.duration || 0, audio.duration || 1);
    // Re-render to update progress bars
    loadProgressCache().then(() => renderContent());
    // Auto-play next episode in same series
    const idx = currentSeries.episodes.findIndex(e => e.number === currentEpisode.number);
    if (idx >= 0 && idx < currentSeries.episodes.length - 1) {
      const next = currentSeries.episodes[idx + 1];
      playEpisode(PODCAST_DATA.indexOf(currentSeries), next.number);
    }
  }
});

// Save progress periodically during playback
let progressSaveInterval = null;
audio.addEventListener('playing', () => {
  if (progressSaveInterval) clearInterval(progressSaveInterval);
  progressSaveInterval = setInterval(() => {
    if (currentEpisode && currentSeries && audio.currentTime > 0) {
      saveProgress(currentSeries.series, currentEpisode.number, audio.currentTime, audio.duration || 0);
    }
  }, 15000); // save every 15 seconds
});

audio.addEventListener('pause', () => {
  if (progressSaveInterval) {
    clearInterval(progressSaveInterval);
    progressSaveInterval = null;
  }
});

audio.addEventListener('ended', () => {
  if (progressSaveInterval) {
    clearInterval(progressSaveInterval);
    progressSaveInterval = null;
  }
});

audio.addEventListener('loadedmetadata', () => {
  playerDuration.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  playerProgressBar.style.width = `${pct}%`;
  playerProgressHandle.style.left = `${pct}%`;
  playerCurrentTime.textContent = formatTime(audio.currentTime);
});

// ===== Player Controls =====
btnPlay.addEventListener('click', togglePlayPause);

btnRewind.addEventListener('click', () => {
  if (!currentEpisode) return;
  audio.currentTime = Math.max(0, audio.currentTime - 15);
});

btnForward.addEventListener('click', () => {
  if (!currentEpisode) return;
  audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 15);
});

// Speed control
btnSpeed.addEventListener('click', () => {
  speedIndex = (speedIndex + 1) % SPEEDS.length;
  audio.playbackRate = SPEEDS[speedIndex];
  btnSpeed.textContent = `${SPEEDS[speedIndex]}x`;
});

// Progress bar seeking
let isSeeking = false;

function seekFromEvent(e) {
  const rect = playerProgress.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  if (audio.duration) {
    audio.currentTime = pct * audio.duration;
  }
  playerProgressBar.style.width = `${pct * 100}%`;
  playerProgressHandle.style.left = `${pct * 100}%`;
}

playerProgress.addEventListener('mousedown', (e) => {
  isSeeking = true;
  seekFromEvent(e);
});

document.addEventListener('mousemove', (e) => {
  if (isSeeking) seekFromEvent(e);
});

document.addEventListener('mouseup', () => {
  isSeeking = false;
});

// Touch support for progress bar
playerProgress.addEventListener('touchstart', (e) => {
  isSeeking = true;
  seekFromEvent(e.touches[0]);
}, { passive: true });

playerProgress.addEventListener('touchmove', (e) => {
  if (isSeeking) seekFromEvent(e.touches[0]);
}, { passive: true });

playerProgress.addEventListener('touchend', () => {
  isSeeking = false;
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', async () => {
  await loadProgressCache();
  renderContent();
  audio.playbackRate = SPEEDS[speedIndex];
  audio.preload = 'metadata';

  // Restore last playing episode
  const entries = Object.values(progressCache)
    .filter(p => p.progress > 0.01 && p.progress < 0.95)
    .sort((a, b) => b.lastPlayed - a.lastPlayed);

  if (entries.length > 0) {
    const last = entries[0];
    const si = PODCAST_DATA.findIndex(s => s.series === last.series);
    if (si >= 0) {
      // Prepare player with last episode info (don't autoplay)
      const series = PODCAST_DATA[si];
      const ep = series.episodes.find(e => e.number === last.epNumber);
      if (ep) {
        currentEpisode = ep;
        currentSeries = series;
        audio.src = getAudioUrl(ep.file);
        audio.load();
        player.classList.add('visible');
        player.setAttribute('aria-hidden', 'false');
        playerSeries.textContent = series.series;
        playerTitle.textContent = `${ep.title} — ${ep.subtitle}`;
        // Restore position when loaded
        audio.addEventListener('loadedmetadata', function restorePos() {
          if (last.currentTime > 5) {
            audio.currentTime = last.currentTime;
          }
          playerDuration.textContent = formatTime(audio.duration);
          playerCurrentTime.textContent = formatTime(audio.currentTime);
          const pct = last.progress * 100;
          playerProgressBar.style.width = `${pct}%`;
          playerProgressHandle.style.left = `${pct}%`;
          audio.removeEventListener('loadedmetadata', restorePos);
        }, { once: true });
      }
    }
  }
});