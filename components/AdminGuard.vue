<template>
  <ClientOnly>
    <div v-if="!hasFirebaseConfig()" class="notice">
      Firebase environment variables are missing, so admin tools cannot connect.
    </div>
    <div v-else-if="!ready" class="notice">Checking your session...</div>
    <div v-else-if="!isAdmin" class="notice">
      <p>You need to sign in as the site admin to use this page.</p>
      <button class="button" type="button" @click="loginWithGoogle">Sign in with Google</button>
    </div>
    <slot v-else />
  </ClientOnly>
</template>

<script setup lang="ts">
import { hasFirebaseConfig } from "~/utils/firebase";

const { init, isAdmin, loginWithGoogle, ready } = useFirebaseAuth();

onMounted(init);
</script>
