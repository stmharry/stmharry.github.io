import { PrimaryLinks } from "./PrimaryLinks";
import { Reveal } from "./Reveal";
import type { LinkItem } from "../data/cv/types";
import type { WebProfile } from "../data/cv/selectors";

type HeroProps = {
  profile: WebProfile;
  links: LinkItem[];
};

const SUMMARY_TITLES = ["Builder", "Research", "Mission", "Life"];

type SummaryShowcaseProps = {
  bullets: string[];
};

const StatementRail = ({ bullets }: SummaryShowcaseProps) => (
  <section>
    <ol className="space-y-3.5">
      {bullets.map((bullet, index) => (
        <Reveal as="li" key={`rail-${index}`} delayMs={180 + index * 45} className="grid grid-cols-[2.4rem_1fr] gap-x-3">
          <span className="pt-0.5 text-xs tracking-[0.14em] text-(--ink-700) uppercase">{String(index + 1).padStart(2, "0")}</span>
          <div className="border-l border-(--line) pl-3">
            <p className="text-[11px] tracking-[0.14em] text-(--ink-700) uppercase">{SUMMARY_TITLES[index] ?? `Point ${index + 1}`}</p>
            <p className="mt-1 text-sm leading-relaxed text-(--ink-700)">{bullet}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  </section>
);

export const Hero = ({ profile, links }: HeroProps) => {
  return (
    <header className="mt-2 w-full sm:mt-4">
      <p className="text-xs tracking-[0.24em] text-(--ink-700) uppercase">Personal site</p>
      <Reveal as="div" delayMs={0} className="mt-3 flex flex-col gap-1.5 sm:mt-4 sm:flex-row sm:items-baseline sm:justify-start sm:gap-4">
        <h1 className="text-4xl leading-tight font-medium sm:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>
          {profile.name}
        </h1>
        <p className="text-left text-lg tracking-[0.08em] text-(--ink-700) sm:text-2xl">@stmharry</p>
      </Reveal>
      <Reveal as="p" delayMs={60} className="mt-3 text-xs tracking-[0.16em] text-(--ink-700) uppercase sm:mt-4 sm:text-sm">
        {profile.headline}
      </Reveal>
      <Reveal as="div" delayMs={120}>
        <PrimaryLinks links={links} className="mt-5 sm:mt-6" />
      </Reveal>
      <Reveal as="div" delayMs={160} className="mt-6 max-w-4xl">
        <StatementRail bullets={profile.summaryBullets} />
      </Reveal>
    </header>
  );
};
