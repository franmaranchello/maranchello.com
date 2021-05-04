<template>
  <div>
    <v-container class="vo-container">
      <BlogFeed
        v-cloak
        v-if="getFilteredPosts().length > 0"
        v-show="selectedPost.name == undefined"
        :posts="getFilteredPosts()"
        @show-details="updateSelectedPost"
        @tag-filter="filterByTag"
      />
    </v-container>
    <BlogDetails
      class="mt-12"
      v-if="selectedPost.name != undefined"
      :post.sync="selectedPost"
      @close-details="closeDetails"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import BlogFeed from "../components/browse/BlogFeed.vue";
import BlogDetails from "../components/browse/BlogDetails.vue";
import { Post } from "@/types/post";
import db from "../store/db";

export default Vue.extend({
  name: "Browse",
  components: {
    BlogFeed,
    BlogDetails,
  },
  methods: {
    updateSelectedPost(post: Post) {
      this.selectedPost = post;
    },
    closeDetails() {
      this.selectedPost = {};
    },
    async getPosts() {
      const postCollection = await db.posts.orderBy("date", "desc").get();
      postCollection.forEach((post) => {
        this.postColl.push(post.data());
      });
    },
    getFilteredPosts(): Post[] {
      if (this.searchText == "" || this.searchText == null)
        return this.postColl;
      else {
        return this.postColl.filter((post: Post) => {
          return [post.name, ...post.tags].some((field) =>
            field.toLowerCase().includes(this.searchText.toLowerCase().trim())
          );
        });
      }
    },
    filterByTag(tag: string) {
      this.searchText = tag;
    },
  },
  data: () => ({
    selectedPost: {},
    searchText: "",
    displayToggle: 0,
    postColl: [] as Post[],
  }),
  mounted() {
    this.getPosts();
  },
});
</script>
