<template>
  <div>
    <!-- <v-btn large @click.stop="drawer = !drawer"
      ><v-icon dark>mdi-menu</v-icon></v-btn
    > -->
    <v-navigation-drawer
      color="primary"
      dark
      permanent
      expand-on-hover
      absolute
      :mini-variant.sync="mini"
    >
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Snackbar",
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-home" },
      { title: "About", icon: "mdi-forum" },
    ],
    drawer: null,
    mini: true,
  }),
  methods: {
    expanded() {
      if (!this.mini) {
        this.$emit("snackbar-expanded");
      }
    },
  },
  computed: {
    get appVersion() {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const appVersion = require("../../package.json").version;
      return appVersion;
    },
  },
});
</script>
