import { describe, expect, test } from "bun:test";

import { emphasizeSelfAuthors, isSelfAuthor } from "../src/data/cv/authors";

describe("author utilities", () => {
  test("detects configured self author variants", () => {
    expect(isSelfAuthor("Tzu-Ming Harry Hsu")).toBeTrue();
    expect(isSelfAuthor("Alice Smith")).toBeFalse();
  });

  test("emphasizes self author names in author strings", () => {
    const emphasized = emphasizeSelfAuthors("Alice, Tzu-Ming Harry Hsu, Bob", (author) => `<${author}>`);

    expect(emphasized).toContain("<Tzu-Ming Harry Hsu>");
  });
});
