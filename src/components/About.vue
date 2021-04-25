<template>
  <v-container>
    <v-btn color="primary" @click="goHome()">Welcome to About</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "About",
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
});
</script>
