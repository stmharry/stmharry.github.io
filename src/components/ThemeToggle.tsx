import type { ThemeMode } from "../lib/theme";

type ThemeToggleProps = {
  mode: ThemeMode;
  onToggle: () => void;
};

export const ThemeToggle = ({ mode, onToggle }: ThemeToggleProps) => {
  const isLight = mode === "light";

  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full border border-(--line) px-3 py-1 text-xs tracking-[0.12em] text-(--ink-700) uppercase transition hover:border-(--ink-700) hover:text-(--ink-900)"
      aria-label="Toggle color theme"
    >
      {isLight ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
          <path fill="currentColor" d="M12 5.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 5.5m5.3 1.95a.75.75 0 0 1 1.06 1.06L17.3 9.57a.75.75 0 1 1-1.06-1.06zM18.5 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 18.5 12m-6.5 3.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7m-8-4.25a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1 0-1.5zm2.2-2.74a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 1-1.06 1.06L6.2 9.57a.75.75 0 0 1 0-1.06m10.04 7.66a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06M12 16.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V17a.75.75 0 0 1 .75-.75m-4.24-.08a.75.75 0 0 1 1.06 1.06L7.76 18.3a.75.75 0 1 1-1.06-1.06z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
          <path fill="currentColor" d="M13.57 3.16a.75.75 0 0 1 .83.96 7.25 7.25 0 1 0 9.49 9.5.75.75 0 0 1 1.4.56 8.75 8.75 0 1 1-11.16-11 .75.75 0 0 1 .44-.02" />
        </svg>
      )}
      {isLight ? "Dark" : "Light"}
    </button>
  );
};
