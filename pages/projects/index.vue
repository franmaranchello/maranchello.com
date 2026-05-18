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
      <label v-if="allTags.length" class="tag-filter">
        <span>Filter by tag</span>
        <select :value="selectedTag" @change="handleTagChange">
          <option value="">All tags</option>
          <option v-for="tag in allTags" :key="tag.name" :value="tag.name">
            {{ tag.name }} ({{ tag.count }})
          </option>
        </select>
      </label>
      <button v-if="hasFilters" class="button" type="button" @click="clearFilters">Clear</button>
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
import { PERSON_NAME, projectPath } from "~/utils/seo";

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
  await setSelectedTag(selectedTag.value === tag ? "" : tag);
};

const setSelectedTag = async (tag: string) => {
  selectedTag.value = tag;
  await router.replace({
    query: {
      ...route.query,
      tag: selectedTag.value || undefined,
    },
  });
};

const handleTagChange = async (event: Event) => {
  const select = event.target as HTMLSelectElement;
  await setSelectedTag(select.value);
};

const clearFilters = async () => {
  searchText.value = "";
  await setSelectedTag("");
};

watch(
  () => route.query.tag,
  (tag) => {
    selectedTag.value = queryTag(tag);
  }
);

const seo = useSiteSeo({
  title: "Projects",
  description:
    "Selected architecture, software, product, and technical projects by Francisco Maranchello.",
  path: "/projects",
});

useJsonLd(() => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${seo.canonical.value}#projects`,
  url: seo.canonical.value,
  name: `Projects by ${PERSON_NAME}`,
  description: seo.description.value,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: projects.value.length,
    itemListElement: projects.value.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${seo.siteUrl.value}${projectPath(project)}`,
      name: project.name,
    })),
  },
}));
</script>

<style scoped>
.toolbar {
  display: grid;
  align-items: flex-end;
  grid-template-columns: minmax(0, 1fr) minmax(180px, 260px) auto;
  gap: 12px;
  margin: 34px 0 26px;
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

.search,
.tag-filter {
  display: grid;
  gap: 6px;
}

.search span,
.tag-filter span {
  color: var(--muted);
  font-size: 0.86rem;
}

.search input,
.tag-filter select {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text);
  padding: 12px 16px;
  transition: border-color 180ms ease, box-shadow 180ms ease;
}

.tag-filter select {
  min-height: 46px;
  cursor: pointer;
}

.search input:focus,
.tag-filter select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 18%, transparent);
  outline: none;
}

@media (max-width: 640px) {
  .toolbar {
    grid-template-columns: 1fr;
  }
}
</style>
