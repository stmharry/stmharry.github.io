import { useMemo, useState } from "react";

import type { ExperienceItem } from "../data/cv/types";

type ExperienceSectionProps = {
  items: ExperienceItem[];
};

const renderPeriod = (period: string): string => {
  return period.replace(/\s--\s/g, " – ");
};

export const ExperienceSection = ({ items }: ExperienceSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const highlightedItems = useMemo(() => items.filter((item) => item.highlighted), [items]);
  const visibleItems = showAll || highlightedItems.length === 0 ? items : highlightedItems;
  const canExpand = highlightedItems.length > 0 && highlightedItems.length < items.length;

  return (
    <section aria-labelledby="experience-heading" className="mt-14 sm:mt-18">
      <div className="flex items-center justify-between gap-4">
        <h2 id="experience-heading" className="text-base font-medium tracking-[0.18em] uppercase sm:text-sm sm:font-normal">
          Experience
        </h2>
        {canExpand ? (
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="rounded-full border border-(--line) px-3 py-1 text-[11px] tracking-[0.1em] text-(--ink-700) uppercase transition hover:border-(--ink-700) hover:text-(--ink-900)"
          >
            {showAll ? "Show highlighted" : "Expand all experiences"}
          </button>
        ) : null}
      </div>
      <ul className="mt-5 space-y-3 sm:space-y-4">
        {visibleItems.map((item) => (
          <li key={item.id} className="rounded-lg border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),white_24%)] p-4 sm:p-5">
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                  {item.role}
                </p>
                <p className="mt-1 text-sm text-(--ink-700)">{item.organization}</p>
                <p className="mt-1 text-xs tracking-[0.12em] text-(--ink-700) uppercase">{item.location}</p>
              </div>
              <p className="text-xs tracking-[0.12em] text-(--ink-700) uppercase">{renderPeriod(item.period)}</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-(--ink-700)">{item.summary}</p>
            {item.highlights.length > 0 ? (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-(--ink-700)">
                {(showAll ? item.highlights : item.highlights.slice(0, 2)).map((highlight, index) => (
                  <li key={`${item.id}-${index}`}>
                    {highlight.label ? <strong>{highlight.label}: </strong> : null}
                    {highlight.text}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
};
