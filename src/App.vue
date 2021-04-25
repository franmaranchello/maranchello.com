<template>
  <v-app id="app">
    <v-main id="router">
      <router-view id="taskbar" name="menu" class="dark"> </router-view>
      <router-view
        id="content"
        name="main"
        class="overflow-y-auto"
      ></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
});
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;500&display=swap");
.v-application {
  font-family: "Poppins", sans-serif;
  font-weight: 100;
  .title {
    // To pin point specific classes of some components
    font-size: xx-large !important;
  }
}
</style>
