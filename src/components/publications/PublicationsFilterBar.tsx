import type { Topic } from "../../data/cv/types";
import type { TopicFilter } from "./publicationUtils";

type PublicationsFilterBarProps = {
  selectedFilter: TopicFilter;
  availableTopics: Topic[];
  onSelect: (nextFilter: TopicFilter) => void;
};

export const PublicationsFilterBar = ({ selectedFilter, availableTopics, onSelect }: PublicationsFilterBarProps) => {
  return (
    <div
      className="mt-2.5 flex flex-nowrap gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden sm:mt-3"
      style={{ scrollbarWidth: "none" }}
      role="group"
      aria-label="Filter by topic"
    >
      <button
        className={`shrink-0 rounded-full border px-3 py-1 text-[11px] tracking-[0.12em] uppercase transition ${
          selectedFilter === "all"
            ? "border-(--ink-900) bg-(--ink-900) text-(--paper)"
            : "border-(--line) text-(--ink-700) hover:border-(--ink-700) hover:text-(--ink-900)"
        }`}
        onClick={() => onSelect("all")}
      >
        All
      </button>
      {availableTopics.map((topic) => (
        <button
          key={topic.slug}
          className={`shrink-0 rounded-full border px-3 py-1 text-[11px] tracking-[0.12em] uppercase transition ${
            selectedFilter === topic.slug
              ? "border-(--ink-900) bg-(--ink-900) text-(--paper)"
              : "border-(--line) text-(--ink-700) hover:border-(--ink-700) hover:text-(--ink-900)"
          }`}
          onClick={() => onSelect(topic.slug)}
        >
          {topic.label}
        </button>
      ))}
    </div>
  );
};
