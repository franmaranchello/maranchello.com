<template>
  <div>
    <v-container class="vo-container">
      <ControlBar
        class="mt-15"
        :searchText.sync="searchText"
        :displayToggle.sync="displayToggle"
      />
      <ProjectGrid
        v-if="displayToggle === 0"
        :projects="projects"
        @show-details="updateSelectedProject"
      />
    </v-container>
    <Details
      v-if="selectedProject.name != undefined"
      :project.sync="selectedProject"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import ControlBar from "./ControlBar.vue";
import ProjectGrid from "../../views/ProjectGrid.vue";
import Details from "./Details.vue";

export default Vue.extend({
  name: "Browse",
  components: {
    ControlBar,
    ProjectGrid,
    Details,
  },
  methods: {
    updateSelectedProject(project: Record<string, unknown>) {
      this.selectedProject = project;
    },
  },
  data: () => ({
    selectedProject: {},
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
        content: "",
        image:
          "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bc5e041c-3034-4a5c-879b-ffb66d2d56a1/Image24.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210425T231932Z&X-Amz-Expires=86400&X-Amz-Signature=3f5b889c5367d751f054f5f1ae83f4e83b2e848b63dc0819b479262603b6a90b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Image24.png%22",
      },
      {
        name: "Project 2",
        type: "Architecture",
        tags: ["Visualization", "Single Family Home", "Design"],
        collection: "Visualization",
        description:
          "Casa Piana is a family residence in Córdoba, Argentina. It's born from a concept that starts with a rectangular, elevated volume and through different subtractions a path ranging through sub-spaces and internal patios is generated.",
        content: "",
        image:
          "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bc5e041c-3034-4a5c-879b-ffb66d2d56a1/Image24.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210425T231932Z&X-Amz-Expires=86400&X-Amz-Signature=3f5b889c5367d751f054f5f1ae83f4e83b2e848b63dc0819b479262603b6a90b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Image24.png%22",
      },
      {
        name: "Project 3",
        type: "Architecture",
        tags: ["Visualization", "Single Family Home", "Design"],
        collection: "Visualization",
        description:
          "Casa Piana is a family residence in Córdoba, Argentina. It's born from a concept that starts with a rectangular, elevated volume and through different subtractions a path ranging through sub-spaces and internal patios is generated.",
        content: "",
        image:
          "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bc5e041c-3034-4a5c-879b-ffb66d2d56a1/Image24.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210425T231932Z&X-Amz-Expires=86400&X-Amz-Signature=3f5b889c5367d751f054f5f1ae83f4e83b2e848b63dc0819b479262603b6a90b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Image24.png%22",
      },
      {
        name: "Project 4",
        type: "Architecture",
        tags: ["Visualization", "Single Family Home", "Design"],
        collection: "Visualization",
        description:
          "Casa Piana is a family residence in Córdoba, Argentina. It's born from a concept that starts with a rectangular, elevated volume and through different subtractions a path ranging through sub-spaces and internal patios is generated.",
        content: "",
        image:
          "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bc5e041c-3034-4a5c-879b-ffb66d2d56a1/Image24.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210425T231932Z&X-Amz-Expires=86400&X-Amz-Signature=3f5b889c5367d751f054f5f1ae83f4e83b2e848b63dc0819b479262603b6a90b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Image24.png%22",
      },
      {
        name: "Project 5",
        type: "Architecture",
        tags: ["Visualization", "Single Family Home", "Design"],
        collection: "Visualization",
        description:
          "Casa Piana is a family residence in Córdoba, Argentina. It's born from a concept that starts with a rectangular, elevated volume and through different subtractions a path ranging through sub-spaces and internal patios is generated.",
        content: "",
        image:
          "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bc5e041c-3034-4a5c-879b-ffb66d2d56a1/Image24.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210425T231932Z&X-Amz-Expires=86400&X-Amz-Signature=3f5b889c5367d751f054f5f1ae83f4e83b2e848b63dc0819b479262603b6a90b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Image24.png%22",
      },
      {
        name: "Project 6",
        type: "Architecture",
        tags: ["Visualization", "Single Family Home", "Design"],
        collection: "Visualization",
        description:
          "Casa Piana is a family residence in Córdoba, Argentina. It's born from a concept that starts with a rectangular, elevated volume and through different subtractions a path ranging through sub-spaces and internal patios is generated.",
        content: "",
        image:
          "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bc5e041c-3034-4a5c-879b-ffb66d2d56a1/Image24.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210425T231932Z&X-Amz-Expires=86400&X-Amz-Signature=3f5b889c5367d751f054f5f1ae83f4e83b2e848b63dc0819b479262603b6a90b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Image24.png%22",
      },
    ],
  }),
});
</script>
