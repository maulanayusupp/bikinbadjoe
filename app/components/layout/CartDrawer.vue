<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { isOpen, detailed, subtotal, count, setQty, remove, clear } = useCart()

function close() {
  isOpen.value = false
}

// Lock body scroll while open.
watch(isOpen, (open) => {
  if (import.meta.client) document.body.style.overflow = open ? 'hidden' : ''
})
onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isOpen" class="cart-backdrop" @click="close" />
      </Transition>
      <Transition name="slide">
        <aside v-if="isOpen" class="cart" role="dialog" aria-modal="true" :aria-label="t('cart.title')">
          <header class="cart__head">
            <h2 class="cart__title">{{ t('cart.title') }} <span v-if="count">({{ count }})</span></h2>
            <button class="cart__close" :aria-label="t('cart.close')" @click="close">
              <BaseIcon name="close" :size="22" />
            </button>
          </header>

          <div v-if="detailed.length" class="cart__body">
            <div v-for="{ line, product } in detailed" :key="line.id" class="citem">
              <NuxtImg :src="product.image" :alt="t(`${product.i18n}.name`)" width="90" height="110" class="citem__img" />
              <div class="citem__info">
                <p class="citem__name">{{ t(`${product.i18n}.name`) }}</p>
                <p class="citem__price">{{ formatIDR(product.price) }}</p>
                <div class="citem__controls">
                  <div class="stepper">
                    <button :aria-label="'-'" @click="setQty(line.id, line.qty - 1)">−</button>
                    <span>{{ line.qty }}</span>
                    <button :aria-label="'+'" @click="setQty(line.id, line.qty + 1)">+</button>
                  </div>
                  <button class="citem__remove" @click="remove(line.id)">{{ t('cart.remove') }}</button>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="cart__empty">
            <BaseIcon name="shirt" :size="40" />
            <p>{{ t('cart.empty') }}</p>
            <BaseButton :to="localePath('/shop')" variant="outline" icon-right="arrow-right" @click="close">
              {{ t('cart.startShopping') }}
            </BaseButton>
          </div>

          <footer v-if="detailed.length" class="cart__foot">
            <div class="cart__subtotal">
              <span>{{ t('cart.subtotal') }}</span>
              <strong>{{ formatIDR(subtotal) }}</strong>
            </div>
            <BaseButton :to="localePath('/checkout')" icon-right="arrow-right" block size="lg" @click="close">
              {{ t('cart.checkout') }}
            </BaseButton>
            <button class="cart__clear" @click="clear">{{ t('cart.clear') }}</button>
          </footer>
        </aside>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<style scoped lang="scss">
.cart-backdrop {
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
}

.cart {
  position: fixed;
  top: 0;
  right: 0;
  z-index: $z-modal;
  width: min(420px, 92vw);
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: $color-ink-800;
  border-left: 1px solid $color-line;
  box-shadow: $shadow-lg;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $space-5;
    border-bottom: 1px solid $color-line;
  }

  &__title {
    font-size: $fs-h3;
    font-weight: $fw-extra;
    color: $color-cream;
  }

  &__close {
    color: $text-muted;
    &:hover {
      color: $color-cream;
    }
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: $space-4 $space-5;
    display: flex;
    flex-direction: column;
    gap: $space-4;
    @include thin-scrollbar;
  }

  &__empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $space-4;
    color: $text-muted;
    padding: $space-6;
    text-align: center;

    svg {
      color: $color-primary-400;
    }
  }

  &__foot {
    padding: $space-5;
    border-top: 1px solid $color-line;
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__subtotal {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    color: $text-muted;

    strong {
      font-family: $font-heading;
      font-size: $fs-h3;
      color: $color-cream;
    }
  }

  &__clear {
    align-self: center;
    font-size: $fs-sm;
    color: $text-muted;
    text-decoration: underline;
    &:hover {
      color: $color-primary-400;
    }
  }
}

.citem {
  display: flex;
  gap: $space-3;

  &__img {
    width: 74px;
    height: 92px;
    object-fit: cover;
    border-radius: $radius-md;
    flex-shrink: 0;
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__name {
    font-family: $font-heading;
    font-weight: $fw-semibold;
    font-size: $fs-sm;
    color: $color-cream;
  }

  &__price {
    font-size: $fs-sm;
    color: $color-primary-400;
  }

  &__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
  }

  &__remove {
    font-size: $fs-xs;
    color: $text-muted;
    text-decoration: underline;
    &:hover {
      color: $color-primary-400;
    }
  }
}

.stepper {
  display: inline-flex;
  align-items: center;
  border: 1px solid $color-line;
  border-radius: $radius-pill;
  overflow: hidden;

  button {
    width: 28px;
    height: 28px;
    color: $color-cream;
    font-size: $fs-body;
    &:hover {
      background: $color-ink-600;
    }
  }

  span {
    min-width: 28px;
    text-align: center;
    font-size: $fs-sm;
    color: $color-cream;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s $ease-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
