<template>
  <v-container>
    <v-btn color="primary" @click="goProjects()">Projects</v-btn>
    <v-btn color="primary" @click="goAbout()">About</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Home",
  methods: {
    goProjects() {
      this.$router.push("projects");
    },
    goAbout() {
      this.$router.push("about");
    },
  },
});
</script>
