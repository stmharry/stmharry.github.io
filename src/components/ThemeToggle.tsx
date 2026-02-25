import type { ThemeMode } from "../lib/theme";

type ThemeToggleProps = {
  mode: ThemeMode;
  onToggle: () => void;
};

export const ThemeToggle = ({ mode, onToggle }: ThemeToggleProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center rounded-full border border-(--line) px-3 py-1 text-xs tracking-[0.16em] text-(--ink-700) uppercase transition hover:border-(--ink-700) hover:text-(--ink-900)"
      aria-label="Toggle color theme"
    >
      {mode === "light" ? "Dark" : "Light"}
    </button>
  );
};
