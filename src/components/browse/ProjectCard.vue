<template>
  <v-slide-y-transition>
    <v-card
      class="mx-auto my-12"
      color="primary"
      style="cursor: arrow"
      max-width="500"
    >
      <v-img
        v-cloak
        v-if="project.gallery && project.gallery.length > 0"
        :src="project.gallery[0]"
        :lazy-src="defaultImage"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="250px"
      >
        <v-card-title>{{ project.name }}</v-card-title>
      </v-img>
      <v-card-subtitle
        >{{ project.type }} - {{ project.collection }}</v-card-subtitle
      >
      <v-card-text>
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
  </v-slide-y-transition>
</template>

<script lang="ts">
import Vue from "vue";
import { Project } from "@/types/project";

export default Vue.extend({
  name: "ProjectCard",
  data: () => ({
    defaultImage:
      "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
  }),
  props: {
    project: {
      type: Object as () => Project,
      required: true,
    },
  },
  methods: {
    seeMore() {
      this.$emit("show-details", this.project);
    },
  },
});
</script>
