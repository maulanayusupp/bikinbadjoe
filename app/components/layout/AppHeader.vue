<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { whatsappLink } = useBusiness()
const { count, isOpen } = useCart()

const links = computed(() => [
  { to: localePath('/'), label: t('nav.home') },
  { to: localePath('/shop'), label: t('nav.shop') },
  { to: localePath('/services'), label: t('nav.services') },
  { to: localePath('/order'), label: t('nav.customOrder') },
  { to: localePath('/about'), label: t('nav.about') },
  { to: localePath('/contact'), label: t('nav.contact') },
])

const open = ref(false)
const scrolled = ref(false)
const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const orderMsg = 'Halo BikinBadjoe! Saya mau tanya soal order sablon.'
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled, 'is-open': open }">
    <div class="header__bar container--wide">
      <NuxtLink :to="localePath('/')" class="header__brand" aria-label="BikinBadjoe home">
        <img src="/images/brand/logo-white.png" alt="BikinBadjoe" class="header__logo" width="140" height="20" />
      </NuxtLink>

      <nav class="header__nav" aria-label="Primary">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="header__link">
          {{ l.label }}
        </NuxtLink>
      </nav>

      <div class="header__actions">
        <LangSwitcher class="header__lang" />
        <button class="header__cart" :aria-label="t('cart.title')" @click="isOpen = true">
          <BaseIcon name="bag" :size="22" />
          <span v-if="count" class="header__cart-badge">{{ count }}</span>
        </button>
        <BaseButton
          class="header__cta"
          :href="whatsappLink(orderMsg)"
          external
          icon="whatsapp"
          size="md"
        >
          {{ t('nav.order') }}
        </BaseButton>
        <button
          class="header__burger"
          :aria-expanded="open"
          aria-label="Menu"
          @click="open = !open"
        >
          <BaseIcon :name="open ? 'close' : 'menu'" :size="24" />
        </button>
      </div>
    </div>

    <Transition name="drawer">
      <nav v-if="open" class="header__drawer" aria-label="Mobile">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="header__drawer-link">
          {{ l.label }}
          <BaseIcon name="arrow-up-right" :size="18" />
        </NuxtLink>
        <div class="header__drawer-foot">
          <LangSwitcher />
          <BaseButton :href="whatsappLink(orderMsg)" external icon="whatsapp" block size="lg">
            {{ t('nav.order') }}
          </BaseButton>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: $z-header;
  transition: background $transition-base, border-color $transition-base;
  border-bottom: 1px solid transparent;

  &.is-scrolled {
    background: rgba($color-ink, 0.82);
    backdrop-filter: blur(14px);
    border-bottom-color: $color-line;
  }

  &.is-open {
    background: $color-ink;
  }

  &__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-5;
    height: 74px;
  }

  &__logo {
    height: 22px;
    width: auto;
    display: block;
  }

  &__nav {
    display: none;
    gap: $space-5;

    @include up(lg) {
      display: flex;
    }
  }

  &__link {
    font-family: $font-heading;
    font-weight: $fw-semibold;
    font-size: $fs-sm;
    color: $text-muted;
    position: relative;
    padding-block: 4px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 2px;
      background: $color-primary;
      transition: width $transition-base;
    }

    &:hover {
      color: $text-base;
    }

    &.router-link-active {
      color: $text-base;

      &::after {
        width: 100%;
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-3;
  }

  &__lang {
    display: none;
    @include up(md) {
      display: inline-flex;
    }
  }

  &__cta {
    display: none;
    @include up(md) {
      display: inline-flex;
    }
  }

  &__cart {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid $color-line;
    color: $text-base;
    transition:
      border-color $transition-base,
      color $transition-base;

    &:hover {
      border-color: $color-cream;
      color: $color-primary-400;
    }
  }

  &__cart-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 20px;
    height: 20px;
    padding: 0 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: $color-primary;
    color: $color-white;
    font-family: $font-heading;
    font-weight: $fw-bold;
    font-size: 11px;
    border-radius: $radius-pill;
    border: 2px solid $color-ink;
  }

  &__burger {
    display: inline-flex;
    color: $text-base;
    @include up(lg) {
      display: none;
    }
  }

  &__drawer {
    display: flex;
    flex-direction: column;
    padding: $space-4 $space-5 $space-6;
    gap: $space-1;
    border-top: 1px solid $color-line;

    @include up(lg) {
      display: none;
    }
  }

  &__drawer-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $space-4 0;
    font-family: $font-heading;
    font-weight: $fw-bold;
    font-size: $fs-h3;
    border-bottom: 1px solid $color-line;
    color: $text-base;

    &:hover {
      color: $color-primary-400;
    }
  }

  &__drawer-foot {
    display: flex;
    flex-direction: column;
    gap: $space-4;
    margin-top: $space-5;
  }
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
