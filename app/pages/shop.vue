<script setup lang="ts">
const { t } = useI18n()
usePageSeo({ key: 'shop', path: '/shop' })
</script>

<template>
  <div>
    <PageHero :kicker="t('store.kicker')" :title="t('store.title')" :subtitle="t('store.subtitle')" />
    <StoreGrid />
    <CtaSection />
  </div>
</template>
