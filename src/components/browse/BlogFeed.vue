<template>
  <v-slide-y-reverse-transition hide-on-leave>
    <div class="container">
      <v-container fluid>
        <v-row dense>
          <v-col v-for="post in posts" :key="post.name">
            <blog-card
              :post="post"
              @show-details="updateSelectedPost"
            ></blog-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
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
  },
  components: {
    BlogCard,
  },
});
</script>
