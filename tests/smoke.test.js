import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

import { isExternalUrl } from "../src/lib/url";

describe("utility smoke coverage", () => {
  test("detects external urls", () => {
    expect(isExternalUrl("https://example.com")).toBeTrue();
    expect(isExternalUrl("/assets/resume/tzu-ming-harry-hsu-resume.pdf")).toBeFalse();
  });

  test("publishes current physical AI metadata", () => {
    const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);

    expect(html).toContain("Tzu-Ming Harry Hsu · Physical AI Researcher");
    expect(html).toContain("Member of Technical Staff at Moonlake AI building simulation infrastructure for physical AI.");
    expect(jsonLdMatch).not.toBeNull();

    const jsonLd = JSON.parse(jsonLdMatch[1]);
    expect(jsonLd.email).toBe("mailto:h@stmharry.io");
    expect(jsonLd.jobTitle).toBe("Member of Technical Staff");
    expect(jsonLd.worksFor).toEqual({
      "@type": "Organization",
      name: "Moonlake AI",
      url: "https://www.moonlakeai.com",
    });
    expect(jsonLd.homeLocation.name).toBe("San Francisco Bay Area");
  });
});
