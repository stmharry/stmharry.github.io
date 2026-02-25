import type { ExternalLink } from "../data/types";

type PrimaryLinksProps = {
  links: ExternalLink[];
};

export const PrimaryLinks = ({ links }: PrimaryLinksProps) => {
  return (
    <section aria-label="Primary links" className="mt-10">
      <ul className="grid gap-3 sm:grid-cols-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              className="block rounded-xl border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),white_28%)] p-4 transition hover:border-(--ink-700)"
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
            >
              <p className="text-sm tracking-[0.14em] text-(--ink-700) uppercase">{link.label}</p>
              <p className="mt-2 text-sm text-(--ink-900)">{link.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
