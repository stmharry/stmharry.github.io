import { PrimaryLinks } from "./PrimaryLinks";
import { ThemeToggle } from "./ThemeToggle";
import type { LinkItem, Profile } from "../data/cv/types";
import { toPublicUrl } from "../lib/url";

type ThemePreference = "light" | "dark";

type HeroProps = {
  profile: Pick<Profile, "name" | "headline" | "summaryBullets">;
  links: LinkItem[];
  themePreference: ThemePreference;
  onCycleTheme: () => void;
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

export const Hero = ({ profile, links, themePreference, onCycleTheme }: HeroProps) => {
  return (
    <header className="mt-2 w-full sm:mt-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs tracking-[0.24em] text-(--ink-700) uppercase">Personal site</p>
        <ThemeToggle value={themePreference} onCycle={onCycleTheme} />
      </div>
      <div className="mt-3 flex flex-col gap-5 sm:mt-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="order-2 min-w-0 lg:order-1">
          <div className="flex flex-col gap-1.5 lg:flex-row lg:items-baseline lg:justify-start lg:gap-4">
            <h1 className="text-4xl leading-tight font-medium sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>
              {profile.name}
            </h1>
            <p className="text-left text-lg tracking-[0.08em] text-(--ink-700) sm:text-xl lg:text-2xl">@stmharry</p>
          </div>
          <p className="mt-3 text-xs tracking-[0.16em] text-(--ink-700) uppercase sm:mt-4 sm:text-sm">{profile.headline}</p>
          <PrimaryLinks links={links} className="mt-5 sm:mt-6" />
        </div>

        <figure className="order-1 shrink-0 self-start lg:order-2">
          <img
            src={toPublicUrl("/assets/profile/harry-avatar.jpg")}
            alt="Portrait of Tzu-Ming Harry Hsu"
            className="h-24 w-24 rounded-full object-cover object-[50%_26%] shadow-[0_8px_22px_color-mix(in_oklab,var(--ink-900),transparent_90%)] sm:h-32 sm:w-32"
            loading="eager"
            decoding="async"
          />
        </figure>
      </div>

      <div className="mt-6 max-w-4xl">
        <StatementRail bullets={profile.summaryBullets} />
      </div>
    </header>
  );
};
