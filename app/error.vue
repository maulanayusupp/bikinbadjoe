<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()

function goHome() {
  clearError({ redirect: localePath('/') })
}
</script>

<template>
  <div class="err paper-grain">
    <div class="err__glow" aria-hidden="true" />
    <div class="err__inner container">
      <p class="err__code">{{ error.statusCode || 404 }}</p>
      <h1 class="err__title">{{ t('notFound.title') }}</h1>
      <p class="err__subtitle">{{ t('notFound.subtitle') }}</p>
      <BaseButton icon="arrow-right" size="lg" @click="goHome">{{ t('notFound.cta') }}</BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.err {
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: $color-ink;
  overflow: hidden;
  text-align: center;

  &__glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 30%, rgba($color-primary, 0.25), transparent 55%);
  }

  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-4;
  }

  &__code {
    @include display($fs-hero);
    color: $color-primary;
  }

  &__title {
    font-size: $fs-h1;
    color: $color-cream;
  }

  &__subtitle {
    color: $text-muted;
    max-width: 36ch;
    margin-bottom: $space-3;
  }
}
</style>
