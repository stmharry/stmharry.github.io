import { EducationSection } from "./components/EducationSection";
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
    <main id="top" className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <Hero profile={webProfile} />
      <PrimaryLinks links={cvContent.profile.links} />
      <ExperienceSection items={webExperience} />
      <EducationSection items={cvContent.education} />
      <PublicationsSection publications={cvContent.publications} topics={cvContent.topics} />
    </main>
  );
}

export default App;
