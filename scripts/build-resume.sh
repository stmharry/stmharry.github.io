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

mkdir -p "$OUTPUT_DIR"
mkdir -p "$BUILD_ROOT"

build_dir="$BUILD_ROOT/resume"
source_tex="$RESUME_DIR/resume.tex"
output_pdf="$OUTPUT_DIR/tzu-ming-harry-hsu-resume.pdf"

mkdir -p "$build_dir"

if command -v latexmk >/dev/null 2>&1 && command -v kpsewhich >/dev/null 2>&1; then
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

  latexmk -pdf -interaction=nonstopmode -output-directory="$build_dir" "$source_tex"
elif command -v tectonic >/dev/null 2>&1; then
  tectonic --keep-logs --outdir "$build_dir" "$source_tex"
else
  printf "No supported LaTeX engine found. Install latexmk with TeX Live or Tectonic.\n" >&2
  exit 1
fi

cp "$build_dir/resume.pdf" "$output_pdf"

printf "Generated PDF: %s\n" "$output_pdf"
