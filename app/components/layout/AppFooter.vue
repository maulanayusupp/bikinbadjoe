<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { business, socials, locations, whatsappLink } = useBusiness()

const explore = computed(() => [
  { to: localePath('/'), label: t('nav.home') },
  { to: localePath('/services'), label: t('nav.services') },
  { to: localePath('/products'), label: t('nav.products') },
  { to: localePath('/about'), label: t('nav.about') },
  { to: localePath('/contact'), label: t('nav.contact') },
])

const legal = computed(() => [
  { to: localePath('/privacy'), label: t('meta.privacy.title') },
  { to: localePath('/terms'), label: t('meta.terms.title') },
  { to: localePath('/shipping'), label: t('meta.shipping.title') },
])

const year = 2026
</script>

<template>
  <footer class="footer">
    <div class="footer__top container--wide">
      <div class="footer__brand">
        <img src="/images/brand/logo-white.png" alt="BikinBadjoe" class="footer__logo" width="180" height="26" />
        <p class="footer__tagline">{{ t('footer.tagline') }}</p>
        <div class="footer__socials">
          <a
            v-for="s in socials"
            :key="s.id"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social"
            :aria-label="s.label"
          >
            <BaseIcon :name="s.icon" :size="20" />
          </a>
        </div>
      </div>

      <nav class="footer__col" aria-label="Explore">
        <h3 class="footer__heading">{{ t('footer.explore') }}</h3>
        <NuxtLink v-for="l in explore" :key="l.to" :to="l.to" class="footer__link">{{ l.label }}</NuxtLink>
      </nav>

      <nav class="footer__col" aria-label="Legal">
        <h3 class="footer__heading">{{ t('footer.legal') }}</h3>
        <NuxtLink v-for="l in legal" :key="l.to" :to="l.to" class="footer__link">{{ l.label }}</NuxtLink>
      </nav>

      <div class="footer__col">
        <h3 class="footer__heading">{{ t('contact.storesTitle') }}</h3>
        <address class="footer__stores">
          <a
            v-for="loc in locations"
            :key="loc.id"
            :href="loc.maps"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__store"
          >
            <BaseIcon name="map-pin" :size="18" />
            <span>{{ loc.address }}</span>
          </a>
          <a :href="whatsappLink()" target="_blank" rel="noopener noreferrer" class="footer__store">
            <BaseIcon name="whatsapp" :size="18" />
            <span>{{ business.whatsappDisplay }}</span>
          </a>
        </address>
      </div>
    </div>

    <div class="footer__bottom container--wide">
      <p>© {{ year }} {{ business.legalName }}. {{ t('footer.rights') }}</p>
      <p class="footer__made">{{ t('footer.madeWith') }}</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: $color-ink-800;
  border-top: 1px solid $color-line;
  padding-top: $space-8;

  &__top {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-7;
    padding-bottom: $space-7;

    @include up(md) {
      grid-template-columns: 1.6fr 1fr 1fr 1.4fr;
    }
  }

  &__logo {
    height: 26px;
    width: auto;
    margin-bottom: $space-4;
  }

  &__tagline {
    max-width: 24rem;
    color: $text-muted;
    margin-bottom: $space-5;
  }

  &__socials {
    display: flex;
    gap: $space-2;
  }

  &__social {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid $color-line;
    color: $text-muted;
    transition:
      color $transition-base,
      border-color $transition-base,
      background $transition-base,
      transform $transition-base;

    &:hover {
      color: $color-white;
      background: $color-primary;
      border-color: $color-primary;
      transform: translateY(-2px);
    }
  }

  &__col {
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__heading {
    @include kicker;
    color: $color-cream-dim;
    margin-bottom: $space-1;
  }

  &__link {
    color: $text-muted;
    font-size: $fs-sm;
    width: fit-content;

    &:hover {
      color: $color-primary-400;
    }
  }

  &__stores {
    display: flex;
    flex-direction: column;
    gap: $space-3;
    font-style: normal;
  }

  &__store {
    display: flex;
    gap: $space-2;
    color: $text-muted;
    font-size: $fs-sm;
    line-height: 1.4;

    svg {
      flex-shrink: 0;
      color: $color-primary-400;
      margin-top: 2px;
    }

    &:hover {
      color: $text-base;
    }
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    padding-block: $space-5;
    border-top: 1px solid $color-line;
    font-size: $fs-xs;
    color: $color-cream-dim;

    @include up(md) {
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
