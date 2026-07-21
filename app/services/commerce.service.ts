/**
 * Commerce service — structural data for the custom-order configurator.
 *
 * IMPORTANT (evidence rule): BikinBadjoe has not published a full price list, so
 * we DO NOT invent prices. The configurator assembles an order specification and
 * hands it to WhatsApp for a quote. The only verified price facts are surfaced
 * via `PRICE_FACTS`. When an official price list is provided, extend this file
 * and add a pricing/estimate step (see TODO.md).
 */
import type { IconName } from '~/utils/icons'

export interface Garment {
  id: string
  i18n: string // order.garments.<id>.{name,desc}
  icon: IconName
  image?: string
}

export interface PrintOption {
  id: string
  i18n: string // services.items.<id>.{name,desc} (reuses services copy)
}

export interface QuantityTier {
  id: string
  label: string // not translated — numeric ranges
}

/** Verified, published price facts only. */
export const PRICE_FACTS = {
  aycp: 20000, // "All You Can Print" — Rp20.000
  sablonFrom: 5000, // single-piece printing "mulai dari" Rp5.000
} as const

export function useCommerceService() {
  const garments: Garment[] = [
    { id: 'tee', i18n: 'order.garments.tee', icon: 'shirt', image: '/images/gallery/kaos4.jpg' },
    { id: 'oversize', i18n: 'order.garments.oversize', icon: 'shirt', image: '/images/gallery/hasil-sablon.jpg' },
    { id: 'polo', i18n: 'order.garments.polo', icon: 'shirt' },
    { id: 'hoodie', i18n: 'order.garments.hoodie', icon: 'shirt' },
    { id: 'oneset', i18n: 'order.garments.oneset', icon: 'shirt', image: '/images/gallery/aycp.jpg' },
    { id: 'kids', i18n: 'order.garments.kids', icon: 'shirt' },
  ]

  // Print options reuse the marketing services copy so wording stays in sync.
  const printOptions: PrintOption[] = [
    { id: 'digital', i18n: 'services.items.digital' },
    { id: 'plastisol', i18n: 'services.items.plastisol' },
    { id: 'puff', i18n: 'services.items.puff' },
    { id: 'glow', i18n: 'services.items.glow' },
    { id: 'reflective', i18n: 'services.items.reflective' },
    { id: 'foil', i18n: 'services.items.foil' },
    { id: 'glitter', i18n: 'services.items.glitter' },
    { id: 'flocking', i18n: 'services.items.flocking' },
    { id: 'embroidery', i18n: 'services.items.embroidery' },
  ]

  // Representative garment colors (BikinBadjoe stocks 150+; these are common
  // swatches for the configurator — final color confirmed at order time).
  const colors = [
    { id: 'white', hex: '#f4f1ea' },
    { id: 'black', hex: '#1a1a1a' },
    { id: 'navy', hex: '#1f2a44' },
    { id: 'maroon', hex: '#5e1f2a' },
    { id: 'army', hex: '#4b5320' },
    { id: 'mustard', hex: '#d9a441' },
    { id: 'cream', hex: '#e9e0c9' },
    { id: 'red', hex: '#c0392b' },
    { id: 'royal', hex: '#2f6df6' },
    { id: 'pink', hex: '#e88ab0' },
  ]

  const quantityTiers: QuantityTier[] = [
    { id: 'q1', label: '1' },
    { id: 'q2-5', label: '2–5' },
    { id: 'q6-20', label: '6–20' },
    { id: 'q21-50', label: '21–50' },
    { id: 'q51-100', label: '51–100' },
    { id: 'q100+', label: '100+' },
  ]

  return { garments, printOptions, colors, quantityTiers }
}
