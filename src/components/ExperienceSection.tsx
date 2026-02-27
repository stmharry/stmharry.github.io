import { useMemo, useState } from "react";

import { CardSurface } from "./CardSurface";
import { CardHeader } from "./CardHeader";
import { LogoBadge } from "./LogoBadge";
import { MobileCardDisclosure } from "./MobileCardDisclosure";
import { SectionHeading } from "./SectionHeading";
import { toExperienceCardHeader } from "./cardSemantics";
import type { ExperiencePublicationLink } from "../data/cv/selectors";
import type { ExperienceItem } from "../data/cv/types";
import { isExternalUrl, toPublicUrl } from "../lib/url";

type ExperienceSectionProps = {
  items: ExperienceItem[];
  publicationLinksByExperienceId: Record<string, ExperiencePublicationLink[]>;
};

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3.5 w-3.5">
    <path
      fill="currentColor"
      d="M5.5 5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V10a.75.75 0 0 1 1.5 0v4.5A2 2 0 0 1 14.5 16h-9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2H10a.75.75 0 0 1 0 1.5z"
    />
    <path
      fill="currentColor"
      d="M10.75 3.75A.75.75 0 0 1 11.5 3h4.75a.75.75 0 0 1 .75.75V8.5a.75.75 0 0 1-1.5 0V5.56l-5.97 5.97a.75.75 0 0 1-1.06-1.06l5.97-5.97H11.5a.75.75 0 0 1-.75-.75"
    />
  </svg>
);

export const ExperienceSection = ({ items, publicationLinksByExperienceId }: ExperienceSectionProps) => {
  const [showAll, setShowAll] = useState(false);

  const highlightedItems = useMemo(() => items.filter((item) => item.highlighted), [items]);
  const hasExpandableItems = highlightedItems.length > 0 && highlightedItems.length < items.length;
  const visibleItems = showAll || highlightedItems.length === 0 ? items : highlightedItems;

  return (
    <section aria-labelledby="experience-heading" className="mt-14 sm:mt-18">
      <SectionHeading id="experience-heading" title="Experience" />
      <ul className="mt-5 space-y-3 sm:space-y-4">
        {visibleItems.map((item) => {
          const header = toExperienceCardHeader(item);
          const relatedPublications = publicationLinksByExperienceId[item.id] ?? [];
          const hasSummary = item.summary.trim().length > 0;
          const hasBodyContent = hasSummary || Boolean(item.organizationUrl) || relatedPublications.length > 0;

          const headerContent = (
            <CardHeader
              primary={
                <p className="text-lg leading-snug sm:text-xl" style={{ fontFamily: "var(--font-serif)" }}>
                  {header.primary}
                </p>
              }
              secondary={
                <div className="flex items-center gap-2">
                  {item.organizationLogoPath ? <LogoBadge path={item.organizationLogoPath} alt={`${header.secondary} logo`} /> : null}
                  <p className="min-w-0 text-sm text-(--ink-700)">
                    {header.secondary}
                    {item.organizationDescription ? (
                      <>
                        <span className="px-1.5 text-(--ink-700)">·</span>
                        <span>{item.organizationDescription}</span>
                      </>
                    ) : null}
                  </p>
                </div>
              }
              date={header.date}
              location={header.location}
            />
          );

          return (
            <li key={item.id}>
              <CardSurface>
              {hasBodyContent ? (
                <MobileCardDisclosure id={`experience-${item.id}`} trigger={headerContent}>
                  <div className="border-l border-(--rail) pl-3.5">
                    {hasSummary ? <p className="text-sm leading-relaxed text-(--ink-700)">{item.summary}</p> : null}

                    {item.organizationUrl ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a
                          href={toPublicUrl(item.organizationUrl)}
                          target={isExternalUrl(toPublicUrl(item.organizationUrl)) ? "_blank" : undefined}
                          rel={isExternalUrl(toPublicUrl(item.organizationUrl)) ? "noreferrer" : undefined}
                          className="inline-flex items-center gap-1.5 rounded-md border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),var(--ink-900)_8%)] px-2.5 py-1.5 text-[11px] font-medium text-(--ink-900) hover:border-(--ink-700)"
                        >
                          <ExternalLinkIcon />
                          Website
                        </a>
                      </div>
                    ) : null}

                    {relatedPublications.length > 0 ? (
                      <div className="mt-3 space-y-1.5">
                        <p className="text-[11px] font-semibold tracking-[0.1em] text-(--ink-700) uppercase">Related Publications</p>
                        <div className="flex flex-wrap gap-2">
                          {relatedPublications.map((publication) => (
                            <a
                              key={publication.id}
                              href={`#publication-${publication.id}`}
                              className="inline-flex items-center rounded-full border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),var(--ink-900)_6%)] px-2.5 py-1 text-[11px] text-(--ink-700) hover:border-(--ink-700) hover:text-(--ink-900)"
                            >
                              {publication.title} ({publication.year})
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </MobileCardDisclosure>
              ) : (
                headerContent
              )}
              </CardSurface>
            </li>
          );
        })}
      </ul>

      {hasExpandableItems ? (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="rounded-full border border-(--line) px-4 py-1.5 text-[11px] tracking-[0.12em] text-(--ink-700) uppercase transition hover:border-(--ink-700) hover:text-(--ink-900)"
          >
            {showAll ? "See less" : "See more"}
          </button>
        </div>
      ) : null}
    </section>
  );
};
