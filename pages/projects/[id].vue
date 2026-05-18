<template>
  <article class="page detail-page">
    <NuxtLink class="button" to="/projects">Back to projects</NuxtLink>

    <template v-if="project">
      <p class="section-kicker">{{ [project.type, project.collection, project.year].filter(Boolean).join(" / ") }}</p>
      <h1 class="section-title">{{ project.name }}</h1>
      <p class="section-copy">{{ project.description }}</p>

      <div v-if="project.gallery.length" class="gallery">
        <img v-for="image in project.gallery" :key="image" :src="image" :alt="project.name" loading="lazy" />
      </div>

      <div v-if="project.tags.length" class="tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>

      <div v-if="project.content" class="rich-content" v-html="project.content" />
    </template>

    <div v-else class="empty-state">Project not found.</div>
  </article>
</template>

<script setup lang="ts">
import { fetchProject } from "~/composables/usePortfolioContent";
import { PERSON_NAME, projectPath, projectSeoDescription } from "~/utils/seo";

const route = useRoute();
const id = computed(() => String(route.params.id || ""));
const { data: project } = await useAsyncData(`project-${id.value}`, () => fetchProject(id.value));

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: "Project not found" });
}

const seo = useSiteSeo({
  title: () => project.value?.name || "Project",
  description: () => projectSeoDescription(project.value),
  image: () => project.value?.gallery[0],
  path: () => (project.value ? projectPath(project.value) : `/projects/${id.value}`),
  type: "article",
});

useJsonLd(() => {
  if (!project.value) return [];

  return [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${seo.canonical.value}#project`,
      url: seo.canonical.value,
      name: project.value.name,
      description: projectSeoDescription(project.value),
      image: project.value.gallery,
      dateCreated: project.value.date || undefined,
      keywords: project.value.tags,
      creator: { "@id": `${seo.siteUrl.value}/#person`, name: PERSON_NAME },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Projects",
          item: `${seo.siteUrl.value}/projects`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: project.value.name,
          item: seo.canonical.value,
        },
      ],
    },
  ];
});
</script>

<style scoped>
.detail-page {
  max-width: 920px;
}

.detail-page > .button {
  margin-bottom: 30px;
}

.gallery {
  display: grid;
  gap: 14px;
  margin: 32px 0;
}

.gallery img {
  display: block;
  width: 100%;
  max-height: 620px;
  border: 1px solid var(--line);
  border-radius: 8px;
  object-fit: cover;
}

.tags {
  margin-bottom: 28px;
}
</style>
