import type { LinkItem } from "../data/cv/types";
import { isExternalUrl, toPublicUrl } from "../lib/url";

type PrimaryLinksProps = {
  links: LinkItem[];
};

const iconByType = {
  email: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
      <path fill="currentColor" d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25zm2.2-.75 6.8 5.26L18.8 6zM19 7.55l-6.39 4.93a1 1 0 0 1-1.22 0L5 7.55v9.7c0 .41.34.75.75.75h12.5c.41 0 .75-.34.75-.75z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.49v-1.73c-2.77.6-3.35-1.18-3.35-1.18-.45-1.15-1.1-1.45-1.1-1.45-.9-.61.07-.6.07-.6 1 .07 1.52 1.03 1.52 1.03.88 1.52 2.3 1.08 2.86.83.09-.64.35-1.08.64-1.33-2.21-.25-4.53-1.1-4.53-4.9 0-1.08.39-1.95 1.02-2.64-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.01A9.5 9.5 0 0 1 12 6.85c.85 0 1.7.11 2.5.33 1.9-1.28 2.74-1.01 2.74-1.01.55 1.38.2 2.4.1 2.66.64.69 1.02 1.56 1.02 2.64 0 3.81-2.33 4.65-4.55 4.89.36.31.68.92.68 1.86V21c0 .27.18.58.69.49A10 10 0 0 0 12 2"
      />
    </svg>
  ),
  scholar: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
      <path fill="currentColor" d="m12 3 9 5-9 5-9-5zm-6.75 8.15L12 15l6.75-3.85V16c0 1.1-3.02 3-6.75 3s-6.75-1.9-6.75-3z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
      <path
        fill="currentColor"
        d="M6.94 8.5H3.56V20h3.38zM5.25 3A2.03 2.03 0 1 0 5.3 7.06 2.03 2.03 0 0 0 5.25 3m4.02 5.5V20h3.37v-6.04c0-1.6.3-3.15 2.28-3.15 1.95 0 1.98 1.82 1.98 3.25V20H20V13.4c0-3.24-.7-5.73-4.48-5.73-1.82 0-3.04 1-3.54 1.96h-.05V8.5z"
      />
    </svg>
  ),
  resume: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
      <path fill="currentColor" d="M7 3.75A1.75 1.75 0 0 1 8.75 2h6.5a1.75 1.75 0 0 1 1.24.51l2 2A1.75 1.75 0 0 1 19 5.75v14.5A1.75 1.75 0 0 1 17.25 22H8.75A1.75 1.75 0 0 1 7 20.25zm1.75-.25a.25.25 0 0 0-.25.25v16.5c0 .14.11.25.25.25h8.5a.25.25 0 0 0 .25-.25V6h-1.75A1.75 1.75 0 0 1 14 4.25V3.5zM10 10.25c0-.41.34-.75.75-.75h2.5a.75.75 0 1 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75M10.75 13a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5zm0 3.5a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z" />
    </svg>
  ),
} as const;

export const PrimaryLinks = ({ links }: PrimaryLinksProps) => {
  return (
    <section aria-label="Primary links" className="mt-8 sm:mt-10">
      <ul className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        {links.map((link) => (
          <li key={link.label}>
            {(() => {
              const resolvedHref = toPublicUrl(link.href);
              const external = isExternalUrl(resolvedHref);

              return (
            <a
              href={resolvedHref}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),white_10%)] text-(--ink-700) transition hover:border-(--ink-700) hover:text-(--ink-900) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ink-700)/40"
              aria-label={`${link.label}: ${link.description}`}
              title={`${link.label}: ${link.description}`}
            >
              {iconByType[link.icon]}
            </a>
              );
            })()}
          </li>
        ))}
      </ul>
    </section>
  );
};
