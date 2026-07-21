/**
 * Content service — the structural source of truth for repeatable UI data
 * (services, products, steps, etc.). Only structure lives here: ids, icons,
 * accent colors, and image paths. All human-readable copy is resolved from
 * i18n via the `i18n` key on each entry, e.g. t(`${item.i18n}.name`).
 *
 * Keeping this separate from copy makes the site scalable: add an item here +
 * its translations in both locale files and every consumer updates.
 */
import type { IconName } from '~/utils/icons'

export interface ServiceItem {
  id: string
  i18n: string
  icon: IconName
  accent: string
}

export interface ProductItem {
  id: string
  i18n: string
  image: string
}

export interface StepItem {
  id: string
  i18n: string
  icon: IconName
}

export interface FeatureItem {
  id: string
  i18n: string
  icon: IconName
}

export interface GalleryItem {
  src: string
  altKey: string
}

const ACCENTS = {
  vermilion: '#e5481f',
  yellow: '#f5c518',
  blue: '#2f6df6',
  green: '#57c84d',
  pink: '#ff5da2',
}

export function useContentService() {
  const services: ServiceItem[] = [
    { id: 'digital', i18n: 'services.items.digital', icon: 'printer', accent: ACCENTS.vermilion },
    { id: 'plastisol', i18n: 'services.items.plastisol', icon: 'layers', accent: ACCENTS.blue },
    { id: 'puff', i18n: 'services.items.puff', icon: 'spark', accent: ACCENTS.yellow },
    { id: 'glow', i18n: 'services.items.glow', icon: 'glow', accent: ACCENTS.green },
    { id: 'reflective', i18n: 'services.items.reflective', icon: 'sparkles', accent: ACCENTS.pink },
    { id: 'foil', i18n: 'services.items.foil', icon: 'bolt', accent: ACCENTS.yellow },
    { id: 'glitter', i18n: 'services.items.glitter', icon: 'sparkles', accent: ACCENTS.pink },
    { id: 'flocking', i18n: 'services.items.flocking', icon: 'palette', accent: ACCENTS.blue },
    { id: 'embroidery', i18n: 'services.items.embroidery', icon: 'needle', accent: ACCENTS.vermilion },
    { id: 'konveksi', i18n: 'services.items.konveksi', icon: 'shirt', accent: ACCENTS.green },
  ]

  const products: ProductItem[] = [
    { id: 'polos', i18n: 'products.items.polos', image: '/images/gallery/kaos4.jpg' },
    { id: 'basic', i18n: 'products.items.basic', image: '/images/gallery/hasil-sablon.jpg' },
    { id: 'family', i18n: 'products.items.family', image: '/images/gallery/family.jpg' },
    { id: 'kids', i18n: 'products.items.kids', image: '/images/process/proc1.jpg' },
    { id: 'oneset', i18n: 'products.items.oneset', image: '/images/gallery/aycp.jpg' },
    { id: 'raglan', i18n: 'products.items.raglan', image: '/images/process/proc2.jpg' },
  ]

  const aycpSteps: StepItem[] = [
    { id: 'pick', i18n: 'aycp.steps.pick', icon: 'palette' },
    { id: 'arrange', i18n: 'aycp.steps.arrange', icon: 'sparkles' },
    { id: 'print', i18n: 'aycp.steps.print', icon: 'printer' },
  ]

  const features: FeatureItem[] = [
    { id: 'noMin', i18n: 'why.items.noMin', icon: 'check-circle' },
    { id: 'freeDesign', i18n: 'why.items.freeDesign', icon: 'palette' },
    { id: 'inhouse', i18n: 'why.items.inhouse', icon: 'shirt' },
    { id: 'fast', i18n: 'why.items.fast', icon: 'bolt' },
    { id: 'colors', i18n: 'why.items.colors', icon: 'spark' },
    { id: 'material', i18n: 'why.items.material', icon: 'heart' },
  ]

  const gallery: GalleryItem[] = [
    { src: '/images/gallery/hasil-sablon.jpg', altKey: 'gallery.title' },
    { src: '/images/process/dtf.jpg', altKey: 'services.items.digital.name' },
    { src: '/images/process/print.jpg', altKey: 'services.items.plastisol.name' },
    { src: '/images/gallery/kaos4.jpg', altKey: 'products.items.polos.name' },
    { src: '/images/process/jahit.jpg', altKey: 'services.items.konveksi.name' },
    { src: '/images/gallery/family.jpg', altKey: 'products.items.family.name' },
    { src: '/images/process/proc1.jpg', altKey: 'gallery.title' },
    { src: '/images/process/proc2.jpg', altKey: 'gallery.title' },
  ]

  const testimonials = ['t1', 't2', 't3', 't4'].map((id) => ({ id, i18n: `testimonials.items.${id}` }))

  const milestones = ['m2017', 'm2019', 'mNow'].map((id) => ({ id, i18n: `about.milestones.${id}` }))

  const values = [
    { id: 'express', i18n: 'about.values.express', icon: 'sparkles' as IconName },
    { id: 'quality', i18n: 'about.values.quality', icon: 'check-circle' as IconName },
    { id: 'community', i18n: 'about.values.community', icon: 'heart' as IconName },
  ]

  return { services, products, aycpSteps, features, gallery, testimonials, milestones, values }
}
