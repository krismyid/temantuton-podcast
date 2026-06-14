#!/usr/bin/env bash
# Upload audio files to archive.org via S3 API (CI-friendly)
# Designed for GitHub Actions but works locally with .env
#
# Usage: ./scripts/upload-archive-org.sh [--dry-run]
#
# Reads credentials from:
#   Local: .env file (IA_S3_ACCESS_KEY, IA_S3_SECRET_KEY, IA_IDENTIFIER)
#   CI:    IA_S3_ACCESS_KEY, IA_S3_SECRET_KEY, IA_IDENTIFIER env vars
#
# Files are uploaded with flattened names based on series.json prefix:
#   podcast/Hukum Adat/ep1-modul1-2.m4a → temantuton-podcast/hukum-adat-ep1-modul1-2.m4a

set -euo pipefail
cd "$(dirname "$0")/.."

DRY_RUN=false
if [ "${1:-}" = "--dry-run" ]; then
  DRY_RUN=true
  echo "=== DRY RUN MODE ==="
fi

# Load credentials: env vars take precedence, .env as fallback
if [ -z "${IA_S3_ACCESS_KEY:-}" ] && [ -f .env ]; then
  IA_S3_ACCESS_KEY=$(grep '^IA_S3_ACCESS_KEY=' .env | cut -d= -f2)
  IA_S3_SECRET_KEY=$(grep '^IA_S3_SECRET_KEY=' .env | cut -d= -f2)
  IA_IDENTIFIER=$(grep '^IA_IDENTIFIER=' .env | cut -d= -f2)
fi

IA_S3_ACCESS_KEY="${IA_S3_ACCESS_KEY:-}"
IA_S3_SECRET_KEY="${IA_S3_SECRET_KEY:-}"
IA_IDENTIFIER="${IA_IDENTIFIER:-temantuton-podcast}"
IA_S3_HOST="s3.us.archive.org"
S3_URL="https://${IA_S3_HOST}/${IA_IDENTIFIER}"

if [ -z "$IA_S3_ACCESS_KEY" ] || [ -z "$IA_S3_SECRET_KEY" ]; then
  echo "ERROR: IA_S3_ACCESS_KEY and IA_S3_SECRET_KEY required."
  echo "Set them as env vars or in .env"
  exit 1
fi

# Collect audio files (handles spaces in paths)
UPLOAD_COUNT=0
SKIP_COUNT=0
FAIL_COUNT=0

upload_file() {
  local filepath="$1"
  local remote="$2"

  echo -n "  $remote ... "

  if $DRY_RUN; then
    echo "[DRY RUN]"
    return 0
  fi

  local http_code
  http_code=$(curl -s -o /dev/null -w "%{http_code}" \
    -X PUT \
    -H "Authorization: LOW ${IA_S3_ACCESS_KEY}:${IA_S3_SECRET_KEY}" \
    -H "Content-Type: audio/mp4" \
    -H "X-Archive-Meta-Author: TemanTuton" \
    -H "X-Archive-Meta-Description: TemanTuton - Podcast Belajar untuk Ujian UT" \
    --data-binary "@${filepath}" \
    "${S3_URL}/${remote}" 2>/dev/null) || true

  if [ "$http_code" = "200" ] || [ "$http_code" = "201" ] || [ "$http_code" = "204" ]; then
    echo "OK ($http_code)"
    UPLOAD_COUNT=$((UPLOAD_COUNT + 1))
  else
    echo "FAILED ($http_code)"
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
}

echo "=== Uploading to archive.org ==="
echo "Item: ${IA_IDENTIFIER}"
echo ""

# Scan each series directory
for series_dir in podcast/*/; do
  [ -d "$series_dir" ] || continue
  series_name=$(basename "$series_dir")
  series_json="${series_dir}series.json"

  if [ ! -f "$series_json" ]; then
    echo "  SKIP: ${series_name}/ (no series.json)"
    SKIP_COUNT=$((SKIP_COUNT + 1))
    continue
  fi

  # Read prefix from series.json
  prefix=$(node -e "
    const m = require('./${series_json}');
    console.log(m.prefix || '${series_name}'.toLowerCase().replace(/\\s+/g, '-'));
  " 2>/dev/null) || prefix=$(echo "$series_name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

  echo "Series: ${series_name} (prefix: ${prefix})"

  # Find audio files in this directory
  for audio_file in "$series_dir"*.m4a "$series_dir"*.mp3 "$series_dir"*.ogg; do
    [ -f "$audio_file" ] || continue
    filename=$(basename "$audio_file")
    remote="${prefix}-${filename}"
    upload_file "$audio_file" "$remote"
  done
done

echo ""
echo "=== Summary ==="
echo "Uploaded: ${UPLOAD_COUNT}  Failed: ${FAIL_COUNT}  Skipped: ${SKIP_COUNT}"
echo "Download URL: https://archive.org/download/${IA_IDENTIFIER}/"
echo "Item page:    https://archive.org/details/${IA_IDENTIFIER}"

if [ "$FAIL_COUNT" -gt 0 ]; then
  exit 1
fi