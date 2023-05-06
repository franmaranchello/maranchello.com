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
      <font-awesome-icon left icon="fa-brands fa-google" size="xl" />
      <span class="ml-2"></span>
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
      this.$store.dispatch("login", provider);
    } catch (error) {
      alert(error);
      this.$router.push("/");
    }
  }
}
</script>
