<script setup lang="ts">
const { t } = useI18n()
const stats = ['followers', 'colors', 'since', 'everyday'] as const
</script>

<template>
  <section class="stats" aria-label="Highlights">
    <div class="stats__inner container--wide">
      <div v-for="(s, i) in stats" :key="s" v-reveal="i * 80" class="stats__item">
        <span class="stats__value">{{ t(`stats.${s}.value`) }}</span>
        <span class="stats__label">{{ t(`stats.${s}.label`) }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.stats {
  border-block: 1px solid $color-line;
  background: $color-ink-800;

  &__inner {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-5;
    padding-block: $space-6;

    @include up(md) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    text-align: center;

    @include up(md) {
      text-align: left;
    }
  }

  &__value {
    @include display(clamp(2.2rem, 4vw, 3.2rem));
    color: $color-primary-400;
  }

  &__label {
    font-size: $fs-sm;
    color: $text-muted;
    font-weight: $fw-medium;
  }
}
</style>
