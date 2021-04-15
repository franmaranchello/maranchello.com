<template>
  <div class="container">
    <v-container fluid>
      <v-row>
        <v-col v-for="project in projects" :key="project.name">
          <project-card :project="project"></project-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProjectCard from "../components/ProjectCard.vue";

export default Vue.extend({
  name: "Home",
  data: () => ({
    projects: [
      {
        name: "Project 1",
        type: "House",
        tags: ["Spacious", "Affordable", "New"],
        collection: "K. Hovnanian Competition",
        image:
          "https://khov2cachecdn.azureedge.net/azure/sitefinitylibraries/images/default-source/images/corp/k-hovnanian-homes-a-spot-images/new-home-images/68324_galloway-ridge_capstone_model-exteriors.jpg?sfvrsn=126c1984_0&build=1705&encoder=wic&useresizingpipeline=true&width=1200",
      },
      {
        name: "Project 2",
        type: "High Rise",
        tags: ["Luxury", "Good Community"],
        collection: "Portfolio",
        image:
          "https://khov2cachecdn.azureedge.net/azure/sitefinitylibraries/images/default-source/images/corp/k-hovnanian-homes-a-spot-images/new-home-images/68324_galloway-ridge_capstone_model-exteriors.jpg?sfvrsn=126c1984_0&build=1705&encoder=wic&useresizingpipeline=true&width=1200",
      },
      {
        name: "Project 3",
        type: "Development",
        tags: ["Good Location"],
        collection: "K. Hovnanian Homes",
        image:
          "https://khov2cachecdn.azureedge.net/azure/sitefinitylibraries/images/default-source/images/corp/k-hovnanian-homes-a-spot-images/new-home-images/68324_galloway-ridge_capstone_model-exteriors.jpg?sfvrsn=126c1984_0&build=1705&encoder=wic&useresizingpipeline=true&width=1200",
      },
      {
        name: "Project 4",
        type: "Development",
        tags: ["Good Location"],
        collection: "K. Hovnanian Homes",
        image:
          "https://khov2cachecdn.azureedge.net/azure/sitefinitylibraries/images/default-source/images/corp/k-hovnanian-homes-a-spot-images/new-home-images/68324_galloway-ridge_capstone_model-exteriors.jpg?sfvrsn=126c1984_0&build=1705&encoder=wic&useresizingpipeline=true&width=1200",
      },
      {
        name: "Project 5",
        type: "Development",
        tags: ["Good Location"],
        collection: "K. Hovnanian Homes",
        image:
          "https://khov2cachecdn.azureedge.net/azure/sitefinitylibraries/images/default-source/images/corp/k-hovnanian-homes-a-spot-images/new-home-images/68324_galloway-ridge_capstone_model-exteriors.jpg?sfvrsn=126c1984_0&build=1705&encoder=wic&useresizingpipeline=true&width=1200",
      },
      {
        name: "Project 6",
        type: "Development",
        tags: ["Good Location"],
        collection: "K. Hovnanian Homes",
        image:
          "https://khov2cachecdn.azureedge.net/azure/sitefinitylibraries/images/default-source/images/corp/k-hovnanian-homes-a-spot-images/new-home-images/68324_galloway-ridge_capstone_model-exteriors.jpg?sfvrsn=126c1984_0&build=1705&encoder=wic&useresizingpipeline=true&width=1200",
      },
    ],
  }),
  components: {
    ProjectCard,
  },
});
</script>
