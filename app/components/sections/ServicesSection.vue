<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { services } = useContentService()

const props = withDefaults(defineProps<{ limit?: number; showCta?: boolean }>(), { showCta: false })

const shown = computed(() => (props.limit ? services.slice(0, props.limit) : services))
</script>

<template>
  <section class="services section">
    <div class="container--wide">
      <SectionHeader :kicker="t('services.kicker')" :title="t('services.title')" :subtitle="t('services.subtitle')" />

      <ul class="services__grid">
        <li
          v-for="(s, i) in shown"
          :key="s.id"
          v-reveal="(i % 3) * 90"
          class="service-card"
          :style="{ '--accent': s.accent }"
        >
          <span class="service-card__icon">
            <BaseIcon :name="s.icon" :size="26" />
          </span>
          <h3 class="service-card__name">{{ t(`${s.i18n}.name`) }}</h3>
          <p class="service-card__desc">{{ t(`${s.i18n}.desc`) }}</p>
        </li>
      </ul>

      <div v-if="showCta" class="services__cta">
        <BaseButton :to="localePath('/services')" variant="outline" icon-right="arrow-right">
          {{ t('common.viewAll') }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.services {
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-4;
    margin-top: $space-7;
    list-style: none;

    @include up(sm) {
      grid-template-columns: repeat(2, 1fr);
    }
    @include up(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__cta {
    margin-top: $space-6;
    display: flex;
    justify-content: center;
  }
}

.service-card {
  @include surface;
  padding: $space-5;
  display: flex;
  flex-direction: column;
  gap: $space-3;
  position: relative;
  overflow: hidden;
  transition:
    transform $transition-base,
    border-color $transition-base;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform $transition-base;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--accent) 55%, transparent);

    &::before {
      transform: scaleX(1);
    }

    .service-card__icon {
      background: var(--accent);
      color: $color-ink;
    }
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: $radius-md;
    background: color-mix(in srgb, var(--accent) 16%, transparent);
    color: var(--accent);
    transition:
      background $transition-base,
      color $transition-base;
  }

  &__name {
    font-size: $fs-h3;
    font-weight: $fw-bold;
  }

  &__desc {
    font-size: $fs-sm;
    color: $text-muted;
  }
}
</style>
