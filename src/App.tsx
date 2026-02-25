import { useEffect, useState } from "react";

import { ExperienceSection } from "./components/ExperienceSection";
import { Hero } from "./components/Hero";
import { PrimaryLinks } from "./components/PrimaryLinks";
import { PublicationsSection } from "./components/PublicationsSection";
import { ThemeToggle } from "./components/ThemeToggle";
import { siteContent } from "./data/content";
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

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
      <div className="flex items-center justify-end">
        <ThemeToggle mode={theme} onToggle={handleToggleTheme} />
      </div>
      <Hero profile={siteContent.profile} />
      <PrimaryLinks links={siteContent.links} />
      <ExperienceSection items={siteContent.experience} />
      <PublicationsSection publications={siteContent.publications} topics={siteContent.topics} />
    </main>
  );
}

export default App;
