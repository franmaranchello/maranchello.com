# Testing

This project uses Vitest for fast TypeScript unit tests and Nuxt's own build/typecheck commands for framework verification.

100% test coverage is the goal. Tests make fast AI-assisted changes safe: new helpers should get unit tests, bugs should get regression tests, and new conditionals should cover both branches.

## Commands

```bash
npm run test
npm run typecheck
npm run generate
```

## Conventions

- Unit tests live beside the TypeScript module they cover as `*.test.ts`.
- Prefer behavior assertions over existence checks.
- Mock Firebase and Nuxt runtime boundaries when testing code that would otherwise touch external services.
- Use `npm run generate` as the deployment smoke test because Firebase Hosting serves `.output/public`.
