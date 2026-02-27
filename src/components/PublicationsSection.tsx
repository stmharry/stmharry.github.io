import { useMemo, useState } from "react";

import { SectionHeading } from "./SectionHeading";
import { filterPublicationsByTopic, getUsedTopics, getWebPublications } from "../data/cv/selectors";
import type { PublicationItem, Topic } from "../data/cv/types";
import { PublicationCard } from "./publications/PublicationCard";
import { PublicationsFilterBar } from "./publications/PublicationsFilterBar";
import type { TopicFilter } from "./publications/publicationUtils";
import { usePublicationHashNavigation } from "./publications/usePublicationHashNavigation";

type PublicationsSectionProps = {
  publications: PublicationItem[];
  topics: Topic[];
};

export const PublicationsSection = ({ publications, topics }: PublicationsSectionProps) => {
  const [topicFilter, setTopicFilter] = useState<TopicFilter>("all");

  const allPublications = useMemo(() => getWebPublications(publications), [publications]);
  const availableTopics = useMemo(() => getUsedTopics(topics, allPublications), [topics, allPublications]);
  const visiblePublications = useMemo(() => filterPublicationsByTopic(allPublications, topicFilter), [allPublications, topicFilter]);

  usePublicationHashNavigation({ topicFilter, setTopicFilter, visiblePublications });

  return (
    <section aria-labelledby="publications-heading" className="mt-14 sm:mt-18">
      <SectionHeading id="publications-heading" title="Publications">
        <PublicationsFilterBar selectedFilter={topicFilter} availableTopics={availableTopics} onSelect={setTopicFilter} />
      </SectionHeading>

      <ul className="mt-6 space-y-4">
        {visiblePublications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} topics={topics} />
        ))}
      </ul>
    </section>
  );
};
