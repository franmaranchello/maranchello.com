<template>
  <v-container class="about">
    <about />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import About from "../components/About.vue";

export default Vue.extend({
  name: "AboutView",
  components: {
    About,
  },
});
</script>
