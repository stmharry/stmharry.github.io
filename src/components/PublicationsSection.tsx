import { useMemo, useState } from "react";

import {
  filterPublicationsByTopic,
  getFeaturedPublications,
  getTopicLabelBySlug,
  getUsedTopics,
} from "../data/cv/selectors";
import type { PublicationItem, Topic } from "../data/cv/types";

type PublicationsSectionProps = {
  publications: PublicationItem[];
  topics: Topic[];
};

type TopicFilter = "all" | Topic["slug"];

export const PublicationsSection = ({ publications, topics }: PublicationsSectionProps) => {
  const [topicFilter, setTopicFilter] = useState<TopicFilter>("all");

  const featuredPublications = useMemo(() => getFeaturedPublications(publications), [publications]);
  const availableTopics = useMemo(() => getUsedTopics(topics, featuredPublications), [topics, featuredPublications]);
  const visiblePublications = useMemo(
    () => filterPublicationsByTopic(featuredPublications, topicFilter),
    [featuredPublications, topicFilter],
  );

  return (
    <section aria-labelledby="publications-heading" className="mt-20">
      <div>
        <h2 id="publications-heading" className="text-sm tracking-[0.2em] uppercase">
          Selected publications
        </h2>
        <p className="mt-2 text-sm text-(--ink-700)">Single-topic filter with curated highlights.</p>
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
        {visiblePublications.map((publication) => (
          <li key={publication.id} className="rounded-xl border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),white_40%)] p-5">
            <p className="text-xs tracking-[0.14em] text-(--ink-700) uppercase">
              {publication.venue} • {publication.year}
            </p>
            <h3 className="mt-2 text-xl leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
              <a href={publication.href ?? "#"} target={publication.href ? "_blank" : undefined} rel="noreferrer" className="hover:underline">
                {publication.title}
              </a>
            </h3>
            <p className="mt-2 text-sm text-(--ink-700)">
              {publication.venue}
              {publication.citationLabel ? ` - ${publication.citationLabel}` : ""}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-(--ink-700)">{publication.authors}</p>
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
        ))}
      </ul>
    </section>
  );
};
