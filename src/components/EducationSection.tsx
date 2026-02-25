import type { EducationItem } from "../data/cv/types";
import { CardHeader } from "./CardHeader";
import { toEducationCardHeader } from "./cardSemantics";

type EducationSectionProps = {
  items: EducationItem[];
};

export const EducationSection = ({ items }: EducationSectionProps) => {
  return (
    <section aria-labelledby="education-heading" className="mt-14 sm:mt-18">
      <h2 id="education-heading" className="text-base font-medium tracking-[0.18em] uppercase sm:text-sm sm:font-normal">
        Education
      </h2>
      <ul className="mt-5 space-y-3 sm:space-y-4">
        {items.map((item) => {
          const header = toEducationCardHeader(item);
          const labeledDetails = item.details.filter((detail) => detail.label);
          const narrativeDetails = item.details.filter((detail) => !detail.label);

          return (
            <li key={item.id} className="rounded-lg border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),white_24%)] p-4 sm:p-5">
              <CardHeader
                primary={
                  <h3 className="text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                    {header.primary}
                  </h3>
                }
                secondary={<p className="text-sm text-(--ink-900)">{header.secondary}</p>}
                date={header.date}
                location={header.location}
              />

              {labeledDetails.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {labeledDetails.map((detail, index) => (
                    <span
                      key={`${item.id}-label-${index}`}
                      className="inline-flex rounded-full border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),var(--ink-900)_5%)] px-2.5 py-1 text-[11px] tracking-[0.08em] text-(--ink-700) uppercase"
                    >
                      {detail.label}: {detail.text}
                    </span>
                  ))}
                </div>
              ) : null}

              {narrativeDetails.length > 0 ? (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-(--ink-700)">
                  {narrativeDetails.map((detail, index) => (
                    <li key={`${item.id}-detail-${index}`}>{detail.text}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
