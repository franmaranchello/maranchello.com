export default defineNuxtConfig({
  compatibilityDate: "2026-05-17",
  devtools: { enabled: true },
  ssr: true,
  css: ["~/assets/css/main.css", "@fortawesome/fontawesome-svg-core/styles.css"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: { lang: "en" },
      title: "Francisco Maranchello",
      link: [
        { rel: "icon", href: "/favicon.ico" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
        },
      ],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/home", "/about", "/projects"],
    },
  },
  routeRules: {
    "/blog": { redirect: { to: "https://maranchello.substack.com/", statusCode: 301 } },
    "/blog/**": { redirect: { to: "https://maranchello.substack.com/", statusCode: 301 } },
    "/products": { redirect: { to: "https://radical-labs.co/#products", statusCode: 301 } },
    "/products/**": { redirect: { to: "https://radical-labs.co/#products", statusCode: 301 } },
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://maranchello.com",
      firebase: {
        apiKey:
          process.env.NUXT_PUBLIC_FIREBASE_API_KEY || process.env.VUE_APP_APIKEY || "",
        authDomain:
          process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
          process.env.VUE_APP_AUTHDOMAIN ||
          "",
        projectId:
          process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID ||
          process.env.VUE_APP_PROJECTID ||
          "",
        storageBucket:
          process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
          process.env.VUE_APP_STORAGEBUCKET ||
          "",
        messagingSenderId:
          process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
          process.env.VUE_APP_MESSAGINGSENDERID ||
          "",
        appId:
          process.env.NUXT_PUBLIC_FIREBASE_APP_ID || process.env.VUE_APP_APPID || "",
        measurementId:
          process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
          process.env.VUE_APP_MEASUREMENTID ||
          "",
      },
    },
  },
});
