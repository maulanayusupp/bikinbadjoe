<script setup lang="ts">
usePageSeo({ key: 'home', path: '/' })
</script>

<template>
  <div>
    <HeroSection />
    <StatsBar />
    <ServicesSection :limit="6" show-cta />
    <AycpSection />
    <WhySection />
    <ProductsSection />
    <GallerySection />
    <TestimonialsSection />
    <LocationsSection />
    <CtaSection />
  </div>
</template>
