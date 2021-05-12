<template>
  <v-slide-y-transition hide-on-leave>
    <v-card id="details-container" class="ma-8" outlined>
      <v-carousel
        v-if="post.gallery && post.gallery.length > 0"
        :src="post.gallery[0]"
        :lazy-src="defaultImage"
        max-height="15%"
      >
        <v-carousel-item
          v-for="(item, i) in post.gallery"
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
          <v-chip-group active-class="deep-purple accent-4 white--text" column>
            <v-chip v-for="tag in post.tags" :key="tag">{{ tag }}</v-chip>
          </v-chip-group>
          <v-list-item-title class="mb-1">
            {{ post.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{
            post.date.toDate().toDateString()
          }}</v-list-item-subtitle>
          <v-spacer />
          <v-list-item-subtitle>{{ post.description }}</v-list-item-subtitle>
          <v-list-item-content
            ><span v-html="post.content"
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
import { Post } from "../../types/post";

export default Vue.extend({
  name: "BlogDetails",
  data: () => ({
    defaultImage:
      "https://tecnne.com/wp-content/uploads/2020/02/OMA-Gwanggyo-tecnne....jpg",
    imgIndex: null,
  }),
  props: {
    post: {
      type: Object as () => Post,
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
