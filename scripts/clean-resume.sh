#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

rm -rf "$ROOT_DIR/resume/build"
rm -rf "$ROOT_DIR/resume/output"
rm -rf "$ROOT_DIR/resume/targets"

while IFS= read -r variant; do
  [ -n "$variant" ] && rm -f "$ROOT_DIR/resume/resume-$variant.tex"
done < <(cd "$ROOT_DIR" && bun run scripts/list-resume-variants.ts)

printf "Cleaned generated resume artifacts.\n"
