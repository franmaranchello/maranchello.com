<template>
  <v-slide-y-reverse-transition hide-on-leave>
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
  </v-slide-y-reverse-transition>
</template>

<script lang="ts">
import Vue from "vue";
import ProjectCard from "../components/browse/ProjectCard.vue";
import { Project } from "../types/project";

export default Vue.extend({
  name: "ProjectGrid",
  props: {
    projects: {
      type: Array,
      required: true,
    },
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
