<template>
  <v-slide-y-transition hide-on-leave>
    <v-card id="details-container" class="ma-8" outlined>
      <v-carousel
        v-if="project.gallery && project.gallery.length > 0"
        :src="project.gallery[0]"
        :lazy-src="defaultImage"
        max-height="15%"
      >
        <v-carousel-item
          v-for="(item, i) in project.gallery"
          :key="i"
          :src="item" />
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row> </template
      ></v-carousel>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="mb-4 overline">
            {{ project.type }} - {{ project.collection }} -
            {{ project.date.toDate().getFullYear() }}
          </div>
          <v-list-item-title class="mb-1">
            {{ project.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ project.description }}</v-list-item-subtitle>
          <v-list-item-content
            ><span v-html="project.content"
          /></v-list-item-content>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded @click="callClose"> Back </v-btn>
      </v-card-actions>
    </v-card>
  </v-slide-y-transition>
</template>

<script lang="ts">
import Vue from "vue";
import { Project } from "../../types/project";

export default Vue.extend({
  name: "Details",
  data: () => ({
    defaultImage:
      "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
    imgIndex: null,
  }),
  props: {
    project: {
      type: Object as () => Project,
      required: true,
    },
  },
  methods: {
    callClose() {
      this.$emit("close-details");
    },
  },
});
</script>
