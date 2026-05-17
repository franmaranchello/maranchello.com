<template>
  <article class="card">
    <NuxtLink v-if="cover" class="media-link" :to="`/blog/${post.id}`">
      <img :src="cover" :alt="post.name" loading="lazy" />
    </NuxtLink>
    <div class="card-body">
      <p class="meta">{{ formatDate(post.date) }}</p>
      <h2 class="card-title">
        <NuxtLink :to="`/blog/${post.id}`">{{ post.name }}</NuxtLink>
      </h2>
      <p class="description">{{ post.description }}</p>
      <div v-if="post.tags.length" class="tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { PortfolioPost } from "~/types/content";
import { formatDate } from "~/utils/content";

const props = defineProps<{
  post: PortfolioPost;
}>();

const cover = computed(() => props.post.gallery[0] || "");
</script>

<style scoped>
.media-link {
  display: block;
  overflow: hidden;
  background: var(--surface-muted);
  aspect-ratio: 16 / 9;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.description {
  color: var(--muted);
  line-height: 1.65;
}
</style>
