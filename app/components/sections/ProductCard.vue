<script setup lang="ts">
import type { StoreProduct } from '~/services/commerce.service'

const props = defineProps<{ product: StoreProduct }>()

const { t } = useI18n()
const { add } = useCart()

const justAdded = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

function addToCart() {
  add(props.product.id)
  justAdded.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (justAdded.value = false), 1400)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <article class="pcard">
    <div class="pcard__media">
      <span v-if="product.badge" class="pcard__badge" :class="`is-${product.badge}`">
        {{ t(`store.badges.${product.badge}`) }}
      </span>
      <NuxtImg
        :src="product.image"
        :alt="t(`${product.i18n}.name`)"
        width="440"
        height="520"
        sizes="sm:90vw md:45vw lg:300px"
        class="pcard__img"
      />
    </div>
    <div class="pcard__body">
      <h3 class="pcard__name">{{ t(`${product.i18n}.name`) }}</h3>
      <p class="pcard__desc">{{ t(`${product.i18n}.desc`) }}</p>
      <div class="pcard__foot">
        <div class="pcard__price">
          <span v-if="product.oldPrice" class="pcard__old">{{ formatIDR(product.oldPrice) }}</span>
          <span class="pcard__now">{{ formatIDR(product.price) }}</span>
        </div>
        <button class="pcard__btn" :class="{ 'is-added': justAdded }" @click="addToCart">
          <BaseIcon :name="justAdded ? 'check' : 'arrow-right'" :size="18" />
          <span>{{ justAdded ? t('store.added') : t('store.addToCart') }}</span>
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.pcard {
  display: flex;
  flex-direction: column;
  height: 100%; // fill the stretched grid cell so all cards are equal height
  border-radius: $radius-lg;
  overflow: hidden;
  background: $color-ink;
  border: 1px solid $color-line;
  transition:
    transform $transition-base,
    border-color $transition-base;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba($color-primary, 0.5);

    .pcard__img {
      transform: scale(1.05);
    }
  }

  &__media {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    // Neutral light backdrop so white studio shots and lifestyle photos read
    // consistently across the grid.
    background: $color-cream;
  }

  &__badge {
    position: absolute;
    top: $space-3;
    left: $space-3;
    z-index: 2;
    font-family: $font-heading;
    font-weight: $fw-black;
    font-size: $fs-xs;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 4px 10px;
    border-radius: $radius-pill;
    color: $color-ink;

    &.is-new {
      background: $color-sticker-yellow;
    }
    &.is-best {
      background: $color-sticker-green;
    }
    &.is-sale {
      background: $color-primary;
      color: $color-white;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s $ease-out;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    padding: $space-4;
    flex: 1;
  }

  &__name {
    font-size: $fs-h3;
    font-weight: $fw-bold;
    line-height: 1.2;
    // Reserve a fixed 2-line height so 1- and 2-line titles align across cards.
    min-height: 2.4em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__desc {
    font-size: $fs-sm;
    color: $text-muted;
    // Clamp to 2 lines for uniform card body height.
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 2.6em;
  }

  &__foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-3;
    margin-top: auto; // pin price + button to the bottom on every card
    padding-top: $space-3;
  }

  &__price {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
  }

  &__old {
    font-size: $fs-xs;
    color: $color-cream-dim;
    text-decoration: line-through;
  }

  &__now {
    font-family: $font-heading;
    font-weight: $fw-extra;
    font-size: $fs-lead;
    color: $color-cream;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: $space-1;
    padding: 0.6rem 0.9rem;
    border-radius: $radius-pill;
    background: $color-primary;
    color: $color-white;
    font-family: $font-heading;
    font-weight: $fw-bold;
    font-size: $fs-xs;
    white-space: nowrap;
    transition:
      background $transition-base,
      transform $transition-base;

    &:hover {
      background: $color-primary-400;
      transform: translateY(-1px);
    }

    &.is-added {
      background: $color-sticker-green;
    }
  }
}
</style>
