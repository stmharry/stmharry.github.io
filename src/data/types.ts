export type TopicSlug =
  | "federated-learning"
  | "medical-ai"
  | "computer-vision"
  | "ml-systems";

export type Topic = {
  slug: TopicSlug;
  label: string;
};

export type ExternalLink = {
  label: string;
  href: string;
  description: string;
};

export type Profile = {
  name: string;
  headline: string;
  location: string;
  bio: string;
};

export type ExperienceItem = {
  id: string;
  organization: string;
  role: string;
  startYear: number;
  endYear: number | null;
  description: string;
  tags: string[];
  links: ExternalLink[];
};

export type PublicationItem = {
  id: string;
  title: string;
  year: number;
  venue: string;
  authors: string;
  description: string;
  href: string;
  topics: TopicSlug[];
  featured: boolean;
  order: number;
};

export type SeoConfig = {
  title: string;
  description: string;
  siteUrl: string;
  image: string;
};

export type SiteContent = {
  profile: Profile;
  links: ExternalLink[];
  topics: Topic[];
  experience: ExperienceItem[];
  publications: PublicationItem[];
  seo: SeoConfig;
};
