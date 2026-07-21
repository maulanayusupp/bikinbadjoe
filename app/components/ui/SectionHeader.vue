<script setup lang="ts">
withDefaults(
  defineProps<{
    kicker?: string
    title: string
    subtitle?: string
    align?: 'left' | 'center'
    light?: boolean
  }>(),
  { align: 'left' },
)
</script>

<template>
  <header class="section-header" :class="[`is-${align}`, { 'is-light': light }]">
    <p v-if="kicker" v-reveal class="section-header__kicker">
      <span class="dot" aria-hidden="true" />{{ kicker }}
    </p>
    <h2 v-reveal="80" class="section-header__title">{{ title }}</h2>
    <p v-if="subtitle" v-reveal="160" class="section-header__subtitle">{{ subtitle }}</p>
  </header>
</template>

<style scoped lang="scss">
.section-header {
  display: flex;
  flex-direction: column;
  gap: $space-3;
  max-width: 42rem;

  &.is-center {
    align-items: center;
    text-align: center;
    margin-inline: auto;
  }

  &__kicker {
    @include kicker;
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    color: $color-primary-400;

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-primary;
    }
  }

  &__title {
    font-size: $fs-h1;
    text-wrap: balance;
  }

  &__subtitle {
    font-size: $fs-lead;
    color: $text-muted;
    text-wrap: pretty;
  }

  &.is-light {
    .section-header__title {
      color: $color-ink;
    }
    .section-header__subtitle {
      color: rgba($color-ink, 0.7);
    }
  }
}
</style>
