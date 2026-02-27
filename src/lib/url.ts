const EXTERNAL_URL_PATTERN = /^https?:\/\//;

export const toPublicUrl = (href: string): string => {
  if (EXTERNAL_URL_PATTERN.test(href) || href.startsWith("mailto:")) {
    return href;
  }

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const baseUrl = import.meta.env.BASE_URL ?? "/";

  if (baseUrl === "/") {
    return normalizedPath;
  }

  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  return `${normalizedBase}${normalizedPath}`;
};

export const isExternalUrl = (href: string): boolean => {
  return EXTERNAL_URL_PATTERN.test(href);
};

export type ResolvedLink = {
  href: string;
  external: boolean;
  target?: "_blank";
  rel?: "noreferrer";
};

export const resolveLink = (href: string): ResolvedLink => {
  const resolvedHref = toPublicUrl(href);
  const external = isExternalUrl(resolvedHref);

  return {
    href: resolvedHref,
    external,
    target: external ? "_blank" : undefined,
    rel: external ? "noreferrer" : undefined,
  };
};
