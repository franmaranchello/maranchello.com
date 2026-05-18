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
      <button v-if="hasFilters" class="button" type="button" @click="clearFilters">Clear</button>
    </div>

    <div v-if="allTags.length" class="filter-panel" aria-label="Project tags">
      <button
        v-for="tag in allTags"
        :key="tag.name"
        class="tag filter-tag"
        :class="{ active: tag.name === selectedTag }"
        type="button"
        :aria-pressed="tag.name === selectedTag"
        @click="selectTag(tag.name)"
      >
        <span>{{ tag.name }}</span>
        <span class="tag-count">{{ tag.count }}</span>
      </button>
    </div>

    <p class="result-summary" aria-live="polite">
      {{ resultSummary }}
    </p>

    <div v-if="pending" class="notice">Loading projects...</div>
    <TransitionGroup v-else-if="filteredProjects.length" class="grid project-grid" name="project-list" tag="div">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.id"
        :active-tag="selectedTag"
        :project="project"
        @tag="selectTag"
      />
    </TransitionGroup>
    <div v-else class="empty-state">
      No projects match the current search.
    </div>
  </section>
</template>

<script setup lang="ts">
const searchText = ref("");
const route = useRoute();
const router = useRouter();
const queryTag = (tag: unknown) => (Array.isArray(tag) ? String(tag[0] || "") : String(tag || ""));
const selectedTag = ref(queryTag(route.query.tag));
const { data: projects, pending } = await useProjects();

const allTags = computed(() => {
  const counts = new Map<string, number>();

  for (const project of projects.value) {
    for (const tag of project.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ count, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

const filteredProjects = computed(() => {
  const query = searchText.value.trim().toLowerCase();

  return projects.value.filter((project) => {
    const matchesTag = selectedTag.value ? project.tags.includes(selectedTag.value) : true;
    const matchesQuery = query
      ? [
          project.name,
          project.type,
          project.collection,
          project.description,
          ...project.tags,
        ].some((field) => field.toLowerCase().includes(query))
      : true;

    return matchesTag && matchesQuery;
  });
});

const hasFilters = computed(() => Boolean(searchText.value || selectedTag.value));

const resultSummary = computed(() => {
  const count = filteredProjects.value.length;
  const noun = count === 1 ? "project" : "projects";

  if (selectedTag.value && searchText.value) {
    return `${count} ${noun} tagged "${selectedTag.value}" matching "${searchText.value}".`;
  }

  if (selectedTag.value) {
    return `${count} ${noun} tagged "${selectedTag.value}".`;
  }

  if (searchText.value) {
    return `${count} ${noun} matching "${searchText.value}".`;
  }

  return `${count} ${noun}.`;
});

const selectTag = async (tag: string) => {
  selectedTag.value = selectedTag.value === tag ? "" : tag;
  await router.replace({
    query: {
      ...route.query,
      tag: selectedTag.value || undefined,
    },
  });
};

const clearFilters = async () => {
  searchText.value = "";
  selectedTag.value = "";
  await router.replace({
    query: {
      ...route.query,
      tag: undefined,
    },
  });
};

watch(
  () => route.query.tag,
  (tag) => {
    selectedTag.value = queryTag(tag);
  }
);

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

.filter-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: -8px 0 18px;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.filter-tag:hover,
.filter-tag.active {
  border-color: var(--primary);
  background: var(--primary);
  color: var(--surface);
  transform: translateY(-1px);
}

.tag-count {
  display: inline-grid;
  min-width: 22px;
  height: 22px;
  place-items: center;
  border-radius: 999px;
  background: color-mix(in srgb, currentColor 12%, transparent);
  font-family: var(--mono-font);
  font-size: 0.72rem;
}

.result-summary {
  margin: 0 0 18px;
  color: var(--muted);
  font-size: 0.94rem;
}

.project-grid {
  position: relative;
}

.project-list-move,
.project-list-enter-active,
.project-list-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.project-list-enter-from,
.project-list-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

.project-list-leave-active {
  position: absolute;
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
