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
        v-cloak
        v-if="getFilteredProjects().length > 0"
        v-show="displayToggle === 0 && selectedProject.name == undefined"
        :projects="getFilteredProjects()"
        @show-details="updateSelectedProject"
        @tag-filter="filterByTag"
      />
      <ProjectList
        v-cloak
        v-if="getFilteredProjects().length > 0"
        v-show="displayToggle === 1 && selectedProject.name == undefined"
        :projects="getFilteredProjects()"
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
      const projectCollection = await db.projects.orderBy("date", "desc").get();
      projectCollection.forEach((project) => {
        this.projectColl.push(project.data());
      });
    },
    getFilteredProjects(): Project[] {
      if (this.searchText == "" || this.searchText == null)
        return this.projectColl;
      else {
        return this.projectColl.filter((project: Project) => {
          return [
            project.name,
            project.type,
            project.description,
            ...project.tags,
            project.collection,
          ].some((field) =>
            field.toLowerCase().includes(this.searchText.toLowerCase().trim())
          );
        });
      }
    },
    filterByTag(tag: string) {
      this.searchText = tag;
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
