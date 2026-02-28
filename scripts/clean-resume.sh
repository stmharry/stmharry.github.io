#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

rm -rf "$ROOT_DIR/resume/build"
rm -f "$ROOT_DIR/resume/resume.tex"

printf "Cleaned generated resume artifacts.\n"
