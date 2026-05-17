<template>
  <section class="page">
    <p class="section-kicker">Writing</p>
    <h1 class="section-title">Blog</h1>
    <p class="section-copy">
      Essays and notes. You can also find the current feed on
      <a href="https://maranchello.substack.com/">Substack</a>.
    </p>

    <div v-if="pending" class="notice">Loading posts...</div>
    <div v-else-if="posts.length" class="grid posts-grid">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div v-else class="empty-state">
      No posts are available here yet.
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: posts, pending } = await usePosts();

useSeoMeta({
  title: "Blog | Francisco Maranchello",
  description: "Writing and notes by Francisco Maranchello.",
  ogTitle: "Blog | Francisco Maranchello",
});
</script>

<style scoped>
.posts-grid {
  margin-top: 34px;
}
</style>
