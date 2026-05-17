<template>
  <article class="page detail-page">
    <NuxtLink class="button" to="/blog">Back to blog</NuxtLink>

    <template v-if="post">
      <p class="section-kicker">{{ formatDate(post.date) }}</p>
      <h1 class="section-title">{{ post.name }}</h1>
      <p class="section-copy">{{ post.description }}</p>

      <div v-if="post.gallery.length" class="gallery">
        <img v-for="image in post.gallery" :key="image" :src="image" :alt="post.name" loading="lazy" />
      </div>

      <div v-if="post.tags.length" class="tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>

      <div v-if="post.content" class="rich-content" v-html="post.content" />
    </template>

    <div v-else class="empty-state">Post not found.</div>
  </article>
</template>

<script setup lang="ts">
import { fetchPost } from "~/composables/usePortfolioContent";
import { formatDate } from "~/utils/content";

const route = useRoute();
const id = computed(() => String(route.params.id || ""));
const { data: post } = await useAsyncData(`post-${id.value}`, () => fetchPost(id.value));

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

useSeoMeta({
  title: () => `${post.value?.name || "Post"} | Francisco Maranchello`,
  description: () => post.value?.description || "Post by Francisco Maranchello.",
  ogTitle: () => post.value?.name || "Blog | Francisco Maranchello",
  ogDescription: () => post.value?.description || "Post by Francisco Maranchello.",
  ogImage: () => post.value?.gallery[0] || undefined,
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
