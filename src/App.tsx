import { useEffect, useState } from "react";

import { EducationSection } from "./components/EducationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { Hero } from "./components/Hero";
import { PublicationsSection } from "./components/PublicationsSection";
import { cvContent } from "./data/cv/content";
import { getExperiencePublicationLinks } from "./data/cv/selectors";

type ThemePreference = "system" | "light" | "dark";

const THEME_STORAGE_KEY = "theme-preference";
const SYSTEM_DARK_QUERY = "(prefers-color-scheme: dark)";

const isThemePreference = (value: unknown): value is Exclude<ThemePreference, "system"> => {
  return value === "light" || value === "dark";
};

const getOppositeTheme = (value: Exclude<ThemePreference, "system">): Exclude<ThemePreference, "system"> => {
  return value === "dark" ? "light" : "dark";
};

function App() {
  const experiencePublicationLinks = getExperiencePublicationLinks(cvContent.publications);
  const [stickyNameOpacity, setStickyNameOpacity] = useState(0);
  const [systemTheme, setSystemTheme] = useState<Exclude<ThemePreference, "system">>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return window.matchMedia(SYSTEM_DARK_QUERY).matches ? "dark" : "light";
  });
  const [themePreference, setThemePreference] = useState<Exclude<ThemePreference, "system"> | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const storedValue = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(storedValue) ? storedValue : null;
  });
  const effectiveTheme = themePreference ?? systemTheme;

  useEffect(() => {
    const mediaQuery = window.matchMedia(SYSTEM_DARK_QUERY);

    const updateSystemTheme = (isDark: boolean) => {
      setSystemTheme(isDark ? "dark" : "light");
    };

    updateSystemTheme(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      updateSystemTheme(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (themePreference === null) {
      delete root.dataset.theme;
      window.localStorage.removeItem(THEME_STORAGE_KEY);
      return;
    }

    root.dataset.theme = themePreference;
    window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
  }, [themePreference]);

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
      <Hero
        profile={cvContent.profile}
        links={cvContent.profile.links}
        themePreference={effectiveTheme}
        onCycleTheme={() => {
          setThemePreference((current) => getOppositeTheme(current ?? effectiveTheme));
        }}
      />
      <ExperienceSection items={cvContent.experience} publicationLinksByExperienceId={experiencePublicationLinks} />
      <EducationSection items={cvContent.education} />
      <PublicationsSection publications={cvContent.publications} topics={cvContent.topics} />
    </main>
  );
}

export default App;
