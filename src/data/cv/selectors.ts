import type {
  ExperienceItem,
  PublicationItem,
  Topic,
  TopicSlug,
} from "./types";

export type ExperiencePublicationLink = {
  id: string;
  title: string;
  year: number;
};

const MONTH_SCORE: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

const parsePeriodDate = (dateLabel: string, boundary: "start" | "end"): number => {
  const normalized = dateLabel.trim().toLowerCase();

  if (normalized === "present") {
    return Number.POSITIVE_INFINITY;
  }

  const monthYearMatch = normalized.match(/^([a-z]{3})\s+(\d{4})$/);

  if (monthYearMatch) {
    const [, monthLabel, yearLabel] = monthYearMatch;
    const month = MONTH_SCORE[monthLabel];

    if (month !== undefined) {
      return Number(yearLabel) * 12 + month;
    }
  }

  const yearMatch = normalized.match(/^(\d{4})$/);

  if (yearMatch) {
    const month = boundary === "start" ? 1 : 12;
    return Number(yearMatch[1]) * 12 + month;
  }

  return Number.NEGATIVE_INFINITY;
};

const parseExperiencePeriod = (period: string): { start: number; end: number } => {
  const [start = "", end = start] = period.split(/\s+(?:--|–)\s+/);

  return {
    start: parsePeriodDate(start, "start"),
    end: parsePeriodDate(end, "end"),
  };
};

export const getExperienceForResume = (items: ExperienceItem[]): ExperienceItem[] => {
  return items;
};

export const sortExperienceByRecentPeriod = (items: ExperienceItem[]): ExperienceItem[] => {
  return items
    .map((item, index) => ({
      item,
      index,
      period: parseExperiencePeriod(item.period),
    }))
    .sort((left, right) => {
      if (left.period.end !== right.period.end) {
        return right.period.end - left.period.end;
      }

      if (left.period.start !== right.period.start) {
        return right.period.start - left.period.start;
      }

      return left.index - right.index;
    })
    .map(({ item }) => item);
};

export const sortPublicationsByYear = (publications: PublicationItem[]): PublicationItem[] => {
  return [...publications].sort((left, right) => {
    if (left.year === right.year) {
      return left.order - right.order;
    }

    return right.year - left.year;
  });
};

export const getWebPublications = (publications: PublicationItem[]): PublicationItem[] => {
  return sortPublicationsByYear(publications);
};

export const getResumePublications = (publications: PublicationItem[]): PublicationItem[] => {
  return sortPublicationsByYear(publications);
};

export const getExperiencePublicationLinks = (
  publications: PublicationItem[],
): Record<string, ExperiencePublicationLink[]> => {
  const sortedPublications = sortPublicationsByYear(publications);
  const linksByExperienceId: Record<string, ExperiencePublicationLink[]> = {};

  sortedPublications.forEach((publication) => {
    publication.relatedExperienceIds?.forEach((experienceId) => {
      if (!linksByExperienceId[experienceId]) {
        linksByExperienceId[experienceId] = [];
      }

      linksByExperienceId[experienceId].push({
        id: publication.id,
        title: publication.title,
        year: publication.year,
      });
    });
  });

  return linksByExperienceId;
};

export const filterPublicationsByTopic = (publications: PublicationItem[], topicSlug: TopicSlug | "all"): PublicationItem[] => {
  if (topicSlug === "all") {
    return publications;
  }

  return publications.filter((publication) => publication.topics.includes(topicSlug));
};

export const getTopicLabelBySlug = (topics: Topic[], topicSlug: TopicSlug): string => {
  return topics.find((topic) => topic.slug === topicSlug)?.label ?? topicSlug;
};

export const getUsedTopics = (topics: Topic[], publications: PublicationItem[]): Topic[] => {
  const usedTopicSlugs = new Set(publications.flatMap((publication) => publication.topics));
  return topics.filter((topic) => usedTopicSlugs.has(topic.slug));
};
