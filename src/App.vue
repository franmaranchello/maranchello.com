<template>
  <v-app id="app">
    <snackbar id="menu" />
    <v-main id="router">
      <div class="d-flex" @snackbar-expanded.stop="displaceContent()">
        <router-view name="main"></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Snackbar from "./components/Snackbar.vue";

export default Vue.extend({
  components: { Snackbar },
  name: "App",
  methods: {
    route(name: string) {
      this.$router.push(name);
    },
    displaceContent(e: { className: string }) {
      e.className = "d-none";
    },
  },
});
</script>
<style lang="scss" scoped></style>
