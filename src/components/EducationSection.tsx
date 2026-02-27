import type { EducationItem } from "../data/cv/types";
import { toPublicUrl } from "../lib/url";
import { CardHeader } from "./CardHeader";
import { MobileCardDisclosure } from "./MobileCardDisclosure";
import { toEducationCardHeader } from "./cardSemantics";

type EducationSectionProps = {
  items: EducationItem[];
};

const splitDetailValues = (text: string): string[] => {
  return text
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
};

const normalizeDetailLabel = (label: string): string => {
  const trimmed = label.trim().toLowerCase();

  if (trimmed === "gpa") {
    return "GPA";
  }

  return trimmed.replace(/\b\w/g, (char) => char.toUpperCase());
};

const normalizeDetailText = (label: string, text: string): string => {
  if (label.trim().toLowerCase() === "research areas") {
    return splitDetailValues(text)
      .map((value) => value.toLowerCase())
      .join(", ");
  }

  return text;
};

export const EducationSection = ({ items }: EducationSectionProps) => {
  return (
    <section aria-labelledby="education-heading" className="mt-14 sm:mt-18">
      <h2
        id="education-heading"
        className="sticky top-[var(--mobile-sticky-name-height)] z-40 -mx-5 bg-[color:color-mix(in_oklab,var(--paper),white_10%)] px-5 py-2 text-[11px] font-medium tracking-[0.16em] text-(--ink-700) uppercase shadow-[0_1px_0_0_var(--line)] backdrop-blur-md sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-sm sm:font-normal sm:tracking-[0.18em] sm:text-current sm:shadow-none sm:backdrop-blur-none"
      >
        Education
      </h2>
      <ul className="mt-5 space-y-3 sm:space-y-4">
        {items.map((item) => {
          const header = toEducationCardHeader(item);
          const labeledDetails = item.details.filter((detail) => detail.label);
          const narrativeDetails = item.details.filter((detail) => !detail.label);
          const hasDetails = labeledDetails.length > 0 || narrativeDetails.length > 0;

          return (
            <li key={item.id} className="rounded-lg border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),white_24%)] p-4 sm:p-5">
              {hasDetails ? (
                <MobileCardDisclosure
                  id={`education-${item.id}`}
                  trigger={
                    <CardHeader
                      primary={
                        <h3 className="text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                          {header.primary}
                        </h3>
                      }
                      secondary={
                        <div className="flex items-center gap-2">
                          {item.institutionLogoPath ? (
                            <img
                              src={toPublicUrl(item.institutionLogoPath)}
                              alt={`${header.secondary} logo`}
                              className="h-5 w-5 shrink-0 rounded-full border border-(--line) bg-(--paper) object-contain p-0.5"
                              loading="lazy"
                            />
                          ) : null}
                          <p className="min-w-0 text-sm text-(--ink-900)">{header.secondary}</p>
                        </div>
                      }
                      date={header.date}
                      location={header.location}
                    />
                  }
                >
                  <div className="border-l border-(--rail) pl-3.5">
                    {labeledDetails.length > 0 ? (
                      <dl className="space-y-2">
                        {labeledDetails.map((detail, index) => (
                          <div key={`${item.id}-label-${index}`} className="grid gap-y-1 sm:grid-cols-[6.75rem_minmax(0,1fr)] sm:gap-x-3 sm:gap-y-0">
                            <dt className="text-[11px] font-semibold tracking-[0.1em] text-(--ink-700) uppercase">{normalizeDetailLabel(detail.label ?? "")}</dt>
                            <dd className="text-sm leading-relaxed text-(--ink-700)">{normalizeDetailText(detail.label ?? "", detail.text)}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}

                    {narrativeDetails.length > 0 ? (
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-(--ink-700)">
                        {narrativeDetails.map((detail, index) => (
                          <li key={`${item.id}-detail-${index}`}>{detail.text}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </MobileCardDisclosure>
              ) : (
                <CardHeader
                  primary={
                    <h3 className="text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                      {header.primary}
                    </h3>
                  }
                  secondary={
                    <div className="flex items-center gap-2">
                      {item.institutionLogoPath ? (
                        <img
                          src={toPublicUrl(item.institutionLogoPath)}
                          alt={`${header.secondary} logo`}
                          className="h-5 w-5 shrink-0 rounded-full border border-(--line) bg-(--paper) object-contain p-0.5"
                          loading="lazy"
                        />
                      ) : null}
                      <p className="min-w-0 text-sm text-(--ink-900)">{header.secondary}</p>
                    </div>
                  }
                  date={header.date}
                  location={header.location}
                />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
