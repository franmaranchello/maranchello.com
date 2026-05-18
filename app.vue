<template>
  <div>
    <SiteHeader />
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  DEFAULT_SEO_DESCRIPTION,
  normalizeSiteUrl,
  PERSON_NAME,
  SITE_NAME,
  SOCIAL_PROFILE_URLS,
} from "~/utils/seo";

const runtimeConfig = useRuntimeConfig();
const siteUrl = computed(() => normalizeSiteUrl(String(runtimeConfig.public.siteUrl || "")));

useHead({
  titleTemplate: (title) => (title && title !== SITE_NAME ? `${title} | ${SITE_NAME}` : SITE_NAME),
  bodyAttrs: {
    class: "",
  },
});

useSeoMeta({
  title: SITE_NAME,
  description: DEFAULT_SEO_DESCRIPTION,
  ogTitle: SITE_NAME,
  ogDescription: DEFAULT_SEO_DESCRIPTION,
  ogSiteName: SITE_NAME,
  ogType: "website",
  twitterCard: "summary",
  robots: "index,follow",
});

useJsonLd(() => [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl.value}/#person`,
    name: PERSON_NAME,
    url: siteUrl.value,
    jobTitle: ["Architect", "Software Developer", "Entrepreneur"],
    worksFor: {
      "@type": "Organization",
      name: "Radical Labs",
      url: "https://radical-labs.co/",
    },
    sameAs: SOCIAL_PROFILE_URLS,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl.value}/#website`,
    name: SITE_NAME,
    url: siteUrl.value,
    publisher: { "@id": `${siteUrl.value}/#person` },
    inLanguage: "en",
  },
]);
</script>
