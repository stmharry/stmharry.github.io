import type { WebProfile } from "../data/cv/selectors";

type HeroProps = {
  profile: WebProfile;
};

const SUMMARY_TITLES = ["Builder", "Research", "Mission", "Life"];

type SummaryShowcaseProps = {
  bullets: string[];
};

const StatementRail = ({ bullets }: SummaryShowcaseProps) => (
  <section>
    <ol className="space-y-3.5">
      {bullets.map((bullet, index) => (
        <li key={`rail-${index}`} className="grid grid-cols-[2.4rem_1fr] gap-x-3">
          <span className="pt-0.5 text-xs tracking-[0.14em] text-(--ink-700) uppercase">{String(index + 1).padStart(2, "0")}</span>
          <div className="border-l border-(--line) pl-3">
            <p className="text-[11px] tracking-[0.14em] text-(--ink-700) uppercase">{SUMMARY_TITLES[index] ?? `Point ${index + 1}`}</p>
            <p className="mt-1 text-sm leading-relaxed text-(--ink-700)">{bullet}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export const Hero = ({ profile }: HeroProps) => {
  return (
    <header className="mt-2 w-full sm:mt-4">
      <p className="text-xs tracking-[0.24em] text-(--ink-700) uppercase">Personal site</p>
      <h1 className="mt-3 text-4xl leading-tight font-medium sm:mt-4 sm:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>
        {profile.name}
      </h1>
      <p className="mt-3 text-xs tracking-[0.16em] text-(--ink-700) uppercase sm:mt-4 sm:text-sm">{profile.headline}</p>
      <div className="mt-6 max-w-4xl">
        <StatementRail bullets={profile.summaryBullets} />
      </div>
    </header>
  );
};
