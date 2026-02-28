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

  test("publication order values are sequential and start at one", () => {
    const orders = cvContent.publications.map((publication) => publication.order).sort((left, right) => left - right);

    for (let index = 0; index < orders.length; index += 1) {
      expect(orders[index]).toBe(index + 1);
    }
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

  test("internal publication asset paths use semantic naming convention", () => {
    const publicationAssetPathPattern =
      /^\/assets\/publications\/\d{4}--[a-z0-9-]+--(thumb|poster|paper-pdf)\.(png|webp|pdf)$/;

    for (const publication of cvContent.publications) {
      const candidatePaths = [publication.thumbnailPath, publication.posterUrl, publication.paperUrl].filter(
        (value) => typeof value === "string" && value.startsWith("/assets/publications/"),
      );

      for (const candidatePath of candidatePaths) {
        expect(publicationAssetPathPattern.test(candidatePath)).toBeTrue();
      }
    }
  });

  test("related publication experience ids refer to existing experience entries", () => {
    const experienceIds = new Set(cvContent.experience.map((item) => item.id));

    for (const publication of cvContent.publications) {
      for (const experienceId of publication.relatedExperienceIds ?? []) {
        expect(experienceIds.has(experienceId)).toBeTrue();
      }
    }
  });
});
