<script setup lang="ts">
usePageSeo({ key: 'terms', path: '/terms' })
</script>

<template>
  <LegalDoc doc-key="terms" :sections="['orders', 'design', 'production', 'payment']" />
</template>
