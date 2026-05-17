<template>
  <section class="page login-page">
    <p class="section-kicker">Admin</p>
    <h1 class="section-title">Sign in</h1>
    <p class="section-copy">
      Admin access is restricted to the portfolio owner.
    </p>

    <ClientOnly>
      <div v-if="!hasFirebaseConfig()" class="notice">
        Firebase environment variables are missing.
      </div>
      <div v-else class="login-actions">
        <button class="button" type="button" :disabled="loading" @click="signIn">
          <FontAwesomeIcon :icon="['fab', 'google']" />
          {{ loading ? "Signing in..." : "Sign in with Google" }}
        </button>
      </div>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { hasFirebaseConfig } from "~/utils/firebase";

const loading = ref(false);
const { init, isAdmin, loginWithGoogle } = useFirebaseAuth();

onMounted(init);

watchEffect(() => {
  if (isAdmin.value) navigateTo("/admin");
});

const signIn = async () => {
  loading.value = true;
  try {
    await loginWithGoogle();
    await navigateTo("/admin");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  max-width: 720px;
}

.login-actions {
  margin-top: 24px;
}
</style>
