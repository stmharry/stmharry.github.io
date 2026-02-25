export type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "theme-preference";

const isThemeMode = (value: string | null): value is ThemeMode => {
  return value === "light" || value === "dark";
};

export const getStoredTheme = (): ThemeMode | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeMode(value) ? value : null;
};

export const getSystemTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const getInitialTheme = (): ThemeMode => {
  return getStoredTheme() ?? getSystemTheme();
};

export const applyTheme = (theme: ThemeMode): void => {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = theme;
};

export const persistTheme = (theme: ThemeMode): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
};

export const clearPersistedTheme = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(THEME_STORAGE_KEY);
};

export const initializeTheme = (): ThemeMode => {
  const theme = getInitialTheme();
  applyTheme(theme);
  return theme;
};

export const subscribeToSystemTheme = (listener: (theme: ThemeMode) => void): (() => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = (event: MediaQueryListEvent): void => {
    listener(event.matches ? "dark" : "light");
  };

  mediaQuery.addEventListener("change", handleChange);

  return () => {
    mediaQuery.removeEventListener("change", handleChange);
  };
};
