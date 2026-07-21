# TODO — BikinBadjoe Website

Next features and improvements. Keep this updated as work progresses.
Legend: `[ ]` todo · `[~]` in progress · `[x]` done

## Foundation (done)

- [x] Nuxt 4 scaffold + pnpm + SCSS design system
- [x] Multilingual EN/ID (default ID) via @nuxtjs/i18n
- [x] Component architecture (ui / layout / sections) + helpers/services
- [x] SEO meta per page, JSON-LD, Open Graph, favicons, og-image, webmanifest
- [x] Pages: Home, Services, Products, About, Contact, Privacy, Terms, Shipping
- [x] Unique brand design (hero, marquee, AYCP, gallery, testimonials, CTA)

## Near-term

- [x] Add `@nuxtjs/sitemap` for auto sitemap.xml (i18n-aware sitemap index)
- [x] Contact form (Nuxt server route `/api/contact`) as an alternative to
      WhatsApp-only, with honeypot spam protection + WhatsApp fallback
- [ ] Wire `deliverMessage()` in `server/api/contact.post.ts` to a real inbox
      (email via Resend/SMTP, Telegram bot, or CRM webhook)
- [ ] Real image optimization pass: replace remaining stock/placeholder-ish
      images with more official BikinBadjoe photos; add proper alt text per image
- [ ] Add a lightweight gallery lightbox (click to enlarge)
- [ ] Cookie consent banner (ties into Privacy Policy)
- [ ] Verify & add the main office address (Jl. Maleber?) — UNVERIFIED, do not
      publish until confirmed with the business
- [ ] Confirm secondary phone (+62 877-2459-2986) before publishing

## E-commerce (future — make it as attractive as possible)

- [ ] Product catalogue with categories (blank tees, series, one-set) + filters
- [ ] Product detail pages: material, size chart, color swatches (150+ colors)
- [ ] Custom-order configurator: choose garment → color → print type → upload
      design → live price estimate (AYCP-style flow online)
- [ ] Cart + checkout; integrate a payment gateway (e.g. local ID gateway)
- [ ] Order tracking + account area
- [ ] Localized currency/format (IDR) and shipping-cost calculation
- [ ] Inventory/stock backend integration
- [ ] i18n coverage for all new commerce strings (EN/ID)

## Content & marketing

- [ ] Blog / "Culture Lab" journal for SEO (print techniques, case studies)
- [ ] Testimonials pulled from real Google reviews (with attribution/consent)
- [ ] Instagram feed embed / highlight reel
- [ ] "AYCP Goes To School" program landing section/page

## Tech / quality

- [ ] Add ESLint + Prettier + typecheck to CI
- [ ] Lighthouse pass (performance, a11y, SEO ≥ 95)
- [ ] Unit tests for helpers (whatsapp link) + component smoke tests
- [ ] Consider `@nuxt/fonts` to self-host Anton/Archivo (perf + privacy)
- [ ] Analytics (privacy-friendly) once launched
