import { describe, expect, test } from "bun:test";

import { escapeLatex, highlightSelfInAuthors } from "../src/resume/latex";

describe("resume latex helpers", () => {
  test("escapes reserved LaTeX characters", () => {
    const escaped = escapeLatex("A&B_50% #1 $2 {x} ~ ^ \\");

    expect(escaped).toBe(
      "A\\&B\\_50\\% \\#1 \\$2 \\{x\\} \\textasciitilde{} \\textasciicircum{} \\textbackslash{}",
    );
  });

  test("highlights author name variants", () => {
    const highlighted = highlightSelfInAuthors("Alice, Tzu-Ming Harry Hsu, Bob");

    expect(highlighted).toContain("\\textbf{Tzu-Ming Harry Hsu}");
  });
});
