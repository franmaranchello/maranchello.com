# Project Notes

## Testing

Run `npm run test` for Vitest unit tests, `npm run typecheck` for Nuxt/TypeScript checks, and `npm run generate` before shipping because Firebase Hosting deploys `.output/public`.

See `TESTING.md` for conventions. When adding new functions, write corresponding tests. When fixing bugs, write regression tests. When adding error handling or conditional branches, test the failure path as well as the happy path.
