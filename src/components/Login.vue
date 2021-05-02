<template>
  <div class="text-center mt-15">
    <v-btn
      @click="signInWithGoogle"
      :loading="btnLoadingGoogle"
      class="mb-2"
      large
      color="primary"
      dark
      width="40%"
    >
      <v-icon left dark color="white"> mdi-google </v-icon>
      <span class="mr-4"> Sign in with Google </span>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import firebase from "firebase/app";
import "firebase/auth";

@Component
export default class ProviderLogin extends Vue {
  // PROPS
  @Prop() readonly toggleMode!: () => void;

  // DATA PROPERTIES
  btnLoadingGoogle = false;

  // METHODS
  async signInWithGoogle(): Promise<void> {
    this.btnLoadingGoogle = true;
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
