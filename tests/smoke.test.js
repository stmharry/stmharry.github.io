import { describe, expect, test } from "bun:test";

import { isExternalUrl } from "../src/lib/url";

describe("utility smoke coverage", () => {
  test("detects external urls", () => {
    expect(isExternalUrl("https://example.com")).toBeTrue();
    expect(isExternalUrl("/assets/resume/tzu-ming-harry-hsu-resume.pdf")).toBeFalse();
  });
});
