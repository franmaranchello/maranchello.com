# Changelog

All notable changes to this project are documented in this file.

## [1.1.0.0] - 2026-05-17

### Added

- The portfolio now runs on Nuxt 4 and Vue 3 with prerendered public pages for better SEO.
- Projects, auth, and admin creation flows now use the modern Firebase modular SDK.

### For contributors

- Added Vitest unit tests for content normalization helpers.
- Added testing documentation, local test commands, and a GitHub Actions verification workflow.
- Added a GitHub Actions deployment workflow for pushes to `main`.

### Changed

- The homepage headline now says "Cofounder at Radical Labs."
- Firebase Hosting now deploys the Nuxt static output from `.output/public`.
- The admin editor now uses Vue 3-compatible HTML content fields.
- Firestore and Storage writes are now restricted to the portfolio admin UID.
- The legacy `/home` URL now renders the homepage instead of returning a 404.
- Admin gallery uploads now preserve numeric filename ordering.
- Dynamic project detail URLs now fall back to the Nuxt app for admin-created content between deploys.
- Google Analytics page-view tracking now initializes from the configured measurement ID.
- The Blog and Products navigation items now leave the site for Substack and Radical Labs products.
- The home page uses Radical Labs-inspired type, color accents, and smooth motion.
- The deployment workflow now authenticates Firebase with a service account JSON secret instead of the deprecated Firebase token.
- Project tag filtering now has exact tag selection, URL state, result counts, and animated result updates.

### Removed

- Removed the old Vue CLI, Vue 2, Vuetify 2, Vuex, and vue-router application tree.
- Removed the local blog routes, post admin route, and Medium social icon.
