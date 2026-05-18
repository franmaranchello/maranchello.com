<template>
  <section class="home page">
    <div class="portrait">
      <img v-if="portraitUrl" :src="portraitUrl" alt="Francisco Maranchello" />
    </div>

    <h1>Francisco Maranchello</h1>
    <p class="lead">Architect, Software Developer, and Entrepreneur</p>
    <p class="headline">Cofounder at Radical Labs</p>

    <nav class="actions" aria-label="Portfolio sections">
      <NuxtLink class="button" to="/about">About</NuxtLink>
      <NuxtLink class="button" to="/projects">Projects</NuxtLink>
      <a class="button" href="https://maranchello.substack.com/">Blog</a>
      <a class="button" href="https://radical-labs.co/#products">Products</a>
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
</script>

<style scoped>
.home {
  position: relative;
  display: grid;
  min-height: calc(100vh - 69px);
  align-content: center;
  justify-items: center;
  text-align: center;
}

.home::before {
  position: absolute;
  inset: 10% auto auto 50%;
  z-index: -1;
  width: min(520px, 72vw);
  aspect-ratio: 1;
  border: 1px solid color-mix(in srgb, var(--primary) 26%, transparent);
  border-radius: 50%;
  background:
    radial-gradient(circle at 32% 30%, color-mix(in srgb, var(--primary) 18%, transparent), transparent 34%),
    radial-gradient(circle at 68% 70%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 36%);
  content: "";
  opacity: 0.72;
  transform: translate(-50%, -8%);
}

.portrait {
  width: min(250px, 62vw);
  aspect-ratio: 1;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--primary) 34%, var(--line));
  border-radius: 50%;
  background: var(--surface-muted);
  box-shadow: var(--shadow), 0 0 42px color-mix(in srgb, var(--primary) 18%, transparent);
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
  font-weight: 300;
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
  font-weight: 600;
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

@media (prefers-reduced-motion: no-preference) {
  .portrait,
  h1,
  .lead,
  .headline,
  .actions,
  .socials,
  footer {
    animation: rise-in 680ms both;
  }

  h1 {
    animation-delay: 80ms;
  }

  .lead {
    animation-delay: 140ms;
  }

  .headline {
    animation-delay: 190ms;
  }

  .actions {
    animation-delay: 260ms;
  }

  .socials {
    animation-delay: 320ms;
  }

  footer {
    animation-delay: 380ms;
  }
}
</style>
