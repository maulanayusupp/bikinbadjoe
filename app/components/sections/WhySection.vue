<script setup lang="ts">
const { t } = useI18n()
const { features } = useContentService()
</script>

<template>
  <section class="why section">
    <div class="container--wide">
      <SectionHeader :kicker="t('why.kicker')" :title="t('why.title')" align="center" />
      <ul class="why__grid">
        <li v-for="(f, i) in features" :key="f.id" v-reveal="(i % 3) * 90" class="why-item">
          <span class="why-item__icon"><BaseIcon :name="f.icon" :size="24" /></span>
          <div>
            <h3 class="why-item__title">{{ t(`${f.i18n}.title`) }}</h3>
            <p class="why-item__desc">{{ t(`${f.i18n}.desc`) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.why {
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
}

.why-item {
  display: flex;
  gap: $space-4;
  padding: $space-5;
  border-radius: $radius-lg;
  border: 1px solid transparent;
  transition:
    border-color $transition-base,
    background $transition-base;

  &:hover {
    border-color: $color-line;
    background: $color-ink-800;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    border-radius: $radius-md;
    background: rgba($color-primary, 0.14);
    color: $color-primary-400;
  }

  &__title {
    font-size: $fs-h3;
    font-weight: $fw-bold;
    margin-bottom: $space-1;
  }

  &__desc {
    font-size: $fs-sm;
    color: $text-muted;
  }
}
</style>
