import { useEffect, useState } from "react";

import { EducationSection } from "./components/EducationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { Hero } from "./components/Hero";
import { PublicationsSection } from "./components/PublicationsSection";
import { cvContent } from "./data/cv/content";
import { getExperiencePublicationLinks } from "./data/cv/selectors";

function App() {
  const experiencePublicationLinks = getExperiencePublicationLinks(cvContent.publications);
  const [stickyNameOpacity, setStickyNameOpacity] = useState(0);

  useEffect(() => {
    const fadeStart = 16;
    const fadeDistance = 80;

    const updateStickyNameOpacity = () => {
      const progress = (window.scrollY - fadeStart) / fadeDistance;
      const nextOpacity = Math.max(0, Math.min(progress, 1));
      setStickyNameOpacity(nextOpacity);
    };

    updateStickyNameOpacity();
    window.addEventListener("scroll", updateStickyNameOpacity, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateStickyNameOpacity);
    };
  }, []);

  return (
    <main id="top" className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <div className="pointer-events-none sticky top-0 z-50 h-0 sm:hidden">
        <div
          className="-mx-5 flex h-[var(--mobile-sticky-name-height)] items-center bg-[color:color-mix(in_oklab,var(--paper),white_14%)] px-5 shadow-[0_1px_0_0_var(--line)] backdrop-blur-md transition-opacity duration-200"
          style={{ opacity: stickyNameOpacity }}
        >
          <p className="text-[13px] font-medium text-(--ink-900)" style={{ fontFamily: "var(--font-serif)" }}>
            {cvContent.profile.name} · MIT Ph.D.
          </p>
        </div>
      </div>
      <Hero profile={cvContent.profile} links={cvContent.profile.links} />
      <ExperienceSection items={cvContent.experience} publicationLinksByExperienceId={experiencePublicationLinks} />
      <EducationSection items={cvContent.education} />
      <PublicationsSection publications={cvContent.publications} topics={cvContent.topics} />
    </main>
  );
}

export default App;
