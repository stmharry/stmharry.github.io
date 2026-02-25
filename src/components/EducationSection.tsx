import type { EducationItem } from "../data/cv/types";

type EducationSectionProps = {
  items: EducationItem[];
};

const renderPeriod = (period: string): string => {
  return period.replace(/\s--\s/g, " – ");
};

export const EducationSection = ({ items }: EducationSectionProps) => {
  return (
    <section aria-labelledby="education-heading" className="mt-14 sm:mt-18">
      <h2 id="education-heading" className="text-base font-medium tracking-[0.18em] uppercase sm:text-sm sm:font-normal">
        Education
      </h2>
      <ul className="mt-5 space-y-3 sm:space-y-4">
        {items.map((item) => (
          <li key={item.id} className="rounded-lg border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),white_24%)] p-4 sm:p-5">
            <h3 className="text-lg" style={{ fontFamily: "var(--font-serif)" }}>
              {item.institution}
            </h3>
            <p className="mt-1 text-sm text-(--ink-900)">{item.degree}</p>
            <p className="mt-1 text-xs italic text-(--ink-700)">
              {item.location} • {renderPeriod(item.period)}
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-(--ink-700)">
              {item.details.map((detail, index) => (
                <li key={`${item.id}-${index}`}>
                  {detail.label ? <strong>{detail.label}: </strong> : null}
                  {detail.text}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};
