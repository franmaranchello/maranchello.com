# maranchello.com

Personal portfolio for Francisco Maranchello, built with Nuxt 4, Vue 3, TypeScript, and Firebase.

The public portfolio pages are rendered by Nuxt so crawlers receive real HTML instead of waiting for a client-only Vue app to load. Firestore remains the source for projects and about-page content, while Firebase Auth/Storage are used by the hidden admin tools.

Search metadata is generated for every public page, including canonical URLs, Open Graph and Twitter previews, and Schema.org JSON-LD for the person, website, project index, and project detail pages. The static build also exposes `/robots.txt`, `/sitemap.xml`, and `/llms.txt` so search crawlers and AI agents can discover the canonical portfolio pages and project URLs.

## Setup

```bash
npm install
cp .env.example .env
```

Fill the Firebase values in `.env`.

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run generate
```

The generated Firebase Hosting output is written to `.output/public`.

The generate step prerenders public pages, private admin entry routes, crawler discovery files, and Firestore-backed project detail pages when Firebase public config is available.

## Testing

```bash
npm run test
npm run typecheck
npm run generate
```

See [TESTING.md](TESTING.md) for testing conventions.

## Deploy

```bash
npm run deploy
```

GitHub Actions also deploys on pushes to `main`. The deploy workflow expects these repository secrets:

- `FIREBASE_SERVICE_ACCOUNT_JSON`
- `NUXT_PUBLIC_FIREBASE_API_KEY`
- `NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NUXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NUXT_PUBLIC_FIREBASE_APP_ID`
- `NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

Set the optional `NUXT_PUBLIC_SITE_URL` repository variable to override the canonical site URL.
