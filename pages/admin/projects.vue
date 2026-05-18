<template>
  <section class="page">
    <p class="section-kicker">Admin</p>
    <h1 class="section-title">Create Project</h1>

    <AdminGuard>
      <form class="form" @submit.prevent="submitProject">
        <label class="field">
          <span>Name</span>
          <input v-model="form.name" required />
        </label>
        <label class="field">
          <span>Type</span>
          <input v-model="form.type" required />
        </label>
        <label class="field">
          <span>Date</span>
          <input v-model="form.date" type="date" required />
        </label>
        <label class="field">
          <span>Tags, separated by commas</span>
          <input v-model="tags" placeholder="software, architecture, product" />
        </label>
        <label class="field">
          <span>Collection</span>
          <input v-model="form.collection" />
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
          {{ saving ? "Creating..." : "Create project" }}
        </button>
      </form>

      <form class="form backfill-form" @submit.prevent="submitGalleryBackfill">
        <h2>Attach images to an existing project</h2>
        <label class="field">
          <span>Firestore project ID</span>
          <input v-model="backfill.projectId" placeholder="S5a4SvaeUQb4DOsjoIyb" required />
        </label>
        <label class="field">
          <span>Images</span>
          <input type="file" accept="image/*" multiple required @change="setBackfillFiles" />
        </label>

        <div v-if="backfill.message" class="notice">{{ backfill.message }}</div>
        <button class="button" type="submit" :disabled="backfill.saving">
          {{ backfill.saving ? "Uploading..." : "Attach images" }}
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
const backfill = reactive({
  files: [] as File[],
  message: "",
  projectId: "",
  saving: false,
});
const form = reactive({
  name: "",
  type: "",
  date: today,
  collection: "",
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

const setBackfillFiles = (event: Event) => {
  const input = event.target as HTMLInputElement;
  backfill.files = Array.from(input.files || []);
};

const submitProject = async () => {
  saving.value = true;
  message.value = "";

  try {
    const id = await createProject({
      ...form,
      tags: parsedTags.value,
      files: files.value,
    });
    message.value = "Project created.";
    await navigateTo(`/projects/${id}`);
  } catch (error) {
    console.error(error);
    message.value = "Project creation failed. Check the console for details.";
  } finally {
    saving.value = false;
  }
};

const submitGalleryBackfill = async () => {
  backfill.saving = true;
  backfill.message = "";

  try {
    const uploaded = await appendProjectGallery(backfill.projectId, backfill.files);
    backfill.message = uploaded.length
      ? `Attached ${uploaded.length} image${uploaded.length === 1 ? "" : "s"}.`
      : "No images selected.";
  } catch (error) {
    console.error(error);
    backfill.message = "Image upload failed. Check the console for details.";
  } finally {
    backfill.saving = false;
  }
};

useSeoMeta({
  title: "Create Project | Francisco Maranchello",
  robots: "noindex,nofollow",
});
</script>

<style scoped>
.backfill-form {
  margin-top: 48px;
  border-top: 1px solid var(--line);
  padding-top: 32px;
}

.backfill-form h2 {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 600;
}
</style>
