<template>
  <article class="card project-card">
    <NuxtLink class="media-link" :to="`/projects/${project.id}`">
      <img v-if="cover" :src="cover" :alt="project.name" loading="lazy" />
      <div v-else class="media-fallback">{{ project.name }}</div>
    </NuxtLink>
    <div class="card-body">
      <p class="meta">{{ [project.type, project.collection, project.year].filter(Boolean).join(" / ") }}</p>
      <h2 class="card-title">
        <NuxtLink :to="`/projects/${project.id}`">{{ project.name }}</NuxtLink>
      </h2>
      <p class="description">{{ project.description }}</p>
      <div v-if="project.tags.length" class="tags">
        <button
          v-for="tag in project.tags"
          :key="tag"
          class="tag"
          :class="{ active: tag === activeTag }"
          type="button"
          :aria-pressed="tag === activeTag"
          @click="$emit('tag', tag)"
        >
          {{ tag }}
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { PortfolioProject } from "~/types/content";

const props = defineProps<{
  activeTag?: string;
  project: PortfolioProject;
}>();

defineEmits<{
  tag: [tag: string];
}>();

const cover = computed(() => props.project.gallery[0] || "");
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
}

.media-link {
  display: block;
  overflow: hidden;
  background: var(--surface-muted);
  aspect-ratio: 16 / 10;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-fallback {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  padding: 18px;
  color: var(--muted);
}

.description {
  color: var(--muted);
  line-height: 1.65;
}

.tag {
  cursor: pointer;
}

.tag.active {
  border-color: var(--primary);
  background: var(--primary);
  color: var(--surface);
}
</style>
