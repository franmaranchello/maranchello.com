<template>
  <section class="page">
    <p class="section-kicker">Selected Work</p>
    <h1 class="section-title">Projects</h1>
    <p class="section-copy">
      Architecture, software, product experiments, and technical explorations.
    </p>

    <div class="toolbar">
      <label class="search">
        <span>Search projects</span>
        <input v-model="searchText" type="search" placeholder="Search by name, tag, type, or collection" />
      </label>
      <button v-if="searchText" class="button" type="button" @click="searchText = ''">Clear</button>
    </div>

    <div v-if="pending" class="notice">Loading projects...</div>
    <div v-else-if="filteredProjects.length" class="grid">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.id"
        :project="project"
        @tag="searchText = $event"
      />
    </div>
    <div v-else class="empty-state">
      No projects match the current search.
    </div>
  </section>
</template>

<script setup lang="ts">
const searchText = ref("");
const { data: projects, pending } = await useProjects();

const filteredProjects = computed(() => {
  const query = searchText.value.trim().toLowerCase();
  if (!query) return projects.value;

  return projects.value.filter((project) =>
    [
      project.name,
      project.type,
      project.collection,
      project.description,
      ...project.tags,
    ].some((field) => field.toLowerCase().includes(query))
  );
});

useSeoMeta({
  title: "Projects | Francisco Maranchello",
  description:
    "Selected architecture, software, product, and technical projects by Francisco Maranchello.",
  ogTitle: "Projects | Francisco Maranchello",
});
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin: 34px 0 26px;
}

.search {
  display: grid;
  flex: 1;
  gap: 6px;
}

.search span {
  color: var(--muted);
  font-size: 0.86rem;
}

.search input {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text);
  padding: 12px 16px;
}

@media (max-width: 640px) {
  .toolbar {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
