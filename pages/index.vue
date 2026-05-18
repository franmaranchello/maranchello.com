<template>
  <HomeLanding />
</template>

<script setup lang="ts">
import { getPublicStorageUrlFromBucket } from "~/utils/firebase";
import { DEFAULT_SEO_DESCRIPTION, SITE_NAME } from "~/utils/seo";

const runtimeConfig = useRuntimeConfig();
const portraitUrl = computed(() =>
  getPublicStorageUrlFromBucket(
    runtimeConfig.public.firebase.storageBucket,
    "project-assets/default/fran.jpg"
  )
);

useSiteSeo({
  title: SITE_NAME,
  description: DEFAULT_SEO_DESCRIPTION,
  image: () => portraitUrl.value,
  path: "/",
  type: "profile",
});
</script>
