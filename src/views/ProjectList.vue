<template>
  <v-slide-y-reverse-transition hide-on-leave>
    <div class="container">
      <v-list outlined two-line subheader class="mt-15">
        <v-list-item three-line v-for="(project, i) in projects" :key="i"
          ><v-list-item-avatar left width="100" height="100">
            <v-img
              v-if="project.gallery && project.gallery.length > 0"
              :src="project.gallery[0]"
              :lazy-src="defaultImage"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ project.name }}
            </v-list-item-title>
            <div class="overline grey--text">
              {{ project.type }} - {{ project.collection }}
            </div>
            <v-list-item-subtitle class="ma-2">{{
              project.description
            }}</v-list-item-subtitle>
            <v-divider
              class="mt-2"
              v-if="projects.indexOf(project) < projects.length - 1"
            />
          </v-list-item-content>
          <v-list-item-action-text>
            <v-btn block color="secondary" @click="seeMore(project)">
              <div class="black--text">See more</div>
            </v-btn>
          </v-list-item-action-text>
        </v-list-item>
      </v-list>
    </div>
  </v-slide-y-reverse-transition>
</template>

<script lang="ts">
import Vue from "vue";
import { Project } from "../types/project";

export default Vue.extend({
  name: "ProjectList",
  data: () => ({
    defaultImage:
      "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
  }),
  props: {
    projects: {
      type: Array,
      required: true,
    },
  },
  methods: {
    seeMore(project: Project) {
      this.$emit("show-details", project);
    },
  },
});
</script>
