import { useMemo, useState } from "react";

import { CardHeader } from "./CardHeader";
import { MobileCardDisclosure } from "./MobileCardDisclosure";
import { toExperienceCardHeader } from "./cardSemantics";
import type { ExperienceItem } from "../data/cv/types";
import { isExternalUrl, toPublicUrl } from "../lib/url";

type ExperienceSectionProps = {
  items: ExperienceItem[];
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

export const ExperienceSection = ({ items }: ExperienceSectionProps) => {
  const [showAll, setShowAll] = useState(false);

  const highlightedItems = useMemo(() => items.filter((item) => item.highlighted), [items]);
  const hasExpandableItems = highlightedItems.length > 0 && highlightedItems.length < items.length;
  const visibleItems = showAll || highlightedItems.length === 0 ? items : highlightedItems;

  return (
    <section aria-labelledby="experience-heading" className="mt-14 sm:mt-18">
      <h2
        id="experience-heading"
        className="sticky top-[var(--mobile-sticky-name-height)] z-40 -mx-5 bg-[color:color-mix(in_oklab,var(--paper),white_10%)] px-5 py-2 text-[11px] font-medium tracking-[0.16em] text-(--ink-700) uppercase shadow-[0_1px_0_0_var(--line)] backdrop-blur-md sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-sm sm:font-normal sm:tracking-[0.18em] sm:text-current sm:shadow-none sm:backdrop-blur-none"
      >
        Experience
      </h2>
      <ul className="mt-5 space-y-3 sm:space-y-4">
        {visibleItems.map((item) => {
          const header = toExperienceCardHeader(item);

          return (
            <li key={item.id} className="rounded-lg border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),white_24%)] p-4 sm:p-5">
              <MobileCardDisclosure
                id={`experience-${item.id}`}
                trigger={
                  <CardHeader
                    primary={
                      <p className="text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                        {header.primary}
                      </p>
                    }
                    secondary={
                      <div className="flex items-center gap-2">
                        {item.organizationLogoPath ? (
                          <img
                            src={toPublicUrl(item.organizationLogoPath)}
                            alt={`${header.secondary} logo`}
                            className="h-5 w-5 shrink-0 rounded-full border border-(--line) bg-(--paper) object-contain p-0.5"
                            loading="lazy"
                          />
                        ) : null}
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
                }
              >
                <div className="border-l border-(--rail) pl-3.5">
                  <p className="text-sm leading-relaxed text-(--ink-700)">{item.summary}</p>

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
                </div>
              </MobileCardDisclosure>
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
