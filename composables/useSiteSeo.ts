import type { MaybeRefOrGetter } from "vue";
import {
  absoluteUrl,
  buildCanonicalUrl,
  DEFAULT_SEO_DESCRIPTION,
  normalizeSiteUrl,
  safeJsonLd,
  SITE_NAME,
} from "~/utils/seo";

interface SiteSeoInput {
  description?: MaybeRefOrGetter<string | undefined>;
  image?: MaybeRefOrGetter<string | undefined>;
  path?: MaybeRefOrGetter<string | undefined>;
  robots?: MaybeRefOrGetter<string | undefined>;
  title?: MaybeRefOrGetter<string | undefined>;
  type?: "website" | "profile" | "article";
}

const resolveValue = <T>(value: MaybeRefOrGetter<T> | undefined, fallback: T) => {
  const resolved = value === undefined ? undefined : toValue(value);
  return resolved === undefined || resolved === null || resolved === "" ? fallback : resolved;
};

export const useSiteSeo = (input: SiteSeoInput = {}) => {
  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();
  const siteUrl = computed(() => normalizeSiteUrl(String(runtimeConfig.public.siteUrl || "")));
  const canonical = computed(() =>
    buildCanonicalUrl(siteUrl.value, resolveValue(input.path, route.path))
  );
  const description = computed(() =>
    resolveValue(input.description, DEFAULT_SEO_DESCRIPTION)
  );
  const image = computed(() => absoluteUrl(siteUrl.value, resolveValue(input.image, "")));
  const title = computed(() => resolveValue(input.title, SITE_NAME));
  const robots = computed(() => resolveValue(input.robots, "index,follow"));

  useSeoMeta({
    title: () => title.value,
    description: () => description.value,
    ogTitle: () => title.value,
    ogDescription: () => description.value,
    ogSiteName: SITE_NAME,
    ogType: input.type || "website",
    ogUrl: () => canonical.value,
    ogImage: () => image.value || undefined,
    twitterCard: () => (image.value ? "summary_large_image" : "summary"),
    twitterTitle: () => title.value,
    twitterDescription: () => description.value,
    twitterImage: () => image.value || undefined,
    robots: () => robots.value,
  });

  useHead(() => ({
    link: [{ rel: "canonical", href: canonical.value }],
  }));

  return { canonical, description, image, siteUrl, title };
};

export const useJsonLd = (schema: MaybeRefOrGetter<unknown | unknown[]>) => {
  useHead(() => {
    const schemas = [toValue(schema)].flat().filter(Boolean);

    return {
      script: schemas.map((entry, index) => {
        const record = typeof entry === "object" && entry ? (entry as Record<string, unknown>) : {};
        const type = Array.isArray(record["@type"])
          ? record["@type"].join("-")
          : String(record["@type"] || "schema");
        const identity = String(record["@id"] || record.url || record.name || index);
        const key = `json-ld-${type}-${identity}`.replace(/[^a-z0-9_-]+/gi, "-").slice(0, 120);

        return {
          key,
          type: "application/ld+json",
          innerHTML: safeJsonLd(entry),
        };
      }),
    };
  });
};
