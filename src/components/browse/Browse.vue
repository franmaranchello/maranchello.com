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
        v-show="displayToggle === 0 && selectedProject.name == undefined"
        :projects="projects"
        @show-details="updateSelectedProject"
      />
      <ProjectList
        v-show="displayToggle === 1 && selectedProject.name == undefined"
        :projects="projects"
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
// import firebase from "../../integrations/firebase";

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
  },
  data: () => ({
    selectedProject: {},
    // projectCollection: firebase.firestore().collection("projects"),
    searchText: "",
    displayToggle: 0,
    projects: [
      {
        name: "Casa Piana",
        type: "Architecture",
        tags: ["Visualization", "Single Family Home", "Design"],
        collection: "Visualization",
        description:
          "Casa Piana is a family residence in Córdoba, Argentina. It's born from a concept that starts with a rectangular, elevated volume and through different subtractions a path ranging through sub-spaces and internal patios is generated.",
        content: "Longer content",
        gallery: [
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
        ],
      },
      {
        name: "Project 2",
        type: "Architecture",
        tags: ["Visualization", "Single Family Home", "Design"],
        collection: "Visualization",
        description:
          "Casa Piana is a family residence in Córdoba, Argentina. It's born from a concept that starts with a rectangular, elevated volume and through different subtractions a path ranging through sub-spaces and internal patios is generated.",
        content: "Longer content",
        gallery: [
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
        ],
      },
      {
        name: "Project 3",
        type: "Architecture",
        tags: ["Visualization", "Single Family Home", "Design"],
        collection: "Visualization",
        description:
          "Casa Piana is a family residence in Córdoba, Argentina. It's born from a concept that starts with a rectangular, elevated volume and through different subtractions a path ranging through sub-spaces and internal patios is generated.",
        content: "Longer content",
        gallery: [
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
        ],
      },
      {
        name: "Project 4",
        type: "Architecture",
        tags: ["Visualization", "Single Family Home", "Design"],
        collection: "Visualization",
        description:
          "Casa Piana is a family residence in Córdoba, Argentina. It's born from a concept that starts with a rectangular, elevated volume and through different subtractions a path ranging through sub-spaces and internal patios is generated.",
        content: "Longer content",
        gallery: [
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
        ],
      },
      {
        name: "Project 5",
        type: "Architecture",
        tags: ["Visualization", "Single Family Home", "Design"],
        collection: "Visualization",
        description:
          "Casa Piana is a family residence in Córdoba, Argentina. It's born from a concept that starts with a rectangular, elevated volume and through different subtractions a path ranging through sub-spaces and internal patios is generated.",
        content: "Longer content",
        gallery: [
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
        ],
      },
      {
        name: "Project 6",
        type: "Architecture",
        tags: ["Visualization", "Single Family Home", "Design"],
        collection: "Visualization",
        description:
          "Casa Piana is a family residence in Córdoba, Argentina. It's born from a concept that starts with a rectangular, elevated volume and through different subtractions a path ranging through sub-spaces and internal patios is generated.",
        content: "Longer content",
        gallery: [
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
          "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
        ],
      },
    ] as Project[],
  }),
});
</script>
