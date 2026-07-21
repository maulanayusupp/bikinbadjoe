<script setup lang="ts">
usePageSeo({ key: 'shipping', path: '/shipping' })
</script>

<template>
  <LegalDoc doc-key="shipping" :sections="['pickup', 'delivery', 'returns', 'defects']" />
</template>
