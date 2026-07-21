<script setup lang="ts">
const { t } = useI18n()
const { whatsappLink } = useBusiness()
</script>

<template>
  <div class="site">
    <a href="#main" class="skip-link">{{ t('common.backHome') }}</a>
    <MarqueeBar />
    <AppHeader />
    <main id="main" class="site__main">
      <slot />
    </main>
    <AppFooter />

    <!-- Persistent floating WhatsApp CTA -->
    <a
      :href="whatsappLink('Halo BikinBadjoe! Saya mau tanya soal order.')"
      target="_blank"
      rel="noopener noreferrer"
      class="site__fab"
      aria-label="Chat WhatsApp"
    >
      <BaseIcon name="whatsapp" :size="26" />
    </a>
  </div>
</template>

<style scoped lang="scss">
.site {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__main {
    flex: 1;
  }

  &__fab {
    position: fixed;
    right: $space-5;
    bottom: $space-5;
    z-index: $z-overlay;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: $color-sticker-green;
    color: $color-white;
    box-shadow: $shadow-lg;
    transition: transform $transition-base;

    &:hover {
      transform: scale(1.08);
    }
  }
}
</style>
