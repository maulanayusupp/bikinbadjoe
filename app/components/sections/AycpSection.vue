<script setup lang="ts">
const { t } = useI18n()
const { whatsappLink } = useBusiness()
const { aycpSteps } = useContentService()
</script>

<template>
  <section class="aycp section">
    <div class="aycp__inner container--wide">
      <div class="aycp__head">
        <p v-reveal class="aycp__kicker"><span class="dot" aria-hidden="true" />{{ t('aycp.kicker') }}</p>
        <h2 v-reveal="80" class="aycp__title">{{ t('aycp.title') }}</h2>
        <p v-reveal="160" class="aycp__subtitle">{{ t('aycp.subtitle') }}</p>
        <div v-reveal="220" class="aycp__cta">
          <BaseButton :href="whatsappLink('Halo! Saya tertarik program All You Can Print.')" external variant="cream" icon="whatsapp">
            {{ t('aycp.cta') }}
          </BaseButton>
        </div>
      </div>

      <ol class="aycp__steps">
        <li v-for="(s, i) in aycpSteps" :key="s.id" v-reveal="i * 120" class="aycp-step">
          <span class="aycp-step__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="aycp-step__icon"><BaseIcon :name="s.icon" :size="24" /></span>
          <h3 class="aycp-step__title">{{ t(`${s.i18n}.title`) }}</h3>
          <p class="aycp-step__desc">{{ t(`${s.i18n}.desc`) }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
.aycp {
  background:
    radial-gradient(circle at 80% 0%, rgba($color-primary, 0.18), transparent 45%),
    $color-ink;

  &__inner {
    display: grid;
    gap: $space-7;

    @include up(lg) {
      grid-template-columns: 0.85fr 1.15fr;
      align-items: center;
    }
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
    margin-bottom: $space-4;
  }

  &__subtitle {
    font-size: $fs-lead;
    color: $text-muted;
    margin-bottom: $space-5;
    max-width: 30rem;
  }

  &__steps {
    display: grid;
    gap: $space-4;
    list-style: none;
    counter-reset: step;

    @include up(sm) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.aycp-step {
  @include surface;
  position: relative;
  padding: $space-5;
  display: flex;
  flex-direction: column;
  gap: $space-3;
  background: $color-ink-800;

  &__num {
    @include display(2.4rem);
    color: rgba($color-cream, 0.16);
    position: absolute;
    top: $space-3;
    right: $space-4;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: $radius-md;
    background: $color-primary;
    color: $color-white;
  }

  &__title {
    font-size: $fs-h3;
    font-weight: $fw-bold;
  }

  &__desc {
    font-size: $fs-sm;
    color: $text-muted;
  }
}
</style>
