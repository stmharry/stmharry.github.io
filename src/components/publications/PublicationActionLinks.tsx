import { resolveLink } from "../../lib/url";
import type { PublicationActionLink } from "./publicationUtils";

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3">
    <path fill="currentColor" d="M14 4h6v6h-1.5V6.56l-8.97 8.97-1.06-1.06 8.97-8.97H14z" />
    <path fill="currentColor" d="M5.75 6A1.75 1.75 0 0 0 4 7.75v10.5C4 19.22 4.78 20 5.75 20h10.5c.97 0 1.75-.78 1.75-1.75V11h-1.5v7.25a.25.25 0 0 1-.25.25H5.75a.25.25 0 0 1-.25-.25V7.75c0-.14.11-.25.25-.25H13V6z" />
  </svg>
);

type PublicationActionLinksProps = {
  publicationId: string;
  links: PublicationActionLink[];
};

export const PublicationActionLinks = ({ publicationId, links }: PublicationActionLinksProps) => {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {links.map((link) => {
        const resolvedLink = resolveLink(link.href);

        return (
          <a
            key={`${publicationId}-${link.label}`}
            href={resolvedLink.href}
            target={resolvedLink.target}
            rel={resolvedLink.rel}
            className="inline-flex items-center gap-1.5 rounded-md border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),var(--ink-900)_8%)] px-2.5 py-1.5 text-[11px] font-medium text-(--ink-900) hover:border-(--ink-700)"
          >
            <ExternalLinkIcon />
            {link.label}
          </a>
        );
      })}
    </div>
  );
};
