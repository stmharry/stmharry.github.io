import type { EducationItem, ExperienceItem } from "../data/cv/types";

export type CardHeaderSemantics = {
  primary: string;
  secondary: string;
  date: string;
  location?: string;
};

export const CARD_DATE_TEXT_CLASS = "text-[11px] font-medium tracking-[0.1em] text-(--ink-700) uppercase sm:text-xs sm:tracking-[0.12em]";
export const CARD_LOCATION_TEXT_CLASS = "text-[10px] tracking-[0.08em] text-(--ink-700) uppercase sm:tracking-[0.1em]";

export const formatPeriodLabel = (period: string): string => {
  return period.replace(/\s--\s/g, " – ");
};

export const toExperienceCardHeader = (item: ExperienceItem): CardHeaderSemantics => {
  return {
    primary: item.role,
    secondary: item.organization.name,
    date: formatPeriodLabel(item.period),
    location: item.location,
  };
};

export const toEducationCardHeader = (item: EducationItem): CardHeaderSemantics => {
  return {
    primary: item.degree,
    secondary: item.institution,
    date: formatPeriodLabel(item.period),
    location: item.location,
  };
};
