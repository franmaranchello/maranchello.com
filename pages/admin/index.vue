<template>
  <section class="page">
    <p class="section-kicker">Admin</p>
    <h1 class="section-title">Manage Content</h1>

    <AdminGuard>
      <div class="admin-actions">
        <NuxtLink class="button" to="/admin/projects">Create project</NuxtLink>
        <NuxtLink class="button" to="/admin/posts">Create post</NuxtLink>
        <button class="button" type="button" @click="handleLogout">Log out</button>
      </div>
    </AdminGuard>
  </section>
</template>

<script setup lang="ts">
const { logout } = useFirebaseAuth();

const handleLogout = async () => {
  await logout();
  await navigateTo("/");
};
</script>

<style scoped>
.admin-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
