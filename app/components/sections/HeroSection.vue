<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { whatsappLink } = useBusiness()

const badges = computed(() => [t('hero.badge1'), t('hero.badge2'), t('hero.badge3')])
</script>

<template>
  <section class="hero paper-grain">
    <div class="hero__glow" aria-hidden="true" />
    <div class="hero__inner container--wide">
      <div class="hero__copy">
        <p v-reveal class="hero__kicker"><span class="dot" aria-hidden="true" />{{ t('hero.kicker') }}</p>

        <h1 class="hero__title">
          <span v-reveal="60" class="hero__line">{{ t('hero.titleLine1') }}</span>
          <span v-reveal="120" class="hero__line">{{ t('hero.titleLine2') }}</span>
          <span v-reveal="180" class="hero__line hero__line--accent">
            <span class="hero__mark">{{ t('hero.titleAccent') }}</span>
          </span>
        </h1>

        <p v-reveal="240" class="hero__subtitle">{{ t('hero.subtitle') }}</p>

        <div v-reveal="300" class="hero__actions">
          <BaseButton
            :href="whatsappLink('Halo BikinBadjoe! Saya mau order sablon custom.')"
            external
            icon="whatsapp"
            size="lg"
          >
            {{ t('hero.ctaPrimary') }}
          </BaseButton>
          <BaseButton :to="localePath('/services')" variant="outline" size="lg" icon-right="arrow-right">
            {{ t('hero.ctaSecondary') }}
          </BaseButton>
        </div>

        <ul v-reveal="360" class="hero__badges">
          <li v-for="b in badges" :key="b" class="hero__badge">
            <BaseIcon name="check" :size="16" />{{ b }}
          </li>
        </ul>
      </div>

      <div class="hero__media" v-reveal="200">
        <div class="hero__frame hero__frame--main">
          <NuxtImg
            src="/images/gallery/hasil-sablon.jpg"
            alt="Hasil sablon BikinBadjoe"
            width="620"
            height="775"
            sizes="sm:80vw md:50vw lg:600px"
            loading="eager"
            class="hero__img"
          />
        </div>
        <div class="hero__frame hero__frame--sub">
          <NuxtImg
            src="/images/process/print.jpg"
            alt="Proses sablon di workshop"
            width="300"
            height="440"
            sizes="sm:40vw md:220px"
            class="hero__img"
          />
        </div>
        <div class="hero__sticker hero__sticker--1">All You Can Print</div>
        <div class="hero__sticker hero__sticker--2">Sablon Satuan</div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  overflow: hidden;
  padding-block: $space-8 $space-9;

  &__glow {
    position: absolute;
    top: -20%;
    right: -10%;
    width: 60vw;
    height: 60vw;
    max-width: 720px;
    max-height: 720px;
    background: radial-gradient(circle, rgba($color-primary, 0.35), transparent 62%);
    filter: blur(20px);
    pointer-events: none;
  }

  &__inner {
    position: relative;
    display: grid;
    gap: $space-7;
    align-items: center;

    @include up(lg) {
      grid-template-columns: 1.05fr 0.95fr;
      gap: $space-6;
    }
  }

  &__kicker {
    @include kicker;
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    color: $color-primary-400;
    margin-bottom: $space-5;

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-primary;
    }
  }

  &__title {
    @include display($fs-hero);
    display: flex;
    flex-direction: column;
    color: $color-cream;
    margin-bottom: $space-5;
  }

  &__line {
    display: block;

    &--accent {
      margin-top: 0.1em;
    }
  }

  &__mark {
    display: inline-block;
    background: $color-primary;
    color: $color-white;
    padding: 0 0.18em;
    transform: rotate(-2deg);
    box-shadow: $shadow-primary;
  }

  &__subtitle {
    max-width: 34rem;
    font-size: $fs-lead;
    color: $text-muted;
    margin-bottom: $space-6;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $space-3;
    margin-bottom: $space-6;
  }

  &__badges {
    display: flex;
    flex-wrap: wrap;
    gap: $space-3 $space-5;
    list-style: none;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    font-family: $font-heading;
    font-weight: $fw-semibold;
    font-size: $fs-sm;
    color: $color-cream;

    svg {
      color: $color-sticker-green;
    }
  }

  // --- Media collage ---
  &__media {
    position: relative;
    aspect-ratio: 4 / 5;
    max-width: 560px;
    margin-inline: auto;
    width: 100%;
  }

  &__frame {
    position: absolute;
    border-radius: $radius-lg;
    overflow: hidden;
    border: 3px solid $color-cream;
    box-shadow: $shadow-lg;

    &--main {
      inset: 0 10% 8% 0;
      transform: rotate(2deg);
    }

    &--sub {
      width: 42%;
      left: 0;
      bottom: 0;
      transform: rotate(-5deg);
      z-index: 2;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__sticker {
    position: absolute;
    z-index: 3;
    font-family: $font-heading;
    font-weight: $fw-black;
    font-size: $fs-sm;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    padding: 0.5rem 0.9rem;
    border-radius: $radius-pill;
    color: $color-ink;
    box-shadow: $shadow-md;
    animation: float 6s $ease-in-out infinite;

    &--1 {
      top: 4%;
      right: 2%;
      background: $color-sticker-yellow;
      --rot: 6deg;
      transform: rotate(6deg);
    }

    &--2 {
      top: 42%;
      right: -4%;
      background: $color-cream;
      --rot: -4deg;
      transform: rotate(-4deg);
      animation-delay: 1.2s;
    }
  }
}
</style>
