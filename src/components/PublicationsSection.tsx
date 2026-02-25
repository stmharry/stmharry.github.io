import { useMemo, useState } from "react";

import { filterPublicationsByTopic, getTopicLabelBySlug, getUsedTopics, getWebPublications } from "../data/cv/selectors";
import type { PublicationItem, Topic } from "../data/cv/types";

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

const parseCitationCount = (citationLabel?: string): number | null => {
  if (!citationLabel) {
    return null;
  }

  const match = citationLabel.match(/(\d[\d,]*)/);
  if (!match) {
    return null;
  }

  return Number.parseInt(match[1].replaceAll(",", ""), 10);
};

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
  panorama: "h-16 w-32",
  wide: "h-16 w-28",
  standard: "h-16 w-24",
  compact: "h-18 w-18",
} as const;

const renderAuthors = (authors: string) => {
  const parts = authors.split(",").map((part) => part.trim());

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

const actionLinks = (publication: PublicationItem) => {
  return [
    { label: "Paper", href: publication.href },
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
      <div>
        <h2 id="publications-heading" className="text-base font-medium tracking-[0.18em] uppercase sm:text-sm sm:font-normal">
          Publications
        </h2>
        <div
          className="mt-3 flex flex-nowrap gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden"
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
          const citationCount = parseCitationCount(publication.citationLabel);
          const mediaLinks = actionLinks(publication);
          const mediaAspect = classifyAspect(publication.thumbnailAspectRatio);

          return (
            <li key={publication.id} className="rounded-lg border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),white_18%)] p-4 sm:p-5">
              <div className="flex items-start gap-3">
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
                    {publication.href ? (
                      <a href={publication.href} target="_blank" rel="noreferrer" className="hover:underline">
                        {publication.title}
                      </a>
                    ) : (
                      publication.title
                    )}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-(--ink-700)">{renderAuthors(publication.authors)}</p>
                </div>

                {publication.thumbnailPath ? (
                  <figure className="shrink-0 overflow-hidden rounded-md border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),black_4%)] p-1.5">
                    <div className={`${mediaFrameClassByAspect[mediaAspect]} max-w-full`}>
                      <img
                        src={publication.thumbnailPath}
                        alt={`${publication.title} thumbnail`}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </figure>
                ) : null}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {mediaLinks.map((link) => (
                  <a
                    key={`${publication.id}-${link.label}`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),var(--ink-900)_8%)] px-2.5 py-1.5 text-[11px] font-medium text-(--ink-900) hover:border-(--ink-700)"
                  >
                    <ExternalLinkIcon />
                    {link.label}
                  </a>
                ))}
              </div>

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
