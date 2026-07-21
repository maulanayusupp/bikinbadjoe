<script setup lang="ts">
// Site-wide structured data (LocalBusiness) + base meta come from nuxt.config.
import { BUSINESS } from '~/config/business'

const siteUrl = (useRuntimeConfig().public.siteUrl as string) || BUSINESS.siteUrl

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: BUSINESS.legalName,
  alternateName: BUSINESS.brandName,
  url: siteUrl,
  telephone: `+${BUSINESS.whatsapp}`,
  foundingDate: String(BUSINESS.foundedMerintis),
  address: BUSINESS.locations.map((l) => ({
    '@type': 'PostalAddress',
    streetAddress: l.address,
    addressLocality: l.city,
    addressCountry: 'ID',
  })),
  sameAs: Object.values(BUSINESS.socials),
  openingHours: 'Mo-Su 08:00-21:00',
}

useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }],
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
