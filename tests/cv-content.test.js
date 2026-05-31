import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { cvContent } from "../src/data/cv/content";

const readWebpDimensions = (filePath) => {
  const buffer = readFileSync(filePath);
  const riff = buffer.toString("ascii", 0, 4);
  const webp = buffer.toString("ascii", 8, 12);

  expect(riff).toBe("RIFF");
  expect(webp).toBe("WEBP");

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;

    if (chunkType === "VP8X") {
      const width = 1 + buffer.readUIntLE(dataOffset + 4, 3);
      const height = 1 + buffer.readUIntLE(dataOffset + 7, 3);
      return { width, height };
    }

    if (chunkType === "VP8 ") {
      const width = buffer.readUInt16LE(dataOffset + 6) & 0x3fff;
      const height = buffer.readUInt16LE(dataOffset + 8) & 0x3fff;
      return { width, height };
    }

    if (chunkType === "VP8L") {
      const bits = buffer.readUInt32LE(dataOffset + 1);
      const width = (bits & 0x3fff) + 1;
      const height = ((bits >> 14) & 0x3fff) + 1;
      return { width, height };
    }

    offset += 8 + chunkSize + (chunkSize % 2);
  }

  throw new Error(`Unable to read WebP dimensions: ${filePath}`);
};

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
      expect(publication.topics.length).toBeGreaterThan(0);

      for (const topicSlug of publication.topics) {
        expect(topicSlugs.has(topicSlug)).toBeTrue();
      }
    }
  });

  test("publication topic definitions match the career taxonomy", () => {
    expect(cvContent.topics.map((topic) => topic.slug)).toEqual([
      "medical-ai",
      "federated-learning",
      "computer-vision",
      "world-models-3d-ai",
      "wireless-sensing",
      "ml-systems",
      "human-performance",
    ]);
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

  test("all local publication thumbnails use semantic paths and measured aspect ratios", () => {
    for (const publication of cvContent.publications) {
      const expectedThumbnailPath = `/assets/publications/${publication.year}--${publication.id}--thumb.webp`;

      expect(publication.thumbnailPath).toBe(expectedThumbnailPath);
      expect(typeof publication.thumbnailAspectRatio).toBe("number");
      expect(Number.isFinite(publication.thumbnailAspectRatio)).toBeTrue();
      expect(publication.thumbnailAspectRatio).toBeGreaterThan(0);

      const thumbnailFilePath = path.join(process.cwd(), "public", publication.thumbnailPath);
      expect(existsSync(thumbnailFilePath)).toBeTrue();

      const dimensions = readWebpDimensions(thumbnailFilePath);
      const actualAspectRatio = dimensions.width / dimensions.height;
      expect(Math.abs(publication.thumbnailAspectRatio - actualAspectRatio)).toBeLessThan(0.001);
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
