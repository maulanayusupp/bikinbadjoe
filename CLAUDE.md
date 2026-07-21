# CLAUDE.md — BikinBadjoe Website

Engineering rules and conventions for this repository. **These rules override
default behavior. Read before making changes.**

## What this is

Marketing + (future) e-commerce website for **CV. Bikin Badjoe Workshop**
("BikinBadjoe" — *Sablon Culture Lab*), a single-piece custom screen-printing &
apparel manufacturer in Bandung, Indonesia. Built with **Nuxt 4**.

## Tech stack

- **Nuxt 4** (`app/` srcDir, Vue 3, `<script setup lang="ts">`)
- **@nuxtjs/i18n** — multilingual EN/ID, default **ID**
- **@nuxt/image** — `<NuxtImg>` for optimized images
- **@vueuse/nuxt** — composable utilities
- **SCSS** — centralized design system, no inline styles
- **pnpm** — package manager (npm's arborist `edgesOut` bug fails installs on
  this machine; use `corepack pnpm ...`)

## Core rules (do not violate)

1. **No inline CSS.** All styling is SCSS. Component styles go in
   `<style scoped lang="scss">`. Global/layout tokens live in
   `app/assets/scss/`. Design tokens (variables, mixins, functions) are
   auto-injected into every component `<style>` via `vite.css.additionalData`,
   so use `$color-primary`, `@include up(md)`, etc. directly — no `@use` needed
   inside components. **Global SCSS partials loaded through `main.scss` (the
   `base/` files) DO need an explicit `@use '../abstracts' as *;`** because
   `additionalData` only reaches entry files, not `@use`-imported partials.
2. **Component-based.** Reusable UI in `app/components/ui/`, layout chrome in
   `app/components/layout/`, page sections in `app/components/sections/`.
   Components resolve by **filename** (`pathPrefix: false`), e.g. `<BaseButton>`.
3. **Helpers & services.** Pure helpers in `app/utils/` (auto-imported).
   Data/business logic in `app/services/` (auto-imported via `imports.dirs`).
   Composables in `app/composables/`. Verified business facts in
   `app/config/business.ts`.
4. **Multilingual, always in sync.** Every user-facing string is a translation
   key present in **both** `i18n/locales/id.json` **and** `i18n/locales/en.json`.
   Never hardcode display text in a component. When you add/change any static
   text, update **both** locale files in the same change. ID is the source of
   truth for tone; EN mirrors it.
5. **SEO per page.** Every page calls `usePageSeo({ key, path })`. Titles/desc
   come from `meta.<key>` in the locale files. Site-wide JSON-LD lives in
   `app/app.vue`.
6. **Evidence over assumption.** Only put verified facts on the site. Business
   facts are sourced from bikinbadjoe.com and the official Instagram
   (@bikinbadjoe / @bikinbadjoe.workshop). If a fact is uncertain, leave it out.
7. **Keep docs in sync.** On any feature/content change, update this
   `CLAUDE.md`, the compliance pages (`privacy`/`terms`/`shipping`) if relevant,
   and the translations. Add planned work to `TODO.md`.
8. **Commit & push each change.** After each self-contained change that builds,
   commit and push (see Workflow).

## Project structure

```
app/
  app.vue                 # root: JSON-LD, <NuxtLayout><NuxtPage>
  error.vue               # 404 / error page
  config/business.ts      # verified business facts (single source of truth)
  assets/scss/
    main.scss             # global entry (registered in nuxt.config css[])
    abstracts/            # _variables, _mixins, _functions, _index (NO css output)
    base/                 # _reset, _typography, _base, _animations (need @use abstracts)
  components/
    ui/                   # BaseButton, BaseIcon, SectionHeader, PageHero, LegalDoc
    layout/               # AppHeader, AppFooter, MarqueeBar, LangSwitcher
    sections/             # Hero, Stats, Services, Aycp, Why, Products, Gallery, Testimonials, Locations, Cta
  composables/            # usePageSeo, useBusiness
  services/               # content.service.ts (structural data -> i18n keys)
  utils/                  # whatsapp.ts, icons.ts
  plugins/reveal.ts       # v-reveal scroll-reveal directive
  pages/                  # index, services, products, about, contact, privacy, terms, shipping
server/api/               # contact.post.ts (form endpoint; deliverMessage = inbox hook)
i18n/locales/             # id.json (default), en.json
public/                   # favicons, og-image, images/ (brand, gallery, process)
```

## Design system

- Brand palette from the official logo: vermilion `#e5481f`, cream `#f4ead3`,
  warm ink `#14100e`, plus playful "sticker" accents (yellow/blue/green/pink).
- Display font **Anton**, heading/body **Archivo** (Google Fonts, loaded in
  `nuxt.config` head).
- Tokens are in `app/assets/scss/abstracts/_variables.scss`. Change colors there
  only. If a logo file is provided later, re-derive the palette from it.

## Commands

```bash
corepack pnpm dev        # dev server (defaults to :3000)
corepack pnpm build      # production build
corepack pnpm generate   # static generation
corepack pnpm preview     # preview built output
```

## Adding content — checklists

**New service/product/section item:** add a structural entry in
`app/services/content.service.ts` + the copy under the right key in **both**
locale files. Consumers update automatically.

**New page:** create `app/pages/<name>.vue`, call `usePageSeo({ key, path })`,
add `meta.<key>.{title,description}` to both locales, add nav/footer links via
the existing link arrays, and (if legal) wire it into the footer `legal` list.

## Workflow (commit & push)

Work on a branch off the default branch. After each change that builds clean:

```bash
git add -A && git commit -m "<message>"
git push
```

Commit messages end with the Co-Authored-By trailer used in this repo.
