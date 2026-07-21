<script setup lang="ts">
usePageSeo({ key: 'privacy', path: '/privacy' })
</script>

<template>
  <LegalDoc doc-key="privacy" :sections="['collect', 'use', 'share', 'rights']" />
</template>
