<script setup lang="ts">
const { t } = useI18n()
usePageSeo({ key: 'products', path: '/products' })
</script>

<template>
  <div>
    <PageHero :kicker="t('products.kicker')" :title="t('products.title')" :subtitle="t('products.subtitle')" />
    <ProductsSection />
    <GallerySection />
    <CtaSection />
  </div>
</template>
