import type { ReactElement } from "react";

type ThemeToggleProps = {
  value: ThemePreference;
  onCycle: () => void;
};

type ThemePreference = "light" | "dark";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
    <path
      fill="currentColor"
      d="M12 7.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5m0-1.5A6 6 0 1 1 6 12a6 6 0 0 1 6-6"
    />
    <path fill="currentColor" d="M12 1.75a.75.75 0 0 1 .75.75V4.5a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75" />
    <path fill="currentColor" d="M12 18.75a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75" />
    <path fill="currentColor" d="M22.25 11.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5z" />
    <path fill="currentColor" d="M3.75 11.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5z" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
    <path
      fill="currentColor"
      d="M14.06 2.63a.75.75 0 0 0-.92.92 8 8 0 1 1-10.5 10.5.75.75 0 0 0-.92.92A9.5 9.5 0 1 0 14.06 2.63"
    />
  </svg>
);

const iconByPreference: Record<ThemePreference, ReactElement> = {
  light: <SunIcon />,
  dark: <MoonIcon />,
};

export const ThemeToggle = ({ value, onCycle }: ThemeToggleProps) => {
  const nextModeLabel = value === "dark" ? "Light" : "Dark";

  return (
    <button
      type="button"
      onClick={onCycle}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),white_10%)] text-(--ink-700) transition hover:border-(--ink-700) hover:text-(--ink-900) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ink-700)/35"
      aria-label={`Switch to ${nextModeLabel} mode`}
      title={`Switch to ${nextModeLabel} mode`}
    >
      {iconByPreference[value]}
    </button>
  );
};
