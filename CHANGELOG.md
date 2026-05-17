# Changelog

All notable changes to this project are documented in this file.

## [1.1.0.0] - 2026-05-17

### Added

- Migrated the portfolio to Nuxt 4 and Vue 3 with prerendered public pages for SEO.
- Added Firebase modular SDK content reads, auth, and admin create flows.
- Added Vitest unit tests for content normalization helpers.
- Added project testing documentation and local test commands.

### Changed

- Updated the homepage headline to "Cofounder at Radical Labs."
- Updated Firebase Hosting to deploy the Nuxt static output from `.output/public`.
- Replaced the Vue 2/Vuetify admin editor with HTML content fields compatible with Vue 3.
- Restricted Firestore and Storage writes to the portfolio admin UID.

### Removed

- Removed the old Vue CLI, Vue 2, Vuetify 2, Vuex, and vue-router application tree.
