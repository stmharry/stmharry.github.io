import type { WebProfile } from "../data/cv/selectors";

type HeroProps = {
  profile: WebProfile;
};

export const Hero = ({ profile }: HeroProps) => {
  return (
    <header className="mt-2 w-full sm:mt-4">
      <p className="text-xs tracking-[0.24em] text-(--ink-700) uppercase">Personal site</p>
      <h1 className="mt-3 text-4xl leading-tight font-medium sm:mt-4 sm:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>
        {profile.name}
      </h1>
      <p className="mt-3 text-xs tracking-[0.16em] text-(--ink-700) uppercase sm:mt-4 sm:text-sm">{profile.headline}</p>
      <p className="mt-1 text-sm text-(--ink-700)">{profile.location}</p>
      <ul className="mt-5 max-w-3xl space-y-2.5">
        {profile.summaryBullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-(--ink-700)">
            <span className="mt-[0.2em] shrink-0 select-none text-xs opacity-35">-</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </header>
  );
};
