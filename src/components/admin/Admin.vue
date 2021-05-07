<template>
  <v-slide-y-transition hide-on-leave>
    <v-container fluid>
      <v-spacer></v-spacer>
      <v-row align="center" justify="center" class="ma-8">
        <div id="name">Manage Content</div>
      </v-row>
      <v-spacer></v-spacer>
      <v-row align="center" justify="center">
        <v-btn
          outlined
          class="ma-8"
          width="100"
          color="primary"
          @click="route('admin/posts')"
          >Posts</v-btn
        >
        <v-btn
          outlined
          class="ma-8"
          width="100"
          color="primary"
          @click="route('admin/projects')"
          >Projects</v-btn
        >
      </v-row>
      <v-spacer></v-spacer>
    </v-container>
  </v-slide-y-transition>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Admin",
  methods: {
    route(name: string) {
      if (this.$router.currentRoute.name?.toLowerCase() != name)
        this.$router.push(name);
    },
  },
});
</script>
<style lang="scss" scoped>
#name {
  font-family: "Poppins", sans-serif;
  font-weight: 200;
  font-size: xx-large;
}
</style>
