const BACKSLASH_PLACEHOLDER = "LATEXBACKSLASHPLACEHOLDERX";

const LATEX_REPLACEMENTS: Array<[RegExp, string]> = [
  [/&/g, "\\&"],
  [/%/g, "\\%"],
  [/\$/g, "\\$"],
  [/#/g, "\\#"],
  [/_/g, "\\_"],
  [/{/g, "\\{"],
  [/}/g, "\\}"],
  [/~/g, "\\textasciitilde{}"],
  [/\^/g, "\\textasciicircum{}"],
];

export const escapeLatex = (value: string): string => {
  const withoutBackslash = value.replaceAll("\\", BACKSLASH_PLACEHOLDER);
  const escaped = LATEX_REPLACEMENTS.reduce(
    (currentValue, [pattern, replacement]) => currentValue.replace(pattern, replacement),
    withoutBackslash,
  );

  return escaped.replaceAll(BACKSLASH_PLACEHOLDER, "\\textbackslash{}");
};

export const highlightSelfInAuthors = (authors: string): string => {
  return authors.replace(
    /\b(Tzu-Ming Harry Hsu|Tzu Ming Harry Hsu|Tzu-Ming Hsu|Tzu Ming Hsu|Harry Hsu)\b/g,
    "\\textbf{$1}",
  );
};
