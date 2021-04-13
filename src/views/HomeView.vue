<template>
  <v-container class="home">
    <home />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Home from "../components/Home.vue";

export default Vue.extend({
  name: "HomeView",
  components: {
    Home,
  },
});
</script>
