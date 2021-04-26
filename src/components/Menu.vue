<template>
  <div>
    <v-app-bar color="primary" dark height="60" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-app-bar-title class="text-uppercase" v-text="currentRouteName">
      </v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer
      id="menu"
      color="primary"
      dark
      v-model="drawer"
      :height="height"
      temporary
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="route(item.title)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div v-if="drawer" class="pa-2">
          <v-btn block @click="login()"> Admin </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Menu",
  data: () => ({
    drawer: false,
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "About", icon: "mdi-account" },
      { title: "Projects", icon: "mdi-account" },
      { title: "Blog", icon: "mdi-account-group-outline" },
    ],
  }),
  computed: {
    height() {
      return window.innerHeight;
    },
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    route(name: string) {
      this.$router.push(name);
    },
    login() {
      this.route("login");
    },
  },
});
</script>
<style lang="scss" scoped>
#menu {
  position: fixed;
  top: 0px !important;
  bottom: 0 !important;
  height: unset !important;
  z-index: 100;
}
</style>
