<template>
  <header class="site-header">
    <NuxtLink class="brand" to="/" aria-label="Francisco Maranchello home">
      FM
    </NuxtLink>
    <nav class="nav" aria-label="Primary navigation">
      <NuxtLink to="/about">About</NuxtLink>
      <NuxtLink to="/projects">Projects</NuxtLink>
      <a href="https://maranchello.substack.com/">Blog</a>
      <a href="https://radical-labs.co/#products">Products</a>
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
  document.documentElement.classList.toggle("dark", dark.value);
  document.body.classList.toggle("dark", dark.value);
});

const toggleTheme = () => {
  dark.value = !dark.value;
  document.documentElement.classList.toggle("dark", dark.value);
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
  font-family: var(--mono-font);
  font-weight: 700;
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.brand:hover {
  border-color: var(--primary);
  box-shadow: 0 0 22px color-mix(in srgb, var(--primary) 24%, transparent);
  text-decoration: none;
  transform: translateY(-1px);
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
  transition: color 160ms ease;
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
  transition: background 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease;
}

.theme-toggle:hover {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-1px);
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
