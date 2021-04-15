<template>
  <v-card
    class="mx-auto my-12"
    color="primary"
    style="cursor: arrow"
    max-width="800"
  >
    <v-img
      :src="project.image"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="250px"
    >
      <v-card-title>{{ project.name }}</v-card-title>
    </v-img>
    <v-card-subtitle>{{ project.type }}</v-card-subtitle>
    <v-card-text>
      <div>
        {{ project.collection }}
      </div>
      <div>
        Small plates, salads & sandwiches - an intimate setting with 12 indoor
        seats plus patio seating.
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tags</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-grey accent-4 white--text"
        column
      >
        <v-chip light v-for="tag in project.tags" :key="tag">{{ tag }}</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn color="background" block @click="seeMore()"> See more </v-btn>
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
