<template>
  <v-slide-y-reverse-transition hide-on-leave>
    <v-container>
      <v-row>
        <v-col v-for="post in posts" :key="post.name">
          <blog-card
            :post="post"
            @show-details="updateSelectedPost"
            @tag-filter="filterByTag"
          ></blog-card>
        </v-col>
      </v-row>
    </v-container>
  </v-slide-y-reverse-transition>
</template>

<script lang="ts">
import Vue from "vue";
import BlogCard from "./BlogCard.vue";
import { Post } from "../../types/post";

export default Vue.extend({
  name: "BlogView",
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    updateSelectedPost(blogPost: Post) {
      this.$emit("show-details", blogPost);
    },
    filterByTag(tag: string) {
      this.$emit("tag-filter", tag);
    },
  },
  components: {
    BlogCard,
  },
});
</script>
