import { toPublicUrl } from "../lib/url";

type LogoBadgeProps = {
  path: string;
  alt: string;
};

export const LogoBadge = ({ path, alt }: LogoBadgeProps) => {
  return (
    <span className="inline-flex h-6 w-6 shrink-0 overflow-hidden rounded-full border border-(--line) bg-(--paper)">
      <img src={toPublicUrl(path)} alt={alt} className="h-full w-full object-cover object-center" loading="lazy" />
    </span>
  );
};
