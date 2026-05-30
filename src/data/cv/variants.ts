export const resumeVariants = [
  {
    id: "applied",
    label: "Applied",
    publishPdf: true,
    defaultPublicPdf: true,
  },
  {
    id: "research",
    label: "Research",
    publishPdf: true,
    defaultPublicPdf: false,
  },
] as const;

export type ResumeVariant = (typeof resumeVariants)[number];
export type ResumeVariantId = ResumeVariant["id"];

export const resumeVariantIds = resumeVariants.map((variant) => variant.id);
export const publicResumeVariants = resumeVariants.filter((variant) => variant.publishPdf);

const defaultPublicResumeVariants = resumeVariants.filter((variant) => variant.defaultPublicPdf);
const [defaultPublicResumeVariant] = defaultPublicResumeVariants;

if (!defaultPublicResumeVariant || defaultPublicResumeVariants.length !== 1) {
  throw new Error("Exactly one public resume variant must be marked as the default.");
}

export { defaultPublicResumeVariant };

const resumeVariantIdSet = new Set(resumeVariantIds);

export const isResumeVariantId = (value: string): value is ResumeVariantId => {
  return resumeVariantIdSet.has(value as ResumeVariantId);
};
