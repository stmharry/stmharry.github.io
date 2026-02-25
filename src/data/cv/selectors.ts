import type { CvContent, ExperienceItem, PublicationItem, Topic, TopicSlug } from "./types";

export type WebProfile = {
  name: string;
  headline: string;
  location: string;
  summaryBullets: string[];
};

export const getWebProfile = (content: CvContent): WebProfile => {
  return {
    name: content.profile.name,
    headline: content.profile.headline,
    location: content.profile.location,
    summaryBullets: content.profile.summaryBullets,
  };
};

export const getWebExperience = (content: CvContent): ExperienceItem[] => {
  return content.experience;
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
