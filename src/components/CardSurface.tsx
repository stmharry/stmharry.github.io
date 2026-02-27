import type { ReactNode } from "react";

type CardSurfaceProps = {
  children: ReactNode;
  className?: string;
};

const DEFAULT_CARD_CLASS =
  "rounded-lg border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),white_24%)] p-4 sm:p-5";

export const CardSurface = ({ children, className = DEFAULT_CARD_CLASS }: CardSurfaceProps) => {
  return <div className={className}>{children}</div>;
};
