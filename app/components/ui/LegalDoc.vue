<script setup lang="ts">
const props = defineProps<{
  docKey: 'privacy' | 'terms' | 'shipping'
  sections: string[]
}>()

const { t } = useI18n()
const base = computed(() => `legal.${props.docKey}`)
</script>

<template>
  <div>
    <PageHero :kicker="t('footer.legal')" :title="t(`${base}.title`)" />
    <section class="section">
      <div class="legal container">
        <p class="legal__updated">{{ t('legal.lastUpdated') }}: {{ t('legal.date') }}</p>
        <p class="legal__intro">{{ t(`${base}.intro`) }}</p>

        <section v-for="s in sections" :key="s" class="legal__section" v-reveal>
          <h2 class="legal__heading">{{ t(`${base}.sections.${s}.title`) }}</h2>
          <p class="legal__body">{{ t(`${base}.sections.${s}.body`) }}</p>
        </section>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.legal {
  max-width: 760px;

  &__updated {
    font-size: $fs-sm;
    color: $color-cream-dim;
    margin-bottom: $space-5;
  }

  &__intro {
    font-size: $fs-lead;
    color: $text-base;
    margin-bottom: $space-7;
    padding-bottom: $space-6;
    border-bottom: 1px solid $color-line;
  }

  &__section {
    margin-bottom: $space-6;
  }

  &__heading {
    font-size: $fs-h3;
    font-weight: $fw-bold;
    color: $color-cream;
    margin-bottom: $space-3;
    display: flex;
    align-items: baseline;
    gap: $space-2;

    &::before {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 2px;
      background: $color-primary;
      flex-shrink: 0;
    }
  }

  &__body {
    color: $text-muted;
    line-height: 1.7;
  }
}
</style>
