<template>
  <v-slide-y-transition hide-on-leave>
    <v-card id="details-container" class="ma-8" outlined>
      <v-row>
        <v-col>
          <v-img :src="imageSource"
            ><div class="fill-height bottom-gradient"></div
          ></v-img>
        </v-col>
        <v-col>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="mb-1">
                Francisco Maranchello
              </v-list-item-title>
              <v-list-item-subtitle>About Me</v-list-item-subtitle>
              <v-list-item-content>
                <span style="white-space: pre-wrap" v-html="description"></span>
              </v-list-item-content>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-btn outlined rounded text @click="goHome"> Back </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-slide-y-transition>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
import db from "../store/db";

export default Vue.extend({
  name: "About",
  data: () => ({
    description: "",
    imageSource: "",
  }),
  methods: {
    goHome() {
      this.$router.push("/");
    },
    async getDescription() {
      await db.general
        .doc("about")
        .get()
        .then((about) => {
          this.description = about.data().content;
        });
    },
  },
  mounted() {
    firebase
      .storage()
      .ref("project-assets/default/profile.jpg")
      .getDownloadURL()
      .then((url) => {
        return (this.imageSource = url);
      });
    this.getDescription();
  },
});
</script>
