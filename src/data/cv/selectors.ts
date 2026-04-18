import type {
  ExperienceItem,
  Profile,
  PublicationItem,
  ResumeTargetOverlay,
  ResumeVariantId,
  Topic,
  TopicSlug,
} from "./types";

export type ExperiencePublicationLink = {
  id: string;
  title: string;
  year: number;
};

const getVariantOverride = <T>(baseValue: T, overrides: Partial<Record<ResumeVariantId, T>> | undefined, variant: ResumeVariantId): T => {
  return overrides?.[variant] ?? baseValue;
};

export const getProfileForVariant = (profile: Profile, variant: ResumeVariantId): Profile => {
  const variantOverrides = profile.variantOverrides?.[variant];

  if (!variantOverrides) {
    return profile;
  }

  return {
    ...profile,
    ...variantOverrides,
  };
};

export const getProfileForResume = (
  profile: Profile,
  variant: ResumeVariantId,
  targetOverlay?: ResumeTargetOverlay,
): Profile => {
  const variantProfile = getProfileForVariant(profile, variant);

  if (!targetOverlay?.profile) {
    return variantProfile;
  }

  return {
    ...variantProfile,
    ...targetOverlay.profile,
  };
};

export const getExperienceForVariant = (items: ExperienceItem[], variant: ResumeVariantId): ExperienceItem[] => {
  return items
    .map((item, index) => ({
      ...item,
      summary: getVariantOverride(item.summary, item.variantSummary, variant),
      highlights: getVariantOverride(item.highlights, item.variantHighlights, variant),
      resolvedOrder: item.variantOrder?.[variant] ?? 10_000 + index,
    }))
    .sort((left, right) => left.resolvedOrder - right.resolvedOrder)
    .map(({ resolvedOrder: _resolvedOrder, ...item }) => item);
};

export const getExperienceForResume = (
  items: ExperienceItem[],
  variant: ResumeVariantId,
  targetOverlay?: ResumeTargetOverlay,
): ExperienceItem[] => {
  const variantExperience = getExperienceForVariant(items, variant);

  return variantExperience
    .map((item, index) => {
      const targetOverride = targetOverlay?.experience?.[item.id];

      return {
        ...item,
        summary: targetOverride?.summary ?? item.summary,
        highlights: targetOverride?.highlights ?? item.highlights,
        resolvedOrder: targetOverride?.order ?? 10_000 + index,
      };
    })
    .sort((left, right) => left.resolvedOrder - right.resolvedOrder)
    .map(({ resolvedOrder: _resolvedOrder, ...item }) => item);
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
  return publications
    .filter((publication) => publication.webFeaturedOrder !== undefined)
    .sort((left, right) => {
      const leftOrder = left.webFeaturedOrder ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = right.webFeaturedOrder ?? Number.MAX_SAFE_INTEGER;
      return leftOrder - rightOrder;
    });
};

export const getResumePublications = (
  publications: PublicationItem[],
  variant: ResumeVariantId,
): PublicationItem[] => {
  return publications
    .filter((publication) => publication.variantOrder?.[variant] !== undefined)
    .sort((left, right) => {
      const leftOrder = left.variantOrder?.[variant] ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = right.variantOrder?.[variant] ?? Number.MAX_SAFE_INTEGER;
      return leftOrder - rightOrder;
    });
};

export const getResumePublicationsForTarget = (
  publications: PublicationItem[],
  variant: ResumeVariantId,
  targetOverlay?: ResumeTargetOverlay,
): PublicationItem[] => {
  if (!targetOverlay?.publications) {
    return getResumePublications(publications, variant);
  }

  return publications
    .filter((publication) => targetOverlay.publications?.[publication.id] !== undefined)
    .sort((left, right) => {
      const leftOrder = targetOverlay.publications?.[left.id]?.order ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = targetOverlay.publications?.[right.id]?.order ?? Number.MAX_SAFE_INTEGER;
      return leftOrder - rightOrder;
    });
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
