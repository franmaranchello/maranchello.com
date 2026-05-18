import type { PortfolioProject } from "~/types/content";

export const PERSON_NAME = "Francisco Maranchello";
export const SITE_NAME = PERSON_NAME;
export const DEFAULT_SITE_URL = "https://maranchello.com";
export const DEFAULT_SEO_DESCRIPTION =
  "Francisco Maranchello is an architect, software developer, entrepreneur, and cofounder at Radical Labs.";

export const SOCIAL_PROFILE_URLS = [
  "https://www.linkedin.com/in/franmaranchello/",
  "https://github.com/franmaranchello",
  "https://www.instagram.com/franmaranchello/",
  "https://twitter.com/franmaranchello",
  "https://maranchello.substack.com/",
  "https://radical-labs.co/",
];

export const SITEMAP_ROUTES = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
] as const;

export const normalizeSiteUrl = (value: string | undefined | null) =>
  (value || DEFAULT_SITE_URL).replace(/\/+$/, "");

export const normalizePath = (value: string | undefined | null) => {
  const path = value || "/";
  const withoutQuery = path.split(/[?#]/)[0] || "/";
  const withSlash = withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
  return withSlash === "/" ? withSlash : withSlash.replace(/\/+$/, "");
};

export const buildCanonicalUrl = (siteUrl: string, path = "/") =>
  `${normalizeSiteUrl(siteUrl)}${normalizePath(path)}`;

export const absoluteUrl = (siteUrl: string, value: string | undefined | null) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return buildCanonicalUrl(siteUrl, value);
};

export const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const truncateDescription = (value: string, fallback = DEFAULT_SEO_DESCRIPTION) => {
  const clean = stripHtml(value) || fallback;
  return clean.length > 160 ? `${clean.slice(0, 157).trim()}...` : clean;
};

export const projectPath = (project: Pick<PortfolioProject, "id">) =>
  `/projects/${encodeURIComponent(project.id)}`;

export const projectSeoDescription = (project: PortfolioProject | null | undefined) => {
  if (!project) return "Project by Francisco Maranchello.";
  return truncateDescription(
    [project.description, project.type, project.collection].filter(Boolean).join(" ")
  );
};

export const safeJsonLd = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");
