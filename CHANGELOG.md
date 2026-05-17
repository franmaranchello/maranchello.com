# Changelog

All notable changes to this project are documented in this file.

## [1.1.0.0] - 2026-05-17

### Added

- The portfolio now runs on Nuxt 4 and Vue 3 with prerendered public pages for better SEO.
- Projects, posts, auth, and admin creation flows now use the modern Firebase modular SDK.

### For contributors

- Added Vitest unit tests for content normalization helpers.
- Added testing documentation, local test commands, and a GitHub Actions verification workflow.

### Changed

- The homepage headline now says "Cofounder at Radical Labs."
- Firebase Hosting now deploys the Nuxt static output from `.output/public`.
- The admin editor now uses Vue 3-compatible HTML content fields.
- Firestore and Storage writes are now restricted to the portfolio admin UID.

### Removed

- Removed the old Vue CLI, Vue 2, Vuetify 2, Vuex, and vue-router application tree.
