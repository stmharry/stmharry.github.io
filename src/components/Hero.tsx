import type { WebProfile } from "../data/cv/selectors";

type HeroProps = {
  profile: WebProfile;
};

export const Hero = ({ profile }: HeroProps) => {
  return (
    <header className="mt-2 max-w-3xl sm:mt-4">
      <p className="text-xs tracking-[0.24em] text-(--ink-700) uppercase">Personal site</p>
      <h1 className="mt-3 text-4xl leading-tight font-medium sm:mt-4 sm:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>
        {profile.name}
      </h1>
      <p className="mt-3 text-xs tracking-[0.16em] text-(--ink-700) uppercase sm:mt-4 sm:text-sm">{profile.headline}</p>
      <p className="mt-1 text-sm text-(--ink-700)">{profile.location}</p>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-(--ink-700) sm:text-base">{profile.summaryLead}</p>
      <p className="mt-2 max-w-2xl text-xs leading-relaxed text-(--ink-700) sm:text-sm">{profile.summaryNote}</p>
    </header>
  );
};
