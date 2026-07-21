import { BUSINESS } from '~/config/business'
import type { IconName } from '~/utils/icons'

export interface SocialLink {
  id: string
  label: string
  href: string
  icon: IconName
}

/**
 * Exposes verified business facts + derived helpers (social links, primary
 * WhatsApp CTA) to components. Single access point keeps facts consistent.
 */
export function useBusiness() {
  const socials: SocialLink[] = [
    { id: 'instagram', label: 'Instagram', href: BUSINESS.socials.instagram, icon: 'instagram' },
    { id: 'tiktok', label: 'TikTok', href: BUSINESS.socials.tiktok, icon: 'tiktok' },
    { id: 'facebook', label: 'Facebook', href: BUSINESS.socials.facebook, icon: 'facebook' },
    { id: 'youtube', label: 'YouTube', href: BUSINESS.socials.youtube, icon: 'youtube' },
    { id: 'linktree', label: 'Linktree', href: BUSINESS.socials.linktree, icon: 'link' },
  ]

  return {
    business: BUSINESS,
    locations: BUSINESS.locations,
    socials,
    whatsappLink: (msg?: string) => buildWhatsAppLink(msg),
  }
}
