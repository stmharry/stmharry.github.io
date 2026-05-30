import { describe, expect, test } from "bun:test";

import { cvContent } from "../src/data/cv/content";
import { resumeTargetOverlayById, resumeTargetOverlays } from "../src/data/cv/targets";
import { resumeVariantIds } from "../src/data/cv/variants";
import {
  filterPublicationsByTopic,
  getExperienceForResume,
  getExperienceForVariant,
  getExperiencePublicationLinks,
  getProfileForResume,
  getProfileForVariant,
  getResumePublicationsForTarget,
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

  test("target overlays reference canonical base variants", () => {
    const validVariantIds = new Set(resumeVariantIds);

    expect(resumeTargetOverlays.every((overlay) => validVariantIds.has(overlay.baseVariant))).toBeTrue();
  });

  test("applies target-specific profile overrides on top of the base variant", () => {
    const overlay = resumeTargetOverlayById["figure-data-infra"];
    const profile = getProfileForResume(cvContent.profile, overlay.baseVariant, overlay);

    expect(profile.headline).toContain("data infrastructure");
    expect(profile.summaryBullets[2]).toContain("10 TB");
  });

  test("applies target-specific experience ordering and bullet overrides", () => {
    const overlay = resumeTargetOverlayById["pi-research"];
    const experience = getExperienceForResume(cvContent.experience, overlay.baseVariant, overlay);

    expect(experience[0]?.id).toBe("google-student-researcher");
    expect(experience[1]?.id).toBe("mit-ra");
    expect(experience[0]?.highlights[0]?.text).toContain("1,000+ GPUs");
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

  test("sorts target-specific resume experience by recent period after overrides", () => {
    const overlay = resumeTargetOverlayById["figure-data-infra"];
    const targetExperience = sortExperienceByRecentPeriod(getExperienceForResume(cvContent.experience, overlay.baseVariant, overlay));

    expect(targetExperience.slice(0, 5).map((item) => item.id)).toEqual([
      "clarq-ai",
      "iabit",
      "dentscape",
      "codegreen-labs",
      "hashgreen-labs",
    ]);
    expect(targetExperience[0]?.summary).toContain("100+ deployments");
  });

  test("returns target-specific publication subsets in overlay order", () => {
    const overlay = resumeTargetOverlayById["apptronik-perception"];
    const publications = getResumePublicationsForTarget(cvContent.publications, overlay.baseVariant, overlay);

    expect(publications.map((publication) => publication.id)).toEqual([
      "3d-aware-2018",
      "deepopg-2021",
      "dental-multinational-2025",
      "intraoral-bmc-2023",
      "fedvc-2020",
    ]);
  });

  test("bridge bigtech infra overlay leads with Google-scale systems and production ML", () => {
    const overlay = resumeTargetOverlayById["bigtech-ml-infra"];
    const profile = getProfileForResume(cvContent.profile, overlay.baseVariant, overlay);
    const experience = getExperienceForResume(cvContent.experience, overlay.baseVariant, overlay);

    expect(profile.summaryBullets[1]).toContain("Google");
    expect(profile.summaryBullets[2]).toContain("10 TB");
    expect(experience[0]?.id).toBe("google-student-researcher");
    expect(experience[1]?.id).toBe("dentscape");
  });

  test("bridge healthcare overlay selects medical and multimodal publications first", () => {
    const overlay = resumeTargetOverlayById["healthcare-ai-multimodal"];
    const publications = getResumePublicationsForTarget(cvContent.publications, overlay.baseVariant, overlay);

    expect(publications.map((publication) => publication.id)).toEqual([
      "dental-multinational-2025",
      "intraoral-bmc-2023",
      "deepopg-2021",
      "body-composition-2021",
      "liver-mri-2020",
      "cxr-baselines-2020",
    ]);
  });
});
