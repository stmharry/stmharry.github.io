import type { PublicationItem } from "../../data/cv/types";

export type TopicFilter = "all" | PublicationItem["topics"][number];

export const hasYearInVenue = (venue: string): boolean => {
  return /\b(19|20)\d{2}\b/.test(venue);
};

export const classifyAspect = (aspectRatio?: number): "panorama" | "wide" | "standard" | "compact" => {
  if (!aspectRatio) {
    return "standard";
  }

  if (aspectRatio >= 2.4) {
    return "panorama";
  }

  if (aspectRatio >= 1.75) {
    return "wide";
  }

  if (aspectRatio < 1.35) {
    return "compact";
  }

  return "standard";
};

export const mediaFrameClassByAspect = {
  panorama: "h-12 w-34 sm:h-16 sm:w-32",
  wide: "h-12 w-28 sm:h-16 sm:w-28",
  standard: "h-12 w-22 sm:h-16 sm:w-24",
  compact: "h-14 w-18 sm:h-18 sm:w-18",
} as const;

export type PublicationActionLink = {
  label: string;
  href: string;
};

export const getPublicationActionLinks = (publication: PublicationItem): PublicationActionLink[] => {
  const primaryPaperHref = publication.paperUrl ?? publication.scholarCitationUrl;

  return [
    { label: "Paper", href: primaryPaperHref },
    { label: "Slides", href: publication.slidesUrl },
    { label: "Poster", href: publication.posterUrl },
    { label: "Video", href: publication.videoUrl },
    { label: "Code", href: publication.codeUrl },
    { label: "Project", href: publication.projectUrl },
    { label: "Dataset", href: publication.datasetUrl },
  ].filter((item): item is PublicationActionLink => Boolean(item.href));
};
