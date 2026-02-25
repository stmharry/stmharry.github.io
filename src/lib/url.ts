export const toPublicUrl = (href: string): string => {
  if (/^https?:\/\//.test(href) || href.startsWith("mailto:")) {
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
  return /^https?:\/\//.test(href);
};
