<template>
  <header class="site-header">
    <NuxtLink class="brand" to="/" aria-label="Francisco Maranchello home">
      FM
    </NuxtLink>
    <nav class="nav" aria-label="Primary navigation">
      <NuxtLink to="/about">About</NuxtLink>
      <NuxtLink to="/projects">Projects</NuxtLink>
      <NuxtLink to="/blog">Blog</NuxtLink>
      <a href="https://products.maranchello.com">Products</a>
      <button class="theme-toggle" type="button" aria-label="Toggle dark mode" @click="toggleTheme">
        <FontAwesomeIcon :icon="dark ? ['fas', 'sun'] : ['fas', 'moon']" />
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
const dark = useState("dark-mode", () => false);

onMounted(() => {
  const hour = new Date().getHours();
  dark.value = hour > 17 || hour < 8;
  document.body.classList.toggle("dark", dark.value);
});

const toggleTheme = () => {
  dark.value = !dark.value;
  document.body.classList.toggle("dark", dark.value);
};
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 92%, transparent);
  padding: 14px max(18px, calc((100vw - 1120px) / 2));
  backdrop-filter: blur(14px);
}

.brand {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--text);
  font-weight: 700;
}

.brand:hover {
  text-decoration: none;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: clamp(10px, 2vw, 22px);
}

.nav a {
  color: var(--muted);
  font-size: 0.92rem;
  font-weight: 500;
}

.nav a.router-link-active {
  color: var(--text);
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: var(--surface);
  color: var(--text);
}

@media (max-width: 720px) {
  .site-header {
    align-items: flex-start;
    padding: 12px;
  }

  .nav {
    flex-wrap: wrap;
    gap: 10px 14px;
  }
}
</style>
