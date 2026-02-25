import { useMemo, useState } from "react";

import {
  filterPublicationsByTopic,
  getTopicLabelBySlug,
  getUsedTopics,
  getWebPublications,
} from "../data/cv/selectors";
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

const renderAuthors = (authors: string) => {
  const parts = authors.split(",").map((part) => part.trim());

  return parts.map((author, index) => {
    const displayAuthor = AUTHOR_VARIANTS.has(author) ? <strong key={`${author}-${index}`}>{author}</strong> : author;
    const suffix = index < parts.length - 1 ? ", " : "";

    return (
      <span key={`${author}-${index}`}>
        {displayAuthor}
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

export const PublicationsSection = ({ publications, topics }: PublicationsSectionProps) => {
  const [topicFilter, setTopicFilter] = useState<TopicFilter>("all");

  const allPublications = useMemo(() => getWebPublications(publications), [publications]);
  const availableTopics = useMemo(() => getUsedTopics(topics, allPublications), [topics, allPublications]);
  const visiblePublications = useMemo(() => filterPublicationsByTopic(allPublications, topicFilter), [allPublications, topicFilter]);

  return (
    <section aria-labelledby="publications-heading" className="mt-20">
      <div>
        <h2 id="publications-heading" className="text-sm tracking-[0.2em] uppercase">
          Publications
        </h2>
        <p className="mt-2 text-sm text-(--ink-700)">Filter by topic.</p>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          <button
            className={`rounded-full border px-3 py-1 text-[11px] tracking-[0.12em] uppercase transition ${
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
              className={`rounded-full border px-3 py-1 text-[11px] tracking-[0.12em] uppercase transition ${
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

          return (
            <li key={publication.id} className="rounded-xl border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),white_40%)] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs tracking-[0.14em] text-(--ink-700) uppercase">
                  {publication.venue}
                  {hasYearInVenue(publication.venue) ? "" : ` - ${publication.year}`}
                </p>
                <h3 className="mt-2 text-xl leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
                  {publication.href ? (
                    <a href={publication.href} target="_blank" rel="noreferrer" className="hover:underline">
                      {publication.title}
                    </a>
                  ) : (
                    publication.title
                  )}
                </h3>
              </div>
              {citationCount ? (
                <p className="inline-flex min-w-20 shrink-0 flex-col items-center rounded-lg border border-(--line) px-3 py-2 text-center">
                  <span className="text-lg leading-none font-semibold text-(--ink-900)">{citationCount}</span>
                  <span className="mt-1 text-[10px] tracking-[0.12em] text-(--ink-700) uppercase">Citations</span>
                </p>
              ) : null}
            </div>

            <p className="mt-3 text-sm leading-relaxed text-(--ink-700)">{renderAuthors(publication.authors)}</p>

            {publication.thumbnailPath ? (
              <img
                src={publication.thumbnailPath}
                alt={`${publication.title} thumbnail`}
                className="mt-4 h-24 w-24 rounded-md border border-(--line) object-cover"
                loading="lazy"
              />
            ) : null}

            {actionLinks(publication).length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {actionLinks(publication).map((link) => (
                  <a
                    key={`${publication.id}-${link.label}`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-(--line) px-2 py-1 text-[11px] tracking-[0.12em] text-(--ink-700) uppercase hover:border-(--ink-700) hover:text-(--ink-900)"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              {publication.topics.map((topicSlug) => (
                <span
                  key={topicSlug}
                  className="rounded-full border border-(--line) px-2 py-1 text-[11px] tracking-[0.12em] text-(--ink-700) uppercase"
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
