<script setup lang="ts">
const { t } = useI18n()
usePageSeo({ key: 'order', path: '/order' })
</script>

<template>
  <div>
    <PageHero :kicker="t('order.kicker')" :title="t('order.title')" :subtitle="t('order.subtitle')" />
    <OrderConfigurator />
  </div>
</template>
