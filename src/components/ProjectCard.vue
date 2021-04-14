<template>
  <v-card
    class="mx-auto"
    color="primary"
    style="cursor: pointer"
    max-height="350"
    max-width="250"
    width="auto"
  >
    <v-img
      :src="project.image"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.15), rgba(0,0,0,.5)"
      height="250px"
    >
      <v-card-title>{{ project.name }}</v-card-title>
    </v-img>
    <v-card-subtitle>{{ project.type }}</v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ProjectCard",
  props: {
    project: Object,
  },
});
</script>
