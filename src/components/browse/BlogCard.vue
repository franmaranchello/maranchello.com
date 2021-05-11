<template>
  <v-slide-y-transition>
    <v-card class="mx-auto my-12" color="primary" style="cursor: arrow">
      <v-img
        v-cloak
        v-if="post.gallery && post.gallery.length > 0"
        :src="post.gallery[0]"
        :lazy-src="defaultImage"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="250px"
      >
        <v-card-title>{{ post.name }}</v-card-title>
      </v-img>
      <v-card-text>
        <div>
          {{ post.description }}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Tags</v-card-title>

      <v-card-text>
        <v-chip-group active-class="deep-purple accent-4 white--text" column>
          <v-chip
            v-for="tag in post.tags"
            :key="tag"
            filter
            filter-icon="mdi-close"
            @input="filterByTag"
            @click="updateFilter(tag)"
            >{{ tag }}</v-chip
          >
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
import { Post } from "@/types/post";

export default Vue.extend({
  name: "ProjectCard",
  data: () => ({
    defaultImage:
      "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
    currentFilter: "",
  }),
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  methods: {
    seeMore() {
      this.$emit("show-details", this.post);
    },
    updateFilter(tag: string) {
      this.currentFilter = tag;
    },
    filterByTag(active: boolean) {
      if (active)
        setTimeout(() => this.$emit("tag-filter", this.currentFilter), 10);
      else {
        this.$emit("tag-filter", "");
      }
    },
  },
});
</script>
