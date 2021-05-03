<template>
  <div>
    <v-container class="vo-container">
      <ControlBar
        v-show="selectedProject.name == undefined"
        class="mt-12"
        :searchText.sync="searchText"
        :displayToggle.sync="displayToggle"
      />
      <ProjectGrid
        v-if="projectColl.length > 0"
        v-show="displayToggle === 0 && selectedProject.name == undefined"
        :projects="projectColl"
        @show-details="updateSelectedProject"
      />
      <ProjectList
        v-if="projectColl.length > 0"
        v-show="displayToggle === 1 && selectedProject.name == undefined"
        :projects="projectColl"
        @show-details="updateSelectedProject"
      />
    </v-container>
    <Details
      class="mt-12"
      v-if="selectedProject.name != undefined"
      :project.sync="selectedProject"
      @close-details="closeDetails"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import ControlBar from "./ControlBar.vue";
import ProjectGrid from "../../views/ProjectGrid.vue";
import ProjectList from "../../views/ProjectList.vue";
import Details from "./Details.vue";
import { Project } from "@/types/project";
import db from "../../store/db";

export default Vue.extend({
  name: "Browse",
  components: {
    ControlBar,
    ProjectGrid,
    ProjectList,
    Details,
  },
  methods: {
    updateSelectedProject(project: Project) {
      this.selectedProject = project;
    },
    closeDetails() {
      this.selectedProject = {};
    },
    async getProjects() {
      const projectCollection = await db.projects.orderBy("name", "desc").get();
      projectCollection.forEach((project) => {
        this.projectColl.push(project.data());
      });
    },
  },
  data: () => ({
    selectedProject: {},
    searchText: "",
    displayToggle: 0,
    projectColl: [] as Project[],
  }),
  mounted() {
    this.getProjects();
  },
});
</script>
