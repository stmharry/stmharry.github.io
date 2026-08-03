import { describe, expect, test } from "bun:test";

import { cvContent } from "../src/data/cv/content";
import {
  filterPublicationsByTopic,
  getExperienceForResume,
  getExperiencePublicationLinks,
  getResumePublications,
  getTopicLabelBySlug,
  getWebPublications,
  getUsedTopics,
  sortExperienceByRecentPeriod,
  sortPublicationsByYear,
} from "../src/data/cv/selectors";

describe("publication selectors", () => {
  test("returns all web publications in resume order", () => {
    const webPublications = getWebPublications(cvContent.publications);
    const resumePublications = getResumePublications(cvContent.publications);

    expect(webPublications.length).toBe(cvContent.publications.length);
    expect(webPublications.map((publication) => publication.id)).toEqual(
      resumePublications.map((publication) => publication.id),
    );
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
    expect(getTopicLabelBySlug(cvContent.topics, "world-models-3d-ai")).toBe("World Models & 3D AI");
    expect(getTopicLabelBySlug(cvContent.topics, "human-performance")).toBe("Human Performance");
  });

  test("groups publication links by related experience", () => {
    const grouped = getExperiencePublicationLinks(getWebPublications(cvContent.publications));

    expect(grouped["google-student-researcher"]?.length ?? 0).toBeGreaterThan(0);
    const mitLinks = grouped["google-student-researcher"] ?? [];

    for (let index = 0; index < mitLinks.length - 1; index += 1) {
      expect(mitLinks[index].year).toBeGreaterThanOrEqual(mitLinks[index + 1].year);
    }
  });
  test("returns full resume publications in reverse chronological order", () => {
    const publications = getResumePublications(cvContent.publications);

    expect(publications.map((publication) => publication.id)).toEqual([
      "performance-frontier-freediving-2026",
      "use-uncertainty-structure-2026",
      "dental-multinational-2025",
      "intraoral-bmc-2023",
      "molar-jod-2023",
      "jaw-cysts-2022",
      "rf-patent-2022",
      "phd-thesis-2022",
      "body-composition-2021",
      "visceral-adiposity-2021",
      "adversarial-protein-2021",
      "deepopg-2021",
      "rf-patent-2020",
      "liver-mri-2020",
      "chexpertpp-2020",
      "sm-thesis-2020",
      "cxr-baselines-2020",
      "fedvc-2020",
      "fedavgm-2019",
      "transfer-neural-trees-tip-2019",
      "ccr-2019",
      "multimodal-2018",
      "wireless-stickers-2018",
      "3d-aware-2018",
      "transfer-neural-trees-eccv-2016",
      "connecting-dots-2015",
      "imbalanced-domain-2015",
    ]);
  });

  test("uses the physical AI resume profile", () => {
    expect(cvContent.profile.headline).toBe("Physical AI Researcher");
    expect(cvContent.profile.tagline).toBe("World Models, Embodied AI, and Robot Learning");
    expect(cvContent.profile.location).toBe("San Francisco Bay Area");
    expect(cvContent.profile.summaryBullets[0]).toContain("Moonlake AI");
    expect(cvContent.profile.summaryBullets[1]).toContain("Google Federated Learning core contributor");
    expect(cvContent.profile.summaryBullets[1]).toContain("YFLOP-scale");
    expect(cvContent.profile.summaryBullets[2]).toContain("Founder-operator");
    expect(cvContent.profile.summaryBullets[3]).toContain("International Physics Olympiad world champion");
  });

  test("returns resume experience entries without selection input", () => {
    expect(getExperienceForResume(cvContent.experience)).toBe(cvContent.experience);
  });
});

describe("resume selectors", () => {
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

  test("uses canonical resume experience order", () => {
    const resumeExperience = getExperienceForResume(cvContent.experience);

    expect(resumeExperience.slice(0, 6).map((item) => item.id)).toEqual([
      "moonlake-ai",
      "dentscape",
      "clarq-ai",
      "codegreen-labs",
      "hashgreen-labs",
      "iabit",
    ]);
  });
});
