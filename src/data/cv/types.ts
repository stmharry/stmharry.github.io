export type TopicSlug =
  | "federated-learning"
  | "medical-ai"
  | "computer-vision"
  | "ml-systems"
  | "wireless-sensing"
  | "blockchain";

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

export type Profile = {
  name: string;
  nativeName: string;
  tagline: string;
  headline: string;
  location: string;
  summaryBullets: string[];
  contacts: ContactItem[];
  links: LinkItem[];
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
  organization: string;
  organizationLogoPath?: string;
  organizationDescription?: string;
  organizationUrl?: string;
  period: string;
  role: string;
  location: string;
  summary: string;
  highlights: DetailItem[];
  highlighted: boolean;
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
};

export type SeoConfig = {
  title: string;
  description: string;
  siteUrl: string;
  image: string;
};

export type CvContent = {
  profile: Profile;
  topics: Topic[];
  education: EducationItem[];
  experience: ExperienceItem[];
  leadership: LeadershipItem[];
  awards: AwardItem[];
  publications: PublicationItem[];
  seo: SeoConfig;
};
