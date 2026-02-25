#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RESUME_DIR="$ROOT_DIR/resume"
BUILD_DIR="$RESUME_DIR/build"
OUTPUT_DIR="$ROOT_DIR/public"

if ! command -v latexmk >/dev/null 2>&1; then
  printf "latexmk is not installed. Please install a LaTeX distribution with latexmk.\n" >&2
  exit 1
fi

mkdir -p "$BUILD_DIR"
mkdir -p "$OUTPUT_DIR"

latexmk -pdf -interaction=nonstopmode -output-directory="$BUILD_DIR" "$RESUME_DIR/resume.tex"
cp "$BUILD_DIR/resume.pdf" "$OUTPUT_DIR/resume.pdf"

printf "Generated PDF: %s\n" "$OUTPUT_DIR/resume.pdf"
