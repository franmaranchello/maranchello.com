<template>
  <v-container fluid>
    <v-spacer></v-spacer>
    <v-row align="center" justify="center" class="ma-8">
      <v-avatar size="250">
        <v-img :src="imageSource"></v-img>
      </v-avatar>
    </v-row>
    <v-row align="center" justify="center" class="ma-2">
      <div id="name" align="center">Francisco Maranchello</div>
    </v-row>
    <v-row align="center" justify="center" class="ma-2">
      <div id="text" align="center">
        <p>Architect, Software Developer, and Entrepreneur</p>
      </div>
    </v-row>
    <v-row align="center" justify="center">
      <div id="text" align="center">
        <p v-html="linkText"></p></div
    ></v-row>
    <v-row align="center" justify="center">
      <v-btn
        outlined
        class="ma-4"
        width="100"
        color="primary"
        @click="route('about')"
        >About</v-btn
      >
      <v-btn
        outlined
        class="ma-4"
        width="100"
        color="primary"
        @click="route('projects')"
        >Projects</v-btn
      >
      <v-btn
        outlined
        class="ma-4"
        width="100"
        color="primary"
        href="https://maranchello.gumroad.com/"
        target="_blank"
        >Products</v-btn
      >
    </v-row>
    <v-row align="center" justify="center" class="ma-2">
      <v-btn
        class="ma-2"
        fab
        dark
        small
        color="primary"
        href="https://www.instagram.com/franmaranchello/"
        target="_blank"
      >
        <font-awesome-icon icon="fa-brands fa-instagram" size="2xl" />
      </v-btn>
      <v-btn
        class="ma-2"
        fab
        dark
        small
        color="primary"
        href="https://www.linkedin.com/in/franmaranchello/"
        target="_blank"
      >
        <font-awesome-icon icon="fa-brands fa-linkedin" size="2xl" />
      </v-btn>
      <v-btn
        class="ma-2"
        fab
        dark
        small
        color="primary"
        href="https://github.com/franmaranchello"
        target="_blank"
      >
        <font-awesome-icon icon="fa-brands fa-github" size="2xl" />
      </v-btn>

      <v-btn
        class="ma-2"
        fab
        dark
        small
        color="primary"
        href="https://medium.com/@franmaranchello"
        target="_blank"
      >
        <font-awesome-icon icon="fa-brands fa-medium" size="2xl" />
      </v-btn>
    </v-row>
    <v-row align="center" justify="center" class="ma-4">
      <div class="grey--text text-center">
        ©{{ currentYear }} Francisco Maranchello. View the code for this webapp
        on
        <a
          href="https://github.com/franmaranchello/maranchello.com"
          target="_blank"
          class="grey--text"
        >
          GitHub</a
        >
      </div>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";

export default Vue.extend({
  name: "Home",
  data: () => ({
    imageSource: "",
    linkText:
      "Currently having fun as COO at <a href='https://e-verse.com' target=_blank> e-verse</a>",
  }),
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
  methods: {
    route(name: string) {
      this.$router.push(name);
    },
  },
  mounted() {
    firebase
      .storage()
      .ref("project-assets/default/fran.jpg")
      .getDownloadURL()
      .then((url) => {
        return (this.imageSource = url);
      });
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
#text {
  font-family: "Poppins", sans-serif;
  font-weight: 200;
  font-size: medium;
}
</style>
