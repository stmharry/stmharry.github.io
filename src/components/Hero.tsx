import type { WebProfile } from "../data/cv/selectors";

type HeroProps = {
  profile: WebProfile;
};

export const Hero = ({ profile }: HeroProps) => {
  return (
    <header className="max-w-3xl">
      <p className="text-xs tracking-[0.24em] text-(--ink-700) uppercase">Personal site</p>
      <h1 className="mt-4 text-4xl leading-tight font-medium sm:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>
        {profile.name}
      </h1>
      <p className="mt-4 text-sm tracking-[0.16em] text-(--ink-700) uppercase">{profile.headline}</p>
      <p className="mt-1 text-sm text-(--ink-700)">{profile.location}</p>
      <p className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">{profile.summary}</p>
    </header>
  );
};
