<template>
  <section class="page about-page">
    <div class="about-media">
      <img v-if="profileUrl" :src="profileUrl" alt="Francisco Maranchello" />
    </div>
    <div>
      <p class="section-kicker">About Me</p>
      <h1 class="section-title">Francisco Maranchello</h1>
      <div v-if="about.content" class="rich-content section-copy" v-html="about.content" />
      <p v-else class="section-copy">
        Architect, software developer, entrepreneur, and cofounder at Radical Labs.
      </p>
      <NuxtLink class="button" to="/">Back home</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { fetchAbout } from "~/composables/usePortfolioContent";
import { getPublicStorageUrlFromBucket } from "~/utils/firebase";
import { PERSON_NAME, truncateDescription } from "~/utils/seo";

const { data: about } = await useAsyncData("about", fetchAbout, {
  default: () => ({ content: "" }),
});

const runtimeConfig = useRuntimeConfig();
const profileUrl = computed(() =>
  getPublicStorageUrlFromBucket(
    runtimeConfig.public.firebase.storageBucket,
    "project-assets/default/profile.jpg"
  )
);
const description = computed(() =>
  truncateDescription(
    about.value.content,
    "About Francisco Maranchello, an architect, software developer, entrepreneur, and cofounder at Radical Labs."
  )
);

const seo = useSiteSeo({
  title: "About",
  description: () => description.value,
  image: () => profileUrl.value,
  path: "/about",
  type: "profile",
});

useJsonLd(() => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${seo.canonical.value}#about`,
  url: seo.canonical.value,
  name: `About ${PERSON_NAME}`,
  description: description.value,
  mainEntity: { "@id": `${seo.siteUrl.value}/#person` },
}));
</script>

<style scoped>
.about-page {
  display: grid;
  grid-template-columns: minmax(260px, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(28px, 5vw, 64px);
  align-items: center;
}

.about-media {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface-muted);
  box-shadow: var(--shadow);
}

.about-media img {
  display: block;
  width: 100%;
  height: auto;
}

.button {
  margin-top: 24px;
}

@media (max-width: 780px) {
  .about-page {
    grid-template-columns: 1fr;
  }
}
</style>
