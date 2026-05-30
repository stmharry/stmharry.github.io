#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

rm -rf "$ROOT_DIR/resume/build"
rm -rf "$ROOT_DIR/resume/output"
rm -rf "$ROOT_DIR/resume/targets"
rm -f "$ROOT_DIR/resume/resume.tex"
rm -f "$ROOT_DIR/resume/resume-applied.tex"
rm -f "$ROOT_DIR/resume/resume-research.tex"

printf "Cleaned generated resume artifacts.\n"
