<template>
  <v-card
    class="mx-auto my-12"
    color="primary"
    style="cursor: arrow"
    max-width="400"
  >
    <v-img
      v-if="project.image != ''"
      :src="project.image"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="250px"
    >
      <v-card-title>{{ project.name }}</v-card-title>
    </v-img>
    <v-card-subtitle>{{ project.type }}</v-card-subtitle>
    <v-card-text>
      <div class="subtitle-1">
        {{ project.collection }}
      </div>
      <div>
        {{ project.description }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tags</v-card-title>

    <v-card-text>
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <v-chip v-for="tag in project.tags" :key="tag">{{ tag }}</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn block color="background" @click="seeMore()"> See more </v-btn>
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
  methods: {
    seeMore() {
      this.$emit("show-details", this.project);
    },
  },
});
</script>
