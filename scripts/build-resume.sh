#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RESUME_DIR="$ROOT_DIR/resume"
BUILD_ROOT="$RESUME_DIR/build"
OUTPUT_DIR="$ROOT_DIR/public/assets/resume"
PRIVATE_OUTPUT_DIR="$RESUME_DIR/output/variants"

VARIANTS=()
PUBLIC_VARIANTS=()
while IFS= read -r variant; do
  [ -n "$variant" ] && VARIANTS+=("$variant")
done < <(cd "$ROOT_DIR" && bun run scripts/list-resume-variants.ts)

while IFS= read -r variant; do
  [ -n "$variant" ] && PUBLIC_VARIANTS+=("$variant")
done < <(cd "$ROOT_DIR" && bun run scripts/list-resume-variants.ts --public)

DEFAULT_PUBLIC_VARIANT="$(cd "$ROOT_DIR" && bun run scripts/list-resume-variants.ts --default-public)"

is_public_variant() {
  local selected="$1"

  for variant in "${PUBLIC_VARIANTS[@]}"; do
    if [ "$variant" = "$selected" ]; then
      return 0
    fi
  done

  return 1
}

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
mkdir -p "$PRIVATE_OUTPUT_DIR"

for variant in "${VARIANTS[@]}"; do
  build_dir="$BUILD_ROOT/$variant"
  source_tex="$RESUME_DIR/resume-$variant.tex"
  output_pdf="$OUTPUT_DIR/tzu-ming-harry-hsu-resume-$variant.pdf"

  mkdir -p "$build_dir"
  latexmk -pdf -interaction=nonstopmode -output-directory="$build_dir" "$source_tex"

  if is_public_variant "$variant"; then
    cp "$build_dir/resume-$variant.pdf" "$output_pdf"
    printf "Generated PDF: %s\n" "$output_pdf"

    if [ "$variant" = "$DEFAULT_PUBLIC_VARIANT" ]; then
      cp "$output_pdf" "$OUTPUT_DIR/tzu-ming-harry-hsu-resume.pdf"
    fi
  else
    private_output_pdf="$PRIVATE_OUTPUT_DIR/tzu-ming-harry-hsu-resume-$variant.pdf"
    cp "$build_dir/resume-$variant.pdf" "$private_output_pdf"
    printf "Generated private PDF: %s\n" "$private_output_pdf"
fi
done
