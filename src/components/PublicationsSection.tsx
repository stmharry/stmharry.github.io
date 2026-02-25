import { useMemo, useState } from "react";

import { MobileCardDisclosure } from "./MobileCardDisclosure";
import { filterPublicationsByTopic, getTopicLabelBySlug, getUsedTopics, getWebPublications } from "../data/cv/selectors";
import type { PublicationItem, Topic } from "../data/cv/types";
import { isExternalUrl, toPublicUrl } from "../lib/url";

type PublicationsSectionProps = {
  publications: PublicationItem[];
  topics: Topic[];
};

type TopicFilter = "all" | Topic["slug"];

const AUTHOR_VARIANTS = new Set([
  "Tzu-Ming Harry Hsu",
  "Tzu Ming Harry Hsu",
  "Tzu-Ming Hsu",
  "Tzu Ming Hsu",
  "Harry Hsu",
]);

const hasYearInVenue = (venue: string): boolean => {
  return /\b(19|20)\d{2}\b/.test(venue);
};

const classifyAspect = (aspectRatio?: number): "panorama" | "wide" | "standard" | "compact" => {
  if (!aspectRatio) {
    return "standard";
  }

  if (aspectRatio >= 2.4) {
    return "panorama";
  }

  if (aspectRatio >= 1.75) {
    return "wide";
  }

  if (aspectRatio < 1.35) {
    return "compact";
  }

  return "standard";
};

const mediaFrameClassByAspect = {
  panorama: "h-12 w-34 sm:h-16 sm:w-32",
  wide: "h-12 w-28 sm:h-16 sm:w-28",
  standard: "h-12 w-22 sm:h-16 sm:w-24",
  compact: "h-14 w-18 sm:h-18 sm:w-18",
} as const;

const parseAuthors = (authors: string): string[] => {
  return authors
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
};

const renderAuthors = (authors: string) => {
  const parts = parseAuthors(authors);

  return parts.map((author, index) => {
    const suffix = index < parts.length - 1 ? ", " : "";
    const isSelf = AUTHOR_VARIANTS.has(author);

    return (
      <span key={`${author}-${index}`}>
        {isSelf ? <strong>{author}</strong> : author}
        {suffix}
      </span>
    );
  });
};

const renderAuthorPreview = (authors: string) => {
  const parts = parseAuthors(authors);
  const visibleAuthors = parts.slice(0, 2);
  const hiddenCount = parts.length - visibleAuthors.length;

  return (
    <>
      {visibleAuthors.map((author, index) => {
        const suffix = index < visibleAuthors.length - 1 ? ", " : "";
        const isSelf = AUTHOR_VARIANTS.has(author);

        return (
          <span key={`${author}-${index}`}>
            {isSelf ? <strong>{author}</strong> : author}
            {suffix}
          </span>
        );
      })}
      {hiddenCount > 0 ? <span className="text-(--ink-700)"> +{hiddenCount} more</span> : null}
    </>
  );
};

const actionLinks = (publication: PublicationItem) => {
  const primaryPaperHref = publication.paperUrl ?? publication.scholarCitationUrl;

  return [
    { label: "Paper", href: primaryPaperHref },
    { label: "Slides", href: publication.slidesUrl },
    { label: "Poster", href: publication.posterUrl },
    { label: "Video", href: publication.videoUrl },
    { label: "Code", href: publication.codeUrl },
    { label: "Project", href: publication.projectUrl },
    { label: "Dataset", href: publication.datasetUrl },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));
};

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3">
    <path fill="currentColor" d="M14 4h6v6h-1.5V6.56l-8.97 8.97-1.06-1.06 8.97-8.97H14z" />
    <path fill="currentColor" d="M5.75 6A1.75 1.75 0 0 0 4 7.75v10.5C4 19.22 4.78 20 5.75 20h10.5c.97 0 1.75-.78 1.75-1.75V11h-1.5v7.25a.25.25 0 0 1-.25.25H5.75a.25.25 0 0 1-.25-.25V7.75c0-.14.11-.25.25-.25H13V6z" />
  </svg>
);

export const PublicationsSection = ({ publications, topics }: PublicationsSectionProps) => {
  const [topicFilter, setTopicFilter] = useState<TopicFilter>("all");

  const allPublications = useMemo(() => getWebPublications(publications), [publications]);
  const availableTopics = useMemo(() => getUsedTopics(topics, allPublications), [topics, allPublications]);
  const visiblePublications = useMemo(() => filterPublicationsByTopic(allPublications, topicFilter), [allPublications, topicFilter]);

  return (
    <section aria-labelledby="publications-heading" className="mt-14 sm:mt-18">
      <div className="sticky top-[var(--mobile-sticky-name-height)] z-40 -mx-5 bg-[color:color-mix(in_oklab,var(--paper),white_10%)] px-5 pt-1.5 pb-2 shadow-[0_1px_0_0_var(--line)] backdrop-blur-md sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:pt-0 sm:pb-0 sm:shadow-none sm:backdrop-blur-none">
        <h2
          id="publications-heading"
          className="text-[11px] font-medium tracking-[0.16em] text-(--ink-700) uppercase sm:text-sm sm:font-normal sm:tracking-[0.18em] sm:text-current"
        >
          Publications
        </h2>
        <div
          className="mt-2.5 flex flex-nowrap gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden sm:mt-3"
          style={{ scrollbarWidth: "none" }}
          role="group"
          aria-label="Filter by topic"
        >
          <button
            className={`shrink-0 rounded-full border px-3 py-1 text-[11px] tracking-[0.12em] uppercase transition ${
              topicFilter === "all"
                ? "border-(--ink-900) bg-(--ink-900) text-(--paper)"
                : "border-(--line) text-(--ink-700) hover:border-(--ink-700) hover:text-(--ink-900)"
            }`}
            onClick={() => setTopicFilter("all")}
          >
            All
          </button>
          {availableTopics.map((topic) => (
            <button
              key={topic.slug}
              className={`shrink-0 rounded-full border px-3 py-1 text-[11px] tracking-[0.12em] uppercase transition ${
                topicFilter === topic.slug
                  ? "border-(--ink-900) bg-(--ink-900) text-(--paper)"
                  : "border-(--line) text-(--ink-700) hover:border-(--ink-700) hover:text-(--ink-900)"
              }`}
              onClick={() => setTopicFilter(topic.slug)}
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-6 space-y-4">
        {visiblePublications.map((publication) => {
          const citationCount = publication.citationCount ?? null;
          const mediaLinks = actionLinks(publication);
          const mediaAspect = classifyAspect(publication.thumbnailAspectRatio);
          return (
            <li key={publication.id} className="rounded-lg border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),white_18%)] p-4 sm:p-5">
              <MobileCardDisclosure
                id={`publication-${publication.id}`}
                trigger={({ isExpanded, isDesktop }) => (
                  <>
                    {publication.thumbnailPath ? (
                      <figure className="mb-3 inline-flex shrink-0 self-start overflow-hidden rounded-md border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),black_4%)] p-1.5 sm:hidden">
                        <div className={mediaFrameClassByAspect[mediaAspect]}>
                          <img
                            src={toPublicUrl(publication.thumbnailPath)}
                            alt={`${publication.title} thumbnail`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      </figure>
                    ) : null}

                    <div className="flex items-start gap-3">
                      {publication.thumbnailPath ? (
                        <figure className="hidden shrink-0 overflow-hidden rounded-md border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),black_4%)] p-1.5 sm:block">
                          <div className={`${mediaFrameClassByAspect[mediaAspect]} max-w-full`}>
                            <img
                              src={toPublicUrl(publication.thumbnailPath)}
                              alt={`${publication.title} thumbnail`}
                              className="h-full w-full object-contain"
                              loading="lazy"
                            />
                          </div>
                        </figure>
                      ) : null}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs tracking-[0.13em] text-(--ink-700) uppercase">
                          <span>
                            {publication.venue}
                            {hasYearInVenue(publication.venue) ? "" : ` - ${publication.year}`}
                          </span>
                          {citationCount ? (
                            <span className="rounded-full border border-(--line) px-2 py-0.5 text-[10px] tracking-[0.1em]">{citationCount} cites</span>
                          ) : null}
                        </div>

                        <h3 className="mt-2 text-lg leading-snug sm:text-xl" style={{ fontFamily: "var(--font-serif)" }}>
                          {publication.title}
                        </h3>

                        {!isDesktop && !isExpanded ? (
                          <p className="mt-2 text-sm leading-relaxed text-(--ink-700)">{renderAuthorPreview(publication.authors)}</p>
                        ) : null}
                      </div>
                    </div>
                  </>
                )}
              >
                <p className="text-sm leading-relaxed text-(--ink-700)">{renderAuthors(publication.authors)}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {mediaLinks.map((link) => (
                      <a
                        key={`${publication.id}-${link.label}`}
                        href={toPublicUrl(link.href)}
                        target={isExternalUrl(toPublicUrl(link.href)) ? "_blank" : undefined}
                        rel={isExternalUrl(toPublicUrl(link.href)) ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 rounded-md border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),var(--ink-900)_8%)] px-2.5 py-1.5 text-[11px] font-medium text-(--ink-900) hover:border-(--ink-700)"
                    >
                      <ExternalLinkIcon />
                      {link.label}
                    </a>
                  ))}
                </div>
              </MobileCardDisclosure>

              <div className="mt-3 flex flex-wrap gap-2">
                {publication.topics.map((topicSlug) => (
                  <span
                    key={topicSlug}
                    className="rounded-full border border-(--line) px-2 py-1 text-[10px] tracking-[0.1em] text-(--ink-700) uppercase"
                  >
                    {getTopicLabelBySlug(topics, topicSlug)}
                  </span>
                ))}
              </div>

            </li>
          );
        })}
      </ul>
    </section>
  );
};
