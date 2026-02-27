import { CardSurface } from "../CardSurface";
import { MobileCardDisclosure } from "../MobileCardDisclosure";
import { getTopicLabelBySlug } from "../../data/cv/selectors";
import type { PublicationItem, Topic } from "../../data/cv/types";
import { toPublicUrl } from "../../lib/url";
import { PublicationActionLinks } from "./PublicationActionLinks";
import { PublicationAuthorPreview, PublicationAuthors } from "./PublicationAuthors";
import { classifyAspect, getPublicationActionLinks, hasYearInVenue, mediaFrameClassByAspect } from "./publicationUtils";

type PublicationCardProps = {
  publication: PublicationItem;
  topics: Topic[];
};

export const PublicationCard = ({ publication, topics }: PublicationCardProps) => {
  const citationCount = publication.citationCount ?? null;
  const mediaLinks = getPublicationActionLinks(publication);
  const mediaAspect = classifyAspect(publication.thumbnailAspectRatio);

  return (
    <li id={`publication-${publication.id}`}>
      <CardSurface className="rounded-lg border border-(--line) bg-[color:color-mix(in_oklab,var(--paper),white_18%)] p-4 sm:p-5">
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
                      <span className="rounded-full border border-(--line) px-2 py-0.5 text-[10px] tracking-[0.1em]">
                        {citationCount} cites
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-2 text-lg leading-snug sm:text-xl" style={{ fontFamily: "var(--font-serif)" }}>
                    {publication.title}
                  </h3>

                  {!isDesktop && !isExpanded ? (
                    <p className="mt-2 text-sm leading-relaxed text-(--ink-700)">
                      <PublicationAuthorPreview authors={publication.authors} />
                    </p>
                  ) : null}
                </div>
              </div>
            </>
          )}
        >
          <div className="border-l border-(--rail) pl-3.5">
            <p className="text-sm leading-relaxed text-(--ink-700)">
              <PublicationAuthors authors={publication.authors} />
            </p>

            <PublicationActionLinks publicationId={publication.id} links={mediaLinks} />
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
      </CardSurface>
    </li>
  );
};
