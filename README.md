# maranchello.com

Personal portfolio for Francisco Maranchello, built with Nuxt 4, Vue 3, TypeScript, and Firebase.

The public portfolio pages are rendered by Nuxt so crawlers receive real HTML instead of waiting for a client-only Vue app to load. Firestore remains the source for projects, posts, and about-page content, while Firebase Auth/Storage are used by the hidden admin tools.

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
