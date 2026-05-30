#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RESUME_DIR="$ROOT_DIR/resume"
BUILD_ROOT="$RESUME_DIR/build"
OUTPUT_DIR="$ROOT_DIR/public/assets/resume"

REQUIRED_STY=(
  "xcolor.sty:xcolor"
  "baskervillef.sty:baskervillef"
  "CJKutf8.sty:cjk"
  "titlesec.sty:titlesec"
  "enumitem.sty:enumitem"
  "nth.sty:nth"
)

if ! command -v latexmk >/dev/null 2>&1; then
  printf "latexmk is not installed. Please install a LaTeX distribution with latexmk.\n" >&2
  exit 1
fi

if ! command -v kpsewhich >/dev/null 2>&1; then
  printf "kpsewhich is not installed. Please install a full TeX distribution.\n" >&2
  exit 1
fi

missing_packages=()
for item in "${REQUIRED_STY[@]}"; do
  style_file="${item%%:*}"
  package_name="${item##*:}"
  if ! kpsewhich "$style_file" >/dev/null 2>&1; then
    missing_packages+=("$package_name")
  fi
done

if [ "${#missing_packages[@]}" -gt 0 ]; then
  printf "Missing TeX packages: %s\n" "${missing_packages[*]}" >&2
  printf "Install resume dependencies first: bun run resume:deps\n" >&2
  exit 1
fi

mkdir -p "$OUTPUT_DIR"
mkdir -p "$BUILD_ROOT"

build_dir="$BUILD_ROOT/resume"
source_tex="$RESUME_DIR/resume.tex"
output_pdf="$OUTPUT_DIR/tzu-ming-harry-hsu-resume.pdf"

mkdir -p "$build_dir"
latexmk -pdf -interaction=nonstopmode -output-directory="$build_dir" "$source_tex"
cp "$build_dir/resume.pdf" "$output_pdf"

printf "Generated PDF: %s\n" "$output_pdf"
