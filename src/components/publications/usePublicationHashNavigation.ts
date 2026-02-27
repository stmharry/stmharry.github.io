import { useEffect, useRef } from "react";

import type { PublicationItem } from "../../data/cv/types";
import type { TopicFilter } from "./publicationUtils";

type UsePublicationHashNavigationProps = {
  topicFilter: TopicFilter;
  setTopicFilter: (nextFilter: TopicFilter) => void;
  visiblePublications: PublicationItem[];
};

export const usePublicationHashNavigation = ({
  topicFilter,
  setTopicFilter,
  visiblePublications,
}: UsePublicationHashNavigationProps) => {
  const pendingHashTargetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (!hash.startsWith("#publication-")) {
        return;
      }

      const targetId = hash.slice(1);
      const publicationId = targetId.replace(/^publication-/, "");
      const isVisible = visiblePublications.some((publication) => publication.id === publicationId);

      if (!isVisible && topicFilter !== "all") {
        pendingHashTargetIdRef.current = targetId;
        setTopicFilter("all");
        return;
      }

      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ block: "start", behavior: "smooth" });
      });
    };

    handleHashNavigation();
    window.addEventListener("hashchange", handleHashNavigation);

    return () => {
      window.removeEventListener("hashchange", handleHashNavigation);
    };
  }, [topicFilter, visiblePublications, setTopicFilter]);

  useEffect(() => {
    if (topicFilter !== "all") {
      return;
    }

    const pendingTargetId = pendingHashTargetIdRef.current;
    if (!pendingTargetId) {
      return;
    }

    requestAnimationFrame(() => {
      document.getElementById(pendingTargetId)?.scrollIntoView({ block: "start", behavior: "smooth" });
      pendingHashTargetIdRef.current = null;
    });
  }, [topicFilter, visiblePublications]);
};
