import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  title: string;
  children?: ReactNode;
};

export const SectionHeading = ({ id, title, children }: SectionHeadingProps) => {
  return (
    <div className="sticky top-[var(--mobile-sticky-name-height)] z-40 -mx-5 bg-[color:color-mix(in_oklab,var(--paper),white_10%)] px-5 pt-2 pb-2 shadow-[0_1px_0_0_var(--line)] backdrop-blur-md sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:pt-0 sm:pb-0 sm:shadow-none sm:backdrop-blur-none">
      <h2
        id={id}
        className="text-[11px] font-medium tracking-[0.16em] text-(--ink-700) uppercase sm:text-sm sm:font-normal sm:tracking-[0.18em] sm:text-current"
      >
        {title}
      </h2>
      {children}
    </div>
  );
};
