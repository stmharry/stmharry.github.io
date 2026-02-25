import type { ExperienceItem } from "../data/cv/types";

type ExperienceSectionProps = {
  items: ExperienceItem[];
};

const renderPeriod = (period: string): string => {
  return period.replace(/\s--\s/g, " – ");
};

export const ExperienceSection = ({ items }: ExperienceSectionProps) => {
  return (
    <section aria-labelledby="experience-heading" className="mt-14 sm:mt-18">
      <h2 id="experience-heading" className="text-base font-medium tracking-[0.18em] uppercase sm:text-sm sm:font-normal">
        Experience
      </h2>
      <ul className="mt-5 space-y-3 sm:space-y-4">
        {items.map((item) => (
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
          </li>
        ))}
      </ul>
    </section>
  );
};
