import { useEffect, useState, type ReactNode } from "react";

type TriggerRenderState = {
  isDesktop: boolean;
  isExpanded: boolean;
};

type MobileCardDisclosureProps = {
  id: string;
  trigger: ReactNode | ((state: TriggerRenderState) => ReactNode);
  children: ReactNode;
  className?: string;
};

const DESKTOP_MEDIA_QUERY = "(min-width: 640px)";

const ChevronDown = ({ expanded }: { expanded: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    aria-hidden="true"
    className={`h-3.5 w-3.5 transition-transform duration-200 ease-out motion-reduce:transition-none ${expanded ? "rotate-180" : "rotate-0"}`}
  >
    <path fill="currentColor" d="M5.2 7.4 10 12.2l4.8-4.8 1 1L10 14.2 4.2 8.4z" />
  </svg>
);

export const MobileCardDisclosure = ({
  id,
  trigger,
  children,
  className = "mt-3",
}: MobileCardDisclosureProps) => {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
  });
  const [isExpandedOnMobile, setIsExpandedOnMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const isExpanded = isDesktop || isExpandedOnMobile;
  const panelId = `${id}-mobile-details`;
  const triggerContent = typeof trigger === "function" ? trigger({ isDesktop, isExpanded }) : trigger;

  const toggleExpanded = () => {
    if (isDesktop) {
      return;
    }

    setIsExpandedOnMobile((current) => !current);
  };

  const isInteractiveTarget = (target: EventTarget | null): boolean => {
    return target instanceof Element && Boolean(target.closest("a, button, input, textarea, select, summary, [data-disclosure-ignore='true']"));
  };

  return (
    <>
      <div
        role={!isDesktop ? "button" : undefined}
        tabIndex={!isDesktop ? 0 : undefined}
        aria-expanded={!isDesktop ? isExpandedOnMobile : undefined}
        aria-controls={!isDesktop ? panelId : undefined}
        onClick={(event) => {
          if (isInteractiveTarget(event.target)) {
            return;
          }

          toggleExpanded();
        }}
        onKeyDown={(event) => {
          if (isDesktop) {
            return;
          }

          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleExpanded();
          }
        }}
        className={`relative ${!isDesktop ? "cursor-pointer rounded-md p-1 -m-1 transition duration-200 ease-out active:scale-[0.995] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ink-900)" : ""}`}
      >
        {!isDesktop ? <span aria-hidden="true" className="pointer-events-none float-right h-7 w-7" /> : null}
        {triggerContent}
        {!isDesktop ? <span aria-hidden="true" className="block clear-both h-0" /> : null}
        {!isDesktop ? (
          <span className="pointer-events-none absolute top-0.5 right-0.5 z-10 rounded-full border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),var(--ink-900)_6%)] p-1.5 text-(--ink-700)">
            <ChevronDown expanded={isExpandedOnMobile} />
          </span>
        ) : null}
      </div>

      <div
        id={panelId}
        className={`${className} grid transition-[grid-template-rows,opacity,margin] duration-200 ease-out motion-reduce:transition-none ${
          isExpanded ? "grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className={`min-h-0 overflow-hidden ${isExpanded ? "pointer-events-auto" : "pointer-events-none"}`}>{children}</div>
      </div>
    </>
  );
};
