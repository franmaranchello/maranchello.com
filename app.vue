<template>
  <div>
    <SiteHeader />
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "",
  },
});

useSeoMeta({
  title: "Francisco Maranchello",
  description:
    "Personal website and portfolio for Francisco Maranchello, an architect, software developer, and entrepreneur.",
  ogTitle: "Francisco Maranchello",
  ogSiteName: "Francisco Maranchello",
  ogType: "website",
  robots: "index,follow",
});
</script>
