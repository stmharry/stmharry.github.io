import { useMemo, useState } from "react";

import { CardHeader } from "./CardHeader";
import { MobileCardDisclosure } from "./MobileCardDisclosure";
import { toExperienceCardHeader } from "./cardSemantics";
import type { ExperienceItem } from "../data/cv/types";

type ExperienceSectionProps = {
  items: ExperienceItem[];
};

export const ExperienceSection = ({ items }: ExperienceSectionProps) => {
  const [showAll, setShowAll] = useState(false);

  const highlightedItems = useMemo(() => items.filter((item) => item.highlighted), [items]);
  const hasExpandableItems = highlightedItems.length > 0 && highlightedItems.length < items.length;
  const visibleItems = showAll || highlightedItems.length === 0 ? items : highlightedItems;

  return (
    <section aria-labelledby="experience-heading" className="mt-14 sm:mt-18">
      <h2 id="experience-heading" className="text-base font-medium tracking-[0.18em] uppercase sm:text-sm sm:font-normal">
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
                    secondary={<p className="text-sm text-(--ink-700)">{header.secondary}</p>}
                    date={header.date}
                    location={header.location}
                  />
                }
              >
                <p className="text-sm leading-relaxed text-(--ink-700)">{item.summary}</p>
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
