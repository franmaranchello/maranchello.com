import { fetchProjects } from "~/composables/usePortfolioContent";
import {
  buildCanonicalUrl,
  escapeXml,
  normalizeSiteUrl,
  projectPath,
  SITEMAP_ROUTES,
} from "~/utils/seo";
import type { PortfolioProject } from "~/types/content";

interface SitemapUrl {
  changefreq: string;
  lastmod?: string;
  loc: string;
  priority: string;
}

const buildUrlEntry = ({ changefreq, lastmod, loc, priority }: SitemapUrl) => [
  "  <url>",
  `    <loc>${escapeXml(loc)}</loc>`,
  lastmod ? `    <lastmod>${escapeXml(lastmod.slice(0, 10))}</lastmod>` : "",
  `    <changefreq>${changefreq}</changefreq>`,
  `    <priority>${priority}</priority>`,
  "  </url>",
].filter(Boolean).join("\n");

const getProjects = async (): Promise<PortfolioProject[]> => {
  try {
    return await fetchProjects();
  } catch (error) {
    console.warn("Unable to load projects for sitemap.xml", error);
    return [];
  }
};

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const siteUrl = normalizeSiteUrl(String(runtimeConfig.public.siteUrl || ""));
  const projects = await getProjects();
  const urls: SitemapUrl[] = [
    ...SITEMAP_ROUTES.map((route) => ({
      ...route,
      loc: buildCanonicalUrl(siteUrl, route.path),
    })),
    ...projects.map((project) => ({
      loc: buildCanonicalUrl(siteUrl, projectPath(project)),
      lastmod: project.date || undefined,
      changefreq: "monthly",
      priority: "0.7",
    })),
  ];

  setHeader(event, "Content-Type", "application/xml; charset=utf-8");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls.map(buildUrlEntry).join("\n"),
    "</urlset>",
    "",
  ].join("\n");
});
