<template>
  <div>
    <v-app-bar color="primary" dark height="60" app elevate-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-app-bar-title
        class="text-uppercase flex text-center mr-14"
        v-text="currentRouteName"
      >
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
          v-for="item in getItems()"
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
          <v-switch
            label="Dark mode"
            color="orange"
            v-model="dark"
            @change="toggleDark()"
          />
          <v-btn block @click="adminClick()"> {{ getAdminButton() }} </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
import "firebase/auth";

export default Vue.extend({
  name: "Menu",
  data: () => ({
    drawer: false,
    dark: false,
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
    getItems(): { title: string; icon: string }[] {
      let items = [
        { title: "Home", icon: "mdi-home-city" },
        { title: "About", icon: "mdi-account" },
        { title: "Projects", icon: "mdi-account" },
        { title: "Blog", icon: "mdi-account-group-outline" },
      ];
      if (firebase.auth().currentUser) {
        items.push({ title: "Admin", icon: "mdi-tune" });
      }
      return items;
    },
    route(name: string) {
      let route = name.replace(/\s/g, "").toLowerCase();
      if (this.$router.currentRoute.name?.toLowerCase() != route)
        this.$router.push(`/${route}`);
    },
    adminClick() {
      let user = firebase.auth().currentUser;
      if (!user) this.route("login");
      else
        firebase
          .auth()
          .signOut()
          .then(() => this.route(""));
    },
    getAdminButton() {
      if (firebase.auth().currentUser) {
        return "Log Out";
      } else return "Admin";
    },
    toggleDark() {
      this.$emit("toggle-change", this.dark);
    },
    setTheme() {
      this.dark = this.$vuetify.theme.dark;
    },
  },
  mounted() {
    this.setTheme();
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
