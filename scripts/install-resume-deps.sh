#!/usr/bin/env bash
set -euo pipefail

REQUIRED_STY=(
  "xcolor.sty:xcolor"
  "baskervillef.sty:baskervillef"
  "CJKutf8.sty:cjk"
  "titlesec.sty:titlesec"
  "enumitem.sty:enumitem"
  "nth.sty:nth"
)

install_tex_dist() {
  if command -v apk >/dev/null 2>&1; then
    apk add --no-cache texlive-full
    return
  fi
  if command -v apt-get >/dev/null 2>&1; then
    apt-get update
    apt-get install -y texlive-full latexmk
    return
  fi
  if command -v dnf >/dev/null 2>&1; then
    dnf install -y texlive-scheme-full latexmk
    return
  fi
  printf "No supported system package manager found for TeX installation.\n" >&2
  exit 1
}

if ! command -v kpsewhich >/dev/null 2>&1 || ! command -v latexmk >/dev/null 2>&1; then
  install_tex_dist
fi

missing_packages=()
for item in "${REQUIRED_STY[@]}"; do
  style_file="${item%%:*}"
  package_name="${item##*:}"
  if ! kpsewhich "$style_file" >/dev/null 2>&1; then
    missing_packages+=("$package_name")
  fi
done

if [ "${#missing_packages[@]}" -eq 0 ]; then
  printf "Resume TeX dependencies are already installed.\n"
  exit 0
fi

if ! command -v tlmgr >/dev/null 2>&1; then
  printf "Missing TeX packages (%s), and tlmgr is unavailable. Install a fuller TeX distribution (e.g., texlive-full).\n" "${missing_packages[*]}" >&2
  exit 1
fi

if ! tlmgr --usermode info >/dev/null 2>&1; then
  tlmgr init-usertree >/dev/null
fi

printf "Installing missing TeX packages: %s\n" "${missing_packages[*]}"
tlmgr --usermode install "${missing_packages[@]}"
printf "Resume TeX dependencies installed.\n"
