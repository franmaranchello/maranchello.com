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
        name: "Project 1",
        type: "Single Family Home",
        tags: ["Spacious", "Affordable", "New"],
        collection: "K. Hovnanian Competition",
        description:
          "Starting from Mid $300s. Amenities: Barbecue Area, Dog Park, Golf, Fitness Center, Olympic Pool, Spa.",
        image:
          "https://khov2cachecdn.azureedge.net/azure/sitefinitylibraries/images/default-source/images/corp/k-hovnanian-homes-a-spot-images/new-home-images/68324_galloway-ridge_capstone_model-exteriors.jpg?sfvrsn=126c1984_0&build=1705&encoder=wic&useresizingpipeline=true&width=1200",
      },
      {
        name: "Project 2",
        type: "Detached Condos",
        tags: ["Luxury", "Good Community"],
        collection: "Portfolio",
        description:
          "Starting from Mid $300s. Amenities: Barbecue Area, Dog Park, Golf, Fitness Center, Olympic Pool, Spa.",
        image:
          "https://khov2cachecdn.azureedge.net/azure/sitefinitylibraries/images/default-source/images/corp/k-hovnanian-homes-a-spot-images/new-home-images/68324_galloway-ridge_capstone_model-exteriors.jpg?sfvrsn=126c1984_0&build=1705&encoder=wic&useresizingpipeline=true&width=1200",
      },
      {
        name: "Project 3",
        type: "High Rise",
        tags: ["Good Location"],
        collection: "K. Hovnanian Homes",
        description:
          "Starting from Mid $300s. Amenities: Barbecue Area, Dog Park, Golf, Fitness Center, Olympic Pool, Spa.",
        image:
          "https://khov2cachecdn.azureedge.net/azure/sitefinitylibraries/images/default-source/images/corp/k-hovnanian-homes-a-spot-images/new-home-images/68324_galloway-ridge_capstone_model-exteriors.jpg?sfvrsn=126c1984_0&build=1705&encoder=wic&useresizingpipeline=true&width=1200",
      },
      {
        name: "Project 4",
        type: "Development",
        tags: ["Good Location"],
        collection: "K. Hovnanian Homes",
        description:
          "Starting from Mid $300s. Amenities: Barbecue Area, Dog Park, Golf, Fitness Center, Olympic Pool, Spa.",
        image:
          "https://khov2cachecdn.azureedge.net/azure/sitefinitylibraries/images/default-source/images/corp/k-hovnanian-homes-a-spot-images/new-home-images/68324_galloway-ridge_capstone_model-exteriors.jpg?sfvrsn=126c1984_0&build=1705&encoder=wic&useresizingpipeline=true&width=1200",
      },
      {
        name: "Project 5",
        type: "Development",
        tags: ["Good Location"],
        collection: "K. Hovnanian Homes",
        description:
          "Starting from Mid $300s. Amenities: Barbecue Area, Dog Park, Golf, Fitness Center, Olympic Pool, Spa.",
        image:
          "https://khov2cachecdn.azureedge.net/azure/sitefinitylibraries/images/default-source/images/corp/k-hovnanian-homes-a-spot-images/new-home-images/68324_galloway-ridge_capstone_model-exteriors.jpg?sfvrsn=126c1984_0&build=1705&encoder=wic&useresizingpipeline=true&width=1200",
      },
      {
        name: "Project 6",
        type: "Development",
        tags: ["Good Location"],
        collection: "K. Hovnanian Homes",
        description:
          "Starting from Mid $300s. Amenities: Barbecue Area, Dog Park, Golf, Fitness Center, Olympic Pool, Spa.",
        image:
          "https://khov2cachecdn.azureedge.net/azure/sitefinitylibraries/images/default-source/images/corp/k-hovnanian-homes-a-spot-images/new-home-images/68324_galloway-ridge_capstone_model-exteriors.jpg?sfvrsn=126c1984_0&build=1705&encoder=wic&useresizingpipeline=true&width=1200",
      },
      {
        name: "Project 7",
        type: "Development",
        tags: ["Good Location"],
        collection: "K. Hovnanian Homes",
        description:
          "Starting from Mid $300s. Amenities: Barbecue Area, Dog Park, Golf, Fitness Center, Olympic Pool, Spa.",
        image:
          "https://khov2cachecdn.azureedge.net/azure/sitefinitylibraries/images/default-source/images/corp/k-hovnanian-homes-a-spot-images/new-home-images/68324_galloway-ridge_capstone_model-exteriors.jpg?sfvrsn=126c1984_0&build=1705&encoder=wic&useresizingpipeline=true&width=1200",
      },
      {
        name: "Project 8",
        type: "Development",
        tags: ["Good Location"],
        collection: "K. Hovnanian Homes",
        description:
          "Starting from Mid $300s. Amenities: Barbecue Area, Dog Park, Golf, Fitness Center, Olympic Pool, Spa.",
        image:
          "https://khov2cachecdn.azureedge.net/azure/sitefinitylibraries/images/default-source/images/corp/k-hovnanian-homes-a-spot-images/new-home-images/68324_galloway-ridge_capstone_model-exteriors.jpg?sfvrsn=126c1984_0&build=1705&encoder=wic&useresizingpipeline=true&width=1200",
      },
    ],
  }),
});
</script>
