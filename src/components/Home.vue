<template>
  <v-container fluid>
    <v-spacer></v-spacer>
    <v-row align="center" justify="center" class="ma-8">
      <v-avatar size="250">
        <v-img src="../resources/fm.png"></v-img>
      </v-avatar>
    </v-row>
    <v-row align="center" justify="center" class="ma-8">
      <div id="name">Francisco Maranchello</div>
    </v-row>
    <v-spacer></v-spacer>
    <v-row align="center" justify="center">
      <v-btn
        outlined
        class="ma-8"
        width="100"
        color="primary"
        @click="route('about')"
        >About</v-btn
      >
      <v-btn
        outlined
        class="ma-8"
        width="100"
        color="primary"
        @click="route('projects')"
        >Projects</v-btn
      >
      <v-btn
        outlined
        class="ma-8"
        width="100"
        color="primary"
        @click="route('blog')"
        >Blog</v-btn
      >
    </v-row>
    <v-spacer></v-spacer>
    <v-row align="center" justify="center">
      <v-btn
        class="ma-8"
        fab
        dark
        small
        color="primary"
        href="https://www.instagram.com/franmaranchello/"
        target="_blank"
      >
        <v-icon color="background"> mdi-instagram </v-icon>
      </v-btn>
      <v-btn
        class="ma-8"
        fab
        dark
        small
        color="primary"
        href="https://www.linkedin.com/in/franmaranchello/"
        target="_blank"
      >
        <v-icon color="background"> mdi-linkedin </v-icon>
      </v-btn>
      <v-btn
        class="ma-8"
        fab
        dark
        small
        color="primary"
        href="https://github.com/franmaranchello"
        target="_blank"
      >
        <v-icon color="background"> mdi-github </v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Home",
  methods: {
    route(name: string) {
      this.$router.push(name);
    },
  },
});
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;500&display=swap");
#name {
  font-family: "Poppins", sans-serif;
  font-weight: 200;
  font-size: xx-large;
}
</style>
