<script setup lang="ts">
const { t } = useI18n()
const { locations, business } = useBusiness()
</script>

<template>
  <section class="loc section">
    <div class="container--wide">
      <SectionHeader :kicker="t('locations.kicker')" :title="t('locations.title')" :subtitle="t('locations.subtitle')" />
      <div class="loc__grid">
        <article v-for="(l, i) in locations" :key="l.id" v-reveal="i * 100" class="loc-card">
          <div class="loc-card__top">
            <BaseIcon name="map-pin" :size="22" />
            <h3 class="loc-card__label">{{ l.label }}</h3>
          </div>
          <p class="loc-card__address">{{ l.address }}</p>
          <div class="loc-card__meta">
            <span class="loc-card__hours"><BaseIcon name="clock" :size="16" />{{ business.hours }}</span>
          </div>
          <BaseButton :href="l.maps" external variant="outline" icon-right="arrow-up-right" size="md">
            {{ t('common.getDirections') }}
          </BaseButton>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.loc {
  background: $color-ink-800;

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-4;
    margin-top: $space-7;

    @include up(md) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.loc-card {
  @include surface;
  background: $color-ink;
  padding: $space-6;
  display: flex;
  flex-direction: column;
  gap: $space-3;
  align-items: flex-start;

  &__top {
    display: flex;
    align-items: center;
    gap: $space-2;
    color: $color-primary-400;
  }

  &__label {
    font-size: $fs-h3;
    font-weight: $fw-bold;
    color: $color-cream;
  }

  &__address {
    color: $text-muted;
    line-height: 1.5;
  }

  &__meta {
    display: flex;
    gap: $space-4;
    margin-bottom: $space-2;
  }

  &__hours {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    font-size: $fs-sm;
    color: $color-cream-dim;
  }
}
</style>
