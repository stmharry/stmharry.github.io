import type { ExperienceItem } from "../data/cv/types";

type ExperienceSectionProps = {
  items: ExperienceItem[];
};

const renderPeriod = (period: string): string => {
  return period.replace(/\s--\s/g, " - ");
};

export const ExperienceSection = ({ items }: ExperienceSectionProps) => {
  return (
    <section aria-labelledby="experience-heading" className="mt-20">
      <h2 id="experience-heading" className="text-sm tracking-[0.2em] uppercase">
        Experience
      </h2>
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item.id} className="rounded-xl border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),white_35%)] p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
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
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-(--ink-700)">
                {item.highlights.slice(0, 2).map((highlight, index) => (
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
