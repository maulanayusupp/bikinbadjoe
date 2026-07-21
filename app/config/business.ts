/**
 * Centralized, evidence-based business facts for CV. Bikin Badjoe Workshop.
 *
 * Sources (verified 2026-07-21):
 *  - https://bikinbadjoe.com/ (home) and /company-profile/
 *  - Instagram @bikinbadjoe / @bikinbadjoe.workshop
 *
 * IMPORTANT: Only put VERIFIED facts here. Do not add assumptions. Translatable
 * marketing copy lives in i18n locale files, not here.
 */

export const BUSINESS = {
  legalName: 'CV. Bikin Badjoe Workshop',
  brandName: 'BikinBadjoe',
  tagline: 'Sablon Culture Lab',
  foundedMerintis: 2017,
  foundedProduksi: 2019,

  siteUrl: 'https://bikinbadjoe.com',

  // WhatsApp in international format (verified: 0878-5542-9560).
  whatsapp: '6287855429560',
  whatsappDisplay: '0878-5542-9560',

  hours: '08.00 – 21.00',
  hoursNote: 'everyday',

  colorCount: 150, // 150+ color options since 2019
  material: 'Cotton Combed 30s',

  locations: [
    {
      id: 'pusat',
      label: 'Store 1 · Pusat',
      address: 'Jl. H. Mesri No.28, Pasirkaliki, Cicendo, Kota Bandung',
      city: 'Bandung',
      maps: 'https://maps.google.com/?q=Bikin+Badjoe+Jl+H+Mesri+No+28+Bandung',
    },
    {
      id: 'cimahi',
      label: 'Store 2',
      address: 'Jl. Gunung Batu No.183, Cimahi',
      city: 'Cimahi',
      maps: 'https://maps.google.com/?q=Bikin+Badjoe+Jl+Gunung+Batu+183+Cimahi',
    },
  ],

  socials: {
    instagram: 'https://www.instagram.com/bikinbadjoe/',
    instagramWorkshop: 'https://www.instagram.com/bikinbadjoe.workshop/',
    tiktok: 'https://www.tiktok.com/@bikinbadjoe.workshop',
    facebook: 'https://www.facebook.com/bikinbadjoeWorkshop/',
    youtube: 'https://www.youtube.com/channel/UCcf_E2VV_A21qlfoyXn2zjQ',
    linktree: 'https://linktr.ee/bikinbadjoe.workshop',
  },

  // Brand palette derived from the official logo (warm vermilion + cream) and
  // the workshop's dark "culture lab" aesthetic.
  theme: {
    primary: '#E5481F',
    primaryDark: '#B83814',
    cream: '#F4EAD3',
    ink: '#14100E',
  },
} as const

export type BusinessLocation = (typeof BUSINESS.locations)[number]
