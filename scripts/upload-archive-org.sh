#!/usr/bin/env bash
# Upload audio files to archive.org via S3 API
# Only overwrites if local file is newer than remote
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
OVERWRITE_COUNT=0
FAIL_COUNT=0

# Convert archive.org Last-Modified header to Unix timestamp
# Archive.org returns: "Mon, 01 Jan 2024 00:00:00 GMT"
http_date_to_epoch() {
  local http_date="$1"
  # Use GNU date or BSD date depending on platform
  if date --version 2>/dev/null | grep -q GNU; then
    date -d "$http_date" +%s 2>/dev/null || echo "0"
  else
    # macOS / BSD
    date -j -f "%a, %d %b %Y %H:%M:%S %Z" "$http_date" +%s 2>/dev/null || echo "0"
  fi
}

check_remote_date() {
  local remote="$1"

  # Single HEAD request — get both status code and Last-Modified header
  local response
  response=$(curl -s --max-time 30 \
    -I \
    -H "Authorization: LOW ${IA_S3_ACCESS_KEY}:${IA_S3_SECRET_KEY}" \
    "${S3_URL}/${remote}" 2>/dev/null) || true

  local http_code
  http_code=$(echo "$response" | grep -i "^HTTP/" | tail -1 | awk '{print $2}')

  if [ "$http_code" = "200" ]; then
    local last_modified
    last_modified=$(echo "$response" | grep -i "^Last-Modified:" | sed 's/Last-Modified: *//i' | tr -d '\r' | head -1)
    if [ -n "$last_modified" ]; then
      http_date_to_epoch "$last_modified"
      return
    fi
  fi
  echo "0"
}

upload_file() {
  local filepath="$1"
  local remote="$2"

  echo -n "  $remote ... "

  if $DRY_RUN; then
    echo "[DRY RUN]"
    return 0
  fi

  # Get local file mtime
  local local_mtime
  local_mtime=$(stat -c %Y "$filepath" 2>/dev/null || stat -f %m "$filepath" 2>/dev/null)

  # Check if remote file exists and get its mtime
  local remote_mtime
  remote_mtime=$(check_remote_date "$remote")

  if [ "$remote_mtime" != "0" ]; then
    # Remote exists — compare timestamps
    if [ "$local_mtime" -le "$remote_mtime" ]; then
      echo "SKIP (remote newer or same)"
      SKIP_COUNT=$((SKIP_COUNT + 1))
      return 0
    else
      echo -n "OVERWRITE (local newer) ... "
    fi
  fi

  local http_code
  http_code=$(curl -s --max-time 600 \
    -X PUT \
    -H "Authorization: LOW ${IA_S3_ACCESS_KEY}:${IA_S3_SECRET_KEY}" \
    -H "Content-Type: audio/mp4" \
    -H "x-amz-auto-make-bucket: 1" \
    -H "X-Archive-Meta-Author: TemanTuton" \
    -H "X-Archive-Meta-Description: TemanTuton - Podcast Belajar untuk Ujian UT" \
    --data-binary "@${filepath}" \
    "${S3_URL}/${remote}" 2>/dev/null) || true

  if [ "$http_code" = "200" ] || [ "$http_code" = "201" ] || [ "$http_code" = "204" ]; then
    if [ "$remote_mtime" != "0" ]; then
      echo "OK (overwritten)"
      OVERWRITE_COUNT=$((OVERWRITE_COUNT + 1))
    else
      echo "OK (uploaded)"
      UPLOAD_COUNT=$((UPLOAD_COUNT + 1))
    fi
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
echo "Uploaded: ${UPLOAD_COUNT}  Overwritten: ${OVERWRITE_COUNT}  Skipped: ${SKIP_COUNT}  Failed: ${FAIL_COUNT}"
echo "Download URL: https://archive.org/download/${IA_IDENTIFIER}/"
echo "Item page:    https://archive.org/details/${IA_IDENTIFIER}"

if [ "$FAIL_COUNT" -gt 0 ]; then
  exit 1
fi