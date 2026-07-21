<script setup lang="ts">
const { t } = useI18n()
const { whatsappLink } = useBusiness()
</script>

<template>
  <section class="cta section">
    <div class="cta__inner container paper-grain" v-reveal>
      <h2 class="cta__title">{{ t('cta.title') }}</h2>
      <p class="cta__subtitle">{{ t('cta.subtitle') }}</p>
      <BaseButton
        :href="whatsappLink('Halo BikinBadjoe! Saya siap order, mohon info lengkapnya.')"
        external
        variant="cream"
        icon="whatsapp"
        size="lg"
      >
        {{ t('cta.button') }}
      </BaseButton>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cta {
  &__inner {
    position: relative;
    overflow: hidden;
    border-radius: $radius-lg;
    background:
      radial-gradient(circle at 20% 20%, $color-primary-400, transparent 55%),
      $color-primary;
    padding: clamp(#{$space-7}, 8vw, #{$space-9}) $space-6;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-4;
  }

  &__title {
    @include display($fs-display);
    color: $color-white;
    max-width: 20ch;
  }

  &__subtitle {
    color: rgba($color-white, 0.9);
    font-size: $fs-lead;
    max-width: 40ch;
    margin-bottom: $space-2;
  }
}
</style>
