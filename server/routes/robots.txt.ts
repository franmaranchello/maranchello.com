import { buildCanonicalUrl, normalizeSiteUrl } from "~/utils/seo";

export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const siteUrl = normalizeSiteUrl(String(runtimeConfig.public.siteUrl || ""));

  setHeader(event, "Content-Type", "text/plain; charset=utf-8");

  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin",
    "Disallow: /admin/",
    "Disallow: /login",
    "",
    `Sitemap: ${buildCanonicalUrl(siteUrl, "/sitemap.xml")}`,
    "",
  ].join("\n");
});
