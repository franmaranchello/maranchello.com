<template>
  <section class="home page">
    <div class="portrait">
      <img v-if="portraitUrl" :src="portraitUrl" alt="Francisco Maranchello" />
    </div>

    <p class="section-kicker">Portfolio</p>
    <h1>Francisco Maranchello</h1>
    <p class="lead">Architect, Software Developer, and Entrepreneur</p>
    <p class="headline">Cofounder at Radical Labs</p>

    <nav class="actions" aria-label="Portfolio sections">
      <NuxtLink class="button" to="/about">About</NuxtLink>
      <NuxtLink class="button" to="/projects">Projects</NuxtLink>
      <NuxtLink class="button" to="/blog">Blog</NuxtLink>
      <a class="button" href="https://products.maranchello.com">Products</a>
    </nav>

    <div class="socials" aria-label="Social links">
      <a class="icon-button" href="https://www.instagram.com/franmaranchello/" target="_blank" rel="noreferrer" aria-label="Instagram">
        <FontAwesomeIcon :icon="['fab', 'instagram']" />
      </a>
      <a class="icon-button" href="https://www.linkedin.com/in/franmaranchello/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <FontAwesomeIcon :icon="['fab', 'linkedin']" />
      </a>
      <a class="icon-button" href="https://github.com/franmaranchello" target="_blank" rel="noreferrer" aria-label="GitHub">
        <FontAwesomeIcon :icon="['fab', 'github']" />
      </a>
      <a class="icon-button" href="https://medium.com/@franmaranchello" target="_blank" rel="noreferrer" aria-label="Medium">
        <FontAwesomeIcon :icon="['fab', 'medium']" />
      </a>
      <a class="icon-button" href="https://twitter.com/franmaranchello" target="_blank" rel="noreferrer" aria-label="X">
        <FontAwesomeIcon :icon="['fab', 'x-twitter']" />
      </a>
    </div>

    <footer>
      ©{{ currentYear }} Francisco Maranchello. View the code for this webapp on
      <a href="https://github.com/franmaranchello/maranchello.com" target="_blank" rel="noreferrer">GitHub</a>.
    </footer>
  </section>
</template>

<script setup lang="ts">
import { getPublicStorageUrl } from "~/utils/firebase";

const currentYear = new Date().getFullYear();
const portraitUrl = computed(() => getPublicStorageUrl("project-assets/default/fran.jpg"));

useSeoMeta({
  title: "Francisco Maranchello | Cofounder at Radical Labs",
  description:
    "Francisco Maranchello is an architect, software developer, entrepreneur, and cofounder at Radical Labs.",
  ogTitle: "Francisco Maranchello",
  ogDescription:
    "Architect, software developer, entrepreneur, and cofounder at Radical Labs.",
});
</script>

<style scoped>
.home {
  display: grid;
  min-height: calc(100vh - 69px);
  align-content: center;
  justify-items: center;
  text-align: center;
}

.portrait {
  width: min(250px, 62vw);
  aspect-ratio: 1;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: var(--surface-muted);
  box-shadow: var(--shadow);
}

.portrait img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h1 {
  margin: 14px 0 8px;
  font-size: clamp(2.6rem, 8vw, 5.8rem);
  font-weight: 200;
  line-height: 1;
}

.lead,
.headline {
  margin: 0;
  color: var(--muted);
  font-size: clamp(1rem, 2vw, 1.2rem);
}

.headline {
  margin-top: 8px;
  color: var(--text);
}

.actions,
.socials {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
}

footer {
  margin-top: 46px;
  color: var(--muted);
  font-size: 0.86rem;
}
</style>
