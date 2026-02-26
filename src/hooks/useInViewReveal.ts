import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type UseInViewRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delayMs?: number;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const useInViewReveal = ({
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  delayMs,
}: UseInViewRevealOptions = {}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsVisible(true);
      return;
    }

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const target = ref.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(target);
          }
          return;
        }

        if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [once, rootMargin, threshold]);

  const style = useMemo(() => {
    if (typeof delayMs !== "number") {
      return undefined;
    }

    return {
      ["--reveal-delay" as string]: `${delayMs}ms`,
    } as CSSProperties;
  }, [delayMs]);

  return { ref, isVisible, style };
};
