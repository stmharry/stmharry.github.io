import type { ElementType, ReactNode } from "react";

import { useInViewReveal } from "../hooks/useInViewReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: ElementType;
};

export const Reveal = ({ children, className = "", delayMs, as = "div" }: RevealProps) => {
  const { ref, isVisible, style } = useInViewReveal({ delayMs });
  const Component = as;

  return (
    <Component
      ref={ref}
      style={style}
      className={`${isVisible ? "motion-fade-up-in" : "motion-fade-up-init"} ${className}`.trim()}
    >
      {children}
    </Component>
  );
};
