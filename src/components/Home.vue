<template>
  <v-container>
    <v-btn color="primary" @click="goAbout()">Welcome Home</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Home",
  methods: {
    goAbout() {
      this.$router.push("about");
    },
  },
});
</script>
