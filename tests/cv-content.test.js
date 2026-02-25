import { describe, expect, test } from "bun:test";

import { cvContent } from "../src/data/cv/content";

describe("canonical CV content", () => {
  test("uses unique IDs across sections", () => {
    const allIds = [
      ...cvContent.education.map((item) => item.id),
      ...cvContent.experience.map((item) => item.id),
      ...cvContent.leadership.map((item) => item.id),
      ...cvContent.awards.map((item) => item.id),
      ...cvContent.publications.map((item) => item.id),
    ];

    expect(new Set(allIds).size).toBe(allIds.length);
  });

  test("publication topics exist in topic definitions", () => {
    const topicSlugs = new Set(cvContent.topics.map((topic) => topic.slug));

    for (const publication of cvContent.publications) {
      for (const topicSlug of publication.topics) {
        expect(topicSlugs.has(topicSlug)).toBeTrue();
      }
    }
  });

  test("publication order values are unique", () => {
    const orders = cvContent.publications.map((publication) => publication.order);

    expect(new Set(orders).size).toBe(orders.length);
  });

  test("citation count values use numeric representation", () => {
    for (const publication of cvContent.publications) {
      if (publication.citationCount === undefined) {
        continue;
      }

      expect(typeof publication.citationCount).toBe("number");
      expect(Number.isInteger(publication.citationCount)).toBeTrue();
      expect(publication.citationCount).toBeGreaterThanOrEqual(0);
    }
  });
});
