import { describe, expect, test } from "bun:test";

import { cvContent } from "../src/data/cv/content";
import {
  filterPublicationsByTopic,
  getExperiencePublicationLinks,
  getTopicLabelBySlug,
  getWebPublications,
  getUsedTopics,
  sortPublicationsByYear,
} from "../src/data/cv/selectors";

describe("publication selectors", () => {
  test("returns publications sorted by descending year", () => {
    const sorted = getWebPublications(cvContent.publications);

    expect(sorted.length).toBe(cvContent.publications.length);

    for (let index = 0; index < sorted.length - 1; index += 1) {
      expect(sorted[index].year).toBeGreaterThanOrEqual(sorted[index + 1].year);
    }
  });

  test("sorts same-year publications by ascending order", () => {
    const sameYearPublications = cvContent.publications.filter((publication) => publication.year === 2020);
    const sorted = sortPublicationsByYear(sameYearPublications);

    for (let index = 0; index < sorted.length - 1; index += 1) {
      expect(sorted[index].order).toBeLessThan(sorted[index + 1].order);
    }
  });

  test("filters publications by selected topic slug", () => {
    const filtered = filterPublicationsByTopic(cvContent.publications, "medical-ai");

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((publication) => publication.topics.includes("medical-ai"))).toBeTrue();
  });

  test("returns original list when filtering by all topics", () => {
    const filtered = filterPublicationsByTopic(cvContent.publications, "all");

    expect(filtered).toBe(cvContent.publications);
  });

  test("returns only topics that are used by at least one publication", () => {
    const usedTopics = getUsedTopics(cvContent.topics, cvContent.publications);

    expect(usedTopics.length).toBeGreaterThan(0);
    const usedTopicSlugs = new Set(cvContent.publications.flatMap((publication) => publication.topics));
    expect(usedTopics.every((topic) => usedTopicSlugs.has(topic.slug))).toBeTrue();
  });

  test("maps topic slug to configured label with fallback", () => {
    expect(getTopicLabelBySlug(cvContent.topics, "medical-ai")).toBe("Medical AI");
  });

  test("groups publication links by related experience", () => {
    const grouped = getExperiencePublicationLinks(cvContent.publications);

    expect(grouped["mit-ra"]?.length ?? 0).toBeGreaterThan(0);
    const mitLinks = grouped["mit-ra"] ?? [];

    for (let index = 0; index < mitLinks.length - 1; index += 1) {
      expect(mitLinks[index].year).toBeGreaterThanOrEqual(mitLinks[index + 1].year);
    }
  });
});
