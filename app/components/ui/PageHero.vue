<script setup lang="ts">
defineProps<{
  kicker?: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <section class="page-hero paper-grain">
    <div class="page-hero__glow" aria-hidden="true" />
    <div class="container--wide">
      <p v-if="kicker" v-reveal class="page-hero__kicker"><span class="dot" aria-hidden="true" />{{ kicker }}</p>
      <h1 v-reveal="80" class="page-hero__title">{{ title }}</h1>
      <p v-if="subtitle" v-reveal="160" class="page-hero__subtitle">{{ subtitle }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.page-hero {
  position: relative;
  overflow: hidden;
  padding-block: $space-8 $space-7;
  border-bottom: 1px solid $color-line;

  &__glow {
    position: absolute;
    top: -40%;
    left: 30%;
    width: 40vw;
    height: 40vw;
    max-width: 520px;
    background: radial-gradient(circle, rgba($color-primary, 0.28), transparent 60%);
    filter: blur(10px);
  }

  &__kicker {
    @include kicker;
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    color: $color-primary-400;
    margin-bottom: $space-4;

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-primary;
    }
  }

  &__title {
    @include display($fs-display);
    color: $color-cream;
    max-width: 16ch;
  }

  &__subtitle {
    margin-top: $space-4;
    font-size: $fs-lead;
    color: $text-muted;
    max-width: 46ch;
  }
}
</style>
