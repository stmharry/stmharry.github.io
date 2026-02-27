export const SELF_AUTHOR_VARIANTS = [
  "Tzu-Ming Harry Hsu",
  "Tzu Ming Harry Hsu",
  "Tzu-Ming Hsu",
  "Tzu Ming Hsu",
  "Harry Hsu",
] as const;

const escapedVariants = SELF_AUTHOR_VARIANTS.map((variant) => variant.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const selfAuthorPattern = new RegExp(`\\b(${escapedVariants.join("|")})\\b`, "g");

export const isSelfAuthor = (author: string): boolean => {
  return SELF_AUTHOR_VARIANTS.includes(author as (typeof SELF_AUTHOR_VARIANTS)[number]);
};

export const emphasizeSelfAuthors = (authors: string, formatter: (author: string) => string): string => {
  return authors.replace(selfAuthorPattern, (author) => formatter(author));
};
