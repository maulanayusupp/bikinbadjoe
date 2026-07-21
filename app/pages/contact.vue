<script setup lang="ts">
const { t } = useI18n()
const { business, socials, locations, whatsappLink } = useBusiness()
usePageSeo({ key: 'contact', path: '/contact' })
</script>

<template>
  <div>
    <PageHero :kicker="t('contact.kicker')" :title="t('contact.title')" :subtitle="t('contact.subtitle')" />

    <section class="section">
      <div class="contact container--wide">
        <div class="contact__cards">
          <a :href="whatsappLink('Halo BikinBadjoe! Saya mau tanya soal order.')" target="_blank" rel="noopener noreferrer" class="contact-card contact-card--primary" v-reveal>
            <BaseIcon name="whatsapp" :size="28" />
            <div>
              <h2 class="contact-card__title">{{ t('contact.whatsappTitle') }}</h2>
              <p class="contact-card__value">{{ business.whatsappDisplay }}</p>
            </div>
            <BaseIcon name="arrow-up-right" :size="22" class="contact-card__arrow" />
          </a>

          <div class="contact-card" v-reveal="80">
            <BaseIcon name="clock" :size="28" />
            <div>
              <h2 class="contact-card__title">{{ t('contact.hoursTitle') }}</h2>
              <p class="contact-card__value">{{ t('contact.hoursValue') }}</p>
            </div>
          </div>

          <div class="contact-card contact-card--socials" v-reveal="160">
            <h2 class="contact-card__title">{{ t('contact.socialTitle') }}</h2>
            <div class="contact-card__socials">
              <a v-for="s in socials" :key="s.id" :href="s.href" target="_blank" rel="noopener noreferrer" class="contact-card__social" :aria-label="s.label">
                <BaseIcon :name="s.icon" :size="20" />
              </a>
            </div>
          </div>

          <p class="contact__note" v-reveal="200">{{ t('contact.formNote') }}</p>

          <ContactForm v-reveal="240" />
        </div>

        <aside class="contact__stores" v-reveal="120">
          <h2 class="contact__stores-title">{{ t('contact.storesTitle') }}</h2>
          <article v-for="l in locations" :key="l.id" class="store">
            <div class="store__head">
              <BaseIcon name="map-pin" :size="20" />
              <h3 class="store__label">{{ l.label }}</h3>
            </div>
            <p class="store__address">{{ l.address }}</p>
            <BaseButton :href="l.maps" external variant="outline" size="md" icon-right="arrow-up-right">
              {{ t('common.getDirections') }}
            </BaseButton>
          </article>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.contact {
  display: grid;
  gap: $space-6;

  @include up(lg) {
    grid-template-columns: 1.1fr 0.9fr;
  }

  &__cards {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__note {
    font-size: $fs-sm;
    color: $text-muted;
    padding: $space-4;
    border-left: 3px solid $color-primary;
    background: $color-ink-800;
    border-radius: 0 $radius-md $radius-md 0;
  }

  &__stores {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__stores-title {
    @include kicker;
    color: $color-cream-dim;
  }
}

.contact-card {
  @include surface;
  display: flex;
  align-items: center;
  gap: $space-4;
  padding: $space-5;
  color: $color-cream;

  svg:first-child {
    color: $color-primary-400;
    flex-shrink: 0;
  }

  &__title {
    font-family: $font-heading;
    font-size: $fs-sm;
    font-weight: $fw-bold;
    color: $text-muted;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  &__value {
    font-size: $fs-h3;
    font-weight: $fw-bold;
    color: $color-cream;
  }

  &__arrow {
    margin-left: auto;
    color: $text-muted;
  }

  &--primary {
    background: $color-primary;
    border-color: $color-primary;
    color: $color-white;
    transition: transform $transition-base;

    svg:first-child,
    .contact-card__title,
    .contact-card__value,
    .contact-card__arrow {
      color: $color-white;
    }
    .contact-card__title {
      opacity: 0.85;
    }

    &:hover {
      transform: translateY(-3px);
    }
  }

  &--socials {
    flex-direction: column;
    align-items: flex-start;
    gap: $space-3;
  }

  &__socials {
    display: flex;
    gap: $space-2;
  }

  &__social {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid $color-line;
    color: $text-muted;
    transition: all $transition-base;

    &:hover {
      background: $color-primary;
      border-color: $color-primary;
      color: $color-white;
    }
  }
}

.store {
  @include surface;
  background: $color-ink-800;
  padding: $space-5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: $space-3;

  &__head {
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
}
</style>
