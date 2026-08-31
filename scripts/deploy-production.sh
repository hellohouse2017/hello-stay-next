#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

npm run check:clean
npm run build:local
npm run check:clean

SHA="$(git rev-parse HEAD)"
printf '🚀 Deploying clean commit %s\n' "$SHA"

if ! command -v vercel >/dev/null 2>&1; then
  echo "❌ vercel CLI is required for production deployment" >&2
  exit 1
fi

exec vercel --prod --yes
