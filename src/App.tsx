import { useEffect, useState } from "react";

import { ExperienceSection } from "./components/ExperienceSection";
import { Hero } from "./components/Hero";
import { PrimaryLinks } from "./components/PrimaryLinks";
import { PublicationsSection } from "./components/PublicationsSection";
import { ThemeToggle } from "./components/ThemeToggle";
import { cvContent } from "./data/cv/content";
import { getWebExperience, getWebProfile } from "./data/cv/selectors";
import {
  applyTheme,
  getInitialTheme,
  getStoredTheme,
  persistTheme,
  subscribeToSystemTheme,
  type ThemeMode,
} from "./lib/theme";

function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (getStoredTheme() !== null) {
      return;
    }

    return subscribeToSystemTheme((systemTheme) => {
      setTheme(systemTheme);
    });
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    persistTheme(nextTheme);
    setTheme(nextTheme);
  };

  const webProfile = getWebProfile(cvContent);
  const webExperience = getWebExperience(cvContent);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
      <div className="flex items-center justify-end">
        <ThemeToggle mode={theme} onToggle={handleToggleTheme} />
      </div>
      <Hero profile={webProfile} />
      <PrimaryLinks links={cvContent.profile.links} />
      <ExperienceSection items={webExperience} />
      <PublicationsSection publications={cvContent.publications} topics={cvContent.topics} />
    </main>
  );
}

export default App;
