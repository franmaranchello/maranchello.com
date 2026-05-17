<template>
  <section class="page">
    <p class="section-kicker">Admin</p>
    <h1 class="section-title">Create Post</h1>

    <AdminGuard>
      <form class="form" @submit.prevent="submitPost">
        <label class="field">
          <span>Name</span>
          <input v-model="form.name" required />
        </label>
        <label class="field">
          <span>Date</span>
          <input v-model="form.date" type="date" required />
        </label>
        <label class="field">
          <span>Tags, separated by commas</span>
          <input v-model="tags" placeholder="essay, product, architecture" />
        </label>
        <label class="field">
          <span>Description</span>
          <input v-model="form.description" required />
        </label>
        <label class="field">
          <span>Content HTML</span>
          <textarea v-model="form.content" />
        </label>
        <label class="field">
          <span>Images</span>
          <input type="file" accept="image/*" multiple @change="setFiles" />
        </label>

        <div v-if="message" class="notice">{{ message }}</div>
        <button class="button" type="submit" :disabled="saving">
          {{ saving ? "Creating..." : "Create post" }}
        </button>
      </form>
    </AdminGuard>
  </section>
</template>

<script setup lang="ts">
const today = new Date().toISOString().slice(0, 10);
const tags = ref("");
const files = ref<File[]>([]);
const saving = ref(false);
const message = ref("");
const form = reactive({
  name: "",
  date: today,
  description: "",
  content: "",
});

const parsedTags = computed(() =>
  tags.value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
);

const setFiles = (event: Event) => {
  const input = event.target as HTMLInputElement;
  files.value = Array.from(input.files || []);
};

const submitPost = async () => {
  saving.value = true;
  message.value = "";

  try {
    const id = await createPost({
      ...form,
      tags: parsedTags.value,
      files: files.value,
    });
    message.value = "Post created.";
    await navigateTo(`/blog/${id}`);
  } catch (error) {
    console.error(error);
    message.value = "Post creation failed. Check the console for details.";
  } finally {
    saving.value = false;
  }
};

useSeoMeta({
  title: "Create Post | Francisco Maranchello",
  robots: "noindex,nofollow",
});
</script>
