import { BUSINESS } from '~/config/business'

/**
 * Build a wa.me deep link with an optional pre-filled message.
 * Centralized so every CTA across the site stays consistent.
 */
export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${BUSINESS.whatsapp}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}
