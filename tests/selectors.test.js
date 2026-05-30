import { describe, expect, test } from "bun:test";

import { cvContent } from "../src/data/cv/content";
import { resumeVariantIds } from "../src/data/cv/variants";
import {
  filterPublicationsByTopic,
  getExperienceForResume,
  getExperienceForVariant,
  getExperiencePublicationLinks,
  getProfileForResume,
  getProfileForVariant,
  getResumePublications,
  getTopicLabelBySlug,
  getWebPublications,
  getUsedTopics,
  sortExperienceByRecentPeriod,
  sortPublicationsByYear,
} from "../src/data/cv/selectors";

describe("publication selectors", () => {
  test("returns only curated web publications in featured order", () => {
    const sorted = getWebPublications(cvContent.publications);

    expect(sorted.length).toBeGreaterThan(0);
    for (let index = 0; index < sorted.length - 1; index += 1) {
      expect(sorted[index].webFeaturedOrder).toBeLessThan(sorted[index + 1].webFeaturedOrder);
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
    const grouped = getExperiencePublicationLinks(getWebPublications(cvContent.publications));

    expect(grouped["google-student-researcher"]?.length ?? 0).toBeGreaterThan(0);
    const mitLinks = grouped["google-student-researcher"] ?? [];

    for (let index = 0; index < mitLinks.length - 1; index += 1) {
      expect(mitLinks[index].year).toBeGreaterThanOrEqual(mitLinks[index + 1].year);
    }
  });
});

describe("variant selectors", () => {
  test("uses the canonical resume variant list", () => {
    expect(resumeVariantIds).toEqual(["applied", "research"]);
    expect(new Set(resumeVariantIds).size).toBe(resumeVariantIds.length);
  });

  test("returns variant-specific profile copy", () => {
    const applied = getProfileForVariant(cvContent.profile, "applied");
    const research = getProfileForVariant(cvContent.profile, "research");

    expect(applied.headline).not.toBe(research.headline);
    expect(applied.summaryBullets).not.toEqual(research.summaryBullets);
  });

  test("returns variant-ordered experience entries", () => {
    const researchExperience = getExperienceForVariant(cvContent.experience, "research");

    expect(researchExperience[0]?.id).toBe("mit-ra");
    expect(researchExperience[1]?.id).toBe("google-student-researcher");
  });

  test("returns curated variant-specific resume publications", () => {
    const applied = getResumePublications(cvContent.publications, "applied");
    const research = getResumePublications(cvContent.publications, "research");

    expect(applied.length).toBeGreaterThan(0);
    expect(research.length).toBeGreaterThan(applied.length - 1);
    expect(applied.every((publication) => publication.variantOrder?.applied !== undefined)).toBeTrue();
    expect(research.every((publication) => publication.variantOrder?.research !== undefined)).toBeTrue();
  });

  test("returns resume profile copy for a variant", () => {
    const profile = getProfileForResume(cvContent.profile, "research");

    expect(profile.headline).toContain("Research scientist");
    expect(profile.summaryBullets[0]).toContain("20+ publications");
  });

  test("sorts experience chronologically by end date and start date", () => {
    const sorted = sortExperienceByRecentPeriod([
      { ...cvContent.experience[0], id: "same-a", period: "Jan 2020 -- Dec 2020" },
      { ...cvContent.experience[0], id: "year-only", period: "2021 -- Present" },
      { ...cvContent.experience[0], id: "month-year", period: "Apr 2025 -- Apr 2026" },
      { ...cvContent.experience[0], id: "present-recent", period: "Dec 2024 -- Present" },
      { ...cvContent.experience[0], id: "same-b", period: "Jan 2020 -- Dec 2020" },
    ]);

    expect(sorted.map((item) => item.id)).toEqual(["present-recent", "year-only", "month-year", "same-a", "same-b"]);
  });

  test("sorts default resume experience by recent period", () => {
    const appliedExperience = sortExperienceByRecentPeriod(getExperienceForResume(cvContent.experience, "applied"));

    expect(appliedExperience.slice(0, 5).map((item) => item.id)).toEqual([
      "clarq-ai",
      "iabit",
      "dentscape",
      "codegreen-labs",
      "hashgreen-labs",
    ]);
  });
});
