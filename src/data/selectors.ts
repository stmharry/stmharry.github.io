import type { PublicationItem, Topic } from "./types";

export const sortPublicationsByYear = (publications: PublicationItem[]): PublicationItem[] => {
  return [...publications].sort((left, right) => {
    if (left.year === right.year) {
      return left.order - right.order;
    }

    return right.year - left.year;
  });
};

export const getFeaturedPublications = (publications: PublicationItem[]): PublicationItem[] => {
  return sortPublicationsByYear(publications.filter((publication) => publication.featured));
};

export const filterPublicationsByTopic = (
  publications: PublicationItem[],
  topicSlug: Topic["slug"] | "all",
): PublicationItem[] => {
  if (topicSlug === "all") {
    return publications;
  }

  return publications.filter((publication) => publication.topics.includes(topicSlug));
};

export const getTopicLabelBySlug = (topics: Topic[], topicSlug: Topic["slug"]): string => {
  return topics.find((topic) => topic.slug === topicSlug)?.label ?? topicSlug;
};

export const getUsedTopics = (topics: Topic[], publications: PublicationItem[]): Topic[] => {
  const usedTopicSlugs = new Set(publications.flatMap((publication) => publication.topics));
  return topics.filter((topic) => usedTopicSlugs.has(topic.slug));
};
