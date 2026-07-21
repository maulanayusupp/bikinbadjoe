<script setup lang="ts">
const { t } = useI18n()
usePageSeo({ key: 'services', path: '/services' })
</script>

<template>
  <div>
    <PageHero :kicker="t('services.kicker')" :title="t('services.title')" :subtitle="t('services.subtitle')" />
    <ServicesSection />
    <AycpSection />
    <CtaSection />
  </div>
</template>
