<template>
  <div class="container">
    <v-container fluid>
      <v-row dense>
        <v-col v-for="project in projects" :key="project.name">
          <project-card
            :project="project"
            @show-details="updateSelectedProject"
          ></project-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Project } from "../types/Project";
import Vue from "vue";
import ProjectCard from "../components/browse/ProjectCard.vue";

export default Vue.extend({
  name: "ProjectGrid",
  props: {
    projects: Array,
  },
  methods: {
    updateSelectedProject(project: Project) {
      this.$emit("show-details", project);
    },
  },
  components: {
    ProjectCard,
  },
});
</script>
