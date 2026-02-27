import { isSelfAuthor } from "../../data/cv/authors";

const parseAuthors = (authors: string): string[] => {
  return authors
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
};

type PublicationAuthorsProps = {
  authors: string;
};

export const PublicationAuthors = ({ authors }: PublicationAuthorsProps) => {
  const parts = parseAuthors(authors);

  return (
    <>
      {parts.map((author, index) => {
        const suffix = index < parts.length - 1 ? ", " : "";
        const isSelf = isSelfAuthor(author);

        return (
          <span key={`${author}-${index}`}>
            {isSelf ? <strong>{author}</strong> : author}
            {suffix}
          </span>
        );
      })}
    </>
  );
};

export const PublicationAuthorPreview = ({ authors }: PublicationAuthorsProps) => {
  const parts = parseAuthors(authors);
  const visibleAuthors = parts.slice(0, 2);
  const hiddenCount = parts.length - visibleAuthors.length;

  return (
    <>
      {visibleAuthors.map((author, index) => {
        const suffix = index < visibleAuthors.length - 1 ? ", " : "";
        const isSelf = isSelfAuthor(author);

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
