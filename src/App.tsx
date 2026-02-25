import { ExperienceSection } from "./components/ExperienceSection";
import { Hero } from "./components/Hero";
import { PrimaryLinks } from "./components/PrimaryLinks";
import { PublicationsSection } from "./components/PublicationsSection";
import { cvContent } from "./data/cv/content";
import { getWebExperience, getWebProfile } from "./data/cv/selectors";

function App() {
  const webProfile = getWebProfile(cvContent);
  const webExperience = getWebExperience(cvContent);

  return (
    <>
      <main id="top" className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <Hero profile={webProfile} />
        <PrimaryLinks links={cvContent.profile.links} />
        <ExperienceSection items={webExperience} />
        <PublicationsSection publications={cvContent.publications} topics={cvContent.topics} />
      </main>

      <nav
        aria-label="Jump to section"
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-(--line) bg-[color:color-mix(in_oklab,var(--paper),transparent_15%)] px-4 py-2 backdrop-blur-md sm:hidden"
      >
        <a href="#top" className="flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] tracking-[0.1em] text-(--ink-700) uppercase hover:text-(--ink-900)">
          <span aria-hidden="true" className="text-sm leading-none">↑</span>
          Top
        </a>
        <a href="#experience-heading" className="flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] tracking-[0.1em] text-(--ink-700) uppercase hover:text-(--ink-900)">
          <span aria-hidden="true" className="text-sm leading-none">◈</span>
          Experience
        </a>
        <a href="#publications-heading" className="flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] tracking-[0.1em] text-(--ink-700) uppercase hover:text-(--ink-900)">
          <span aria-hidden="true" className="text-sm leading-none">◈</span>
          Publications
        </a>
      </nav>

      <div className="h-14 sm:hidden" aria-hidden="true" />
    </>
  );
}

export default App;
