import { describe, expect, test } from "bun:test";

import { cvContent } from "../src/data/cv/content";
import {
  filterPublicationsByTopic,
  getFeaturedPublications,
  getUsedTopics,
} from "../src/data/cv/selectors";

describe("publication selectors", () => {
  test("returns featured publications sorted by descending year", () => {
    const featured = getFeaturedPublications(cvContent.publications);

    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((publication) => publication.featuredOnWeb)).toBeTrue();

    for (let index = 0; index < featured.length - 1; index += 1) {
      expect(featured[index].year).toBeGreaterThanOrEqual(featured[index + 1].year);
    }
  });

  test("filters publications by selected topic slug", () => {
    const filtered = filterPublicationsByTopic(cvContent.publications, "medical-ai");

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((publication) => publication.topics.includes("medical-ai"))).toBeTrue();
  });

  test("returns only topics that are used by at least one publication", () => {
    const usedTopics = getUsedTopics(cvContent.topics, cvContent.publications);

    expect(usedTopics.length).toBeGreaterThan(0);
  });
});
