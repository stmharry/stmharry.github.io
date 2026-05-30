import type { ResumeVariantId } from "./variants";

export type { ResumeVariantId } from "./variants";

export type TopicSlug =
  | "federated-learning"
  | "medical-ai"
  | "computer-vision"
  | "ml-systems"
  | "wireless-sensing"
  | "blockchain";

export type ResumeTargetId =
  | "bigtech-ml-infra"
  | "bigtech-research-engineer"
  | "healthcare-ai-multimodal"
  | "robotics-platform-simulation"
  | "pi-research"
  | "pi-infra"
  | "pi-robotics-software"
  | "figure-robot-learning"
  | "figure-data-infra"
  | "figure-training-infra"
  | "apptronik-rl"
  | "apptronik-perception"
  | "apptronik-systems"
  | "deepmind-research"
  | "nvidia-simulation"
  | "intrinsic-platform";

export type VariantOverrides<T> = Partial<Record<ResumeVariantId, T>>;

export type Topic = {
  slug: TopicSlug;
  label: string;
};

export type LinkItem = {
  icon: "email" | "github" | "scholar" | "linkedin" | "resume";
  label: string;
  href: string;
  description: string;
};

export type ContactItem = {
  label: string;
  value: string;
  href?: string;
};

export type DetailItem = {
  label?: string;
  text: string;
};

export type ProfileVariantOverride = {
  tagline?: string;
  headline?: string;
  summaryBullets?: string[];
};

export type Profile = {
  name: string;
  nativeName: string;
  tagline: string;
  headline: string;
  location: string;
  summaryBullets: string[];
  contacts: ContactItem[];
  links: LinkItem[];
  variantOverrides?: VariantOverrides<ProfileVariantOverride>;
};

export type ProfileTargetOverride = {
  tagline?: string;
  headline?: string;
  summaryBullets?: string[];
};

export type EducationItem = {
  id: string;
  institution: string;
  institutionLogoPath?: string;
  period: string;
  degree: string;
  location: string;
  details: DetailItem[];
};

export type ExperienceItem = {
  id: string;
  organization: {
    name: string;
    logoPath?: string;
    description?: string;
    url?: string;
    address?: string;
  };
  period: string;
  role: string;
  location: string;
  hoursPerWeek?: number;
  jobDescription: string;
  summary: string;
  highlights: DetailItem[];
  highlighted: boolean;
  variantOrder?: VariantOverrides<number>;
  variantSummary?: VariantOverrides<string>;
  variantHighlights?: VariantOverrides<DetailItem[]>;
};

export type ExperienceTargetOverride = {
  order?: number;
  summary?: string;
  highlights?: DetailItem[];
};

export type LeadershipItem = {
  id: string;
  organization: string;
  period: string;
  role: string;
  location: string;
  highlights: DetailItem[];
};

export type AwardItem = {
  id: string;
  title: string;
  year: number;
  event: string;
  location: string;
  details: DetailItem[];
};

export type PublicationKind = "journal" | "conference" | "workshop" | "patent" | "thesis" | "preprint";

export type PublicationItem = {
  id: string;
  title: string;
  year: number;
  venue: string;
  citationCount?: number;
  authors: string;
  kind: PublicationKind;
  paperUrl?: string;
  scholarCitationUrl?: string;
  thumbnailPath?: string;
  thumbnailAspectRatio?: number;
  slidesUrl?: string;
  posterUrl?: string;
  videoUrl?: string;
  codeUrl?: string;
  projectUrl?: string;
  datasetUrl?: string;
  relatedExperienceIds?: ExperienceItem["id"][];
  topics: TopicSlug[];
  order: number;
  variantOrder?: VariantOverrides<number>;
  webFeaturedOrder?: number;
};

export type PublicationTargetOverride = {
  order: number;
};

export type ResumeTargetOverlay = {
  id: ResumeTargetId;
  company: string;
  roleFamily: string;
  baseVariant: ResumeVariantId;
  fitThesis: string;
  keywordBank: string[];
  profile?: ProfileTargetOverride;
  experience?: Partial<Record<ExperienceItem["id"], ExperienceTargetOverride>>;
  publications?: Partial<Record<PublicationItem["id"], PublicationTargetOverride>>;
};

export type CvContent = {
  profile: Profile;
  topics: Topic[];
  education: EducationItem[];
  experience: ExperienceItem[];
  leadership: LeadershipItem[];
  awards: AwardItem[];
  publications: PublicationItem[];
};
