<template>
  <v-card-text class="mt-10">
    <v-btn
      @click="signInWithGoogle"
      :loading="btnLoadingGoogle"
      class="mb-2"
      large
      color="primary"
      dark
      width="100%"
    >
      <v-icon left dark color="white"> mdi-google </v-icon>
      <span class="mr-4"> Sign in with Google </span>
    </v-btn>
  </v-card-text>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

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
      await this.$store.dispatch("auth/loginWithGoogle");
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
