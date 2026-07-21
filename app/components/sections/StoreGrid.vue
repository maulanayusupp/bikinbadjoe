<script setup lang="ts">
import { STORE_PRODUCTS, STORE_CATEGORIES } from '~/services/commerce.service'

const { t } = useI18n()
const active = ref('all')

const filtered = computed(() =>
  active.value === 'all'
    ? STORE_PRODUCTS
    : STORE_PRODUCTS.filter((p) => p.category === active.value),
)
</script>

<template>
  <section class="store section">
    <div class="container--wide">
      <p class="store__disclaimer" v-reveal>
        <BaseIcon name="spark" :size="16" />{{ t('store.priceDisclaimer') }}
      </p>

      <div class="store__filters" role="tablist">
        <button
          v-for="c in STORE_CATEGORIES"
          :key="c.id"
          class="store__filter"
          :class="{ 'is-active': active === c.id }"
          role="tab"
          :aria-selected="active === c.id"
          @click="active = c.id"
        >
          {{ t(c.i18n) }}
        </button>
      </div>

      <ul class="store__grid">
        <li v-for="(p, i) in filtered" :key="p.id" v-reveal="(i % 4) * 70">
          <ProductCard :product="p" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.store {
  &__disclaimer {
    display: flex;
    align-items: center;
    gap: $space-2;
    font-size: $fs-xs;
    color: $color-cream-dim;
    padding: $space-3 $space-4;
    background: $color-ink-800;
    border: 1px dashed $color-line;
    border-radius: $radius-md;
    margin-bottom: $space-5;

    svg {
      color: $color-primary-400;
      flex-shrink: 0;
    }
  }

  &__filters {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
    margin-bottom: $space-6;
  }

  &__filter {
    padding: 0.5rem 1.1rem;
    border-radius: $radius-pill;
    border: 1px solid $color-line;
    color: $text-muted;
    font-family: $font-heading;
    font-weight: $fw-semibold;
    font-size: $fs-sm;
    transition: all $transition-base;

    &:hover {
      color: $color-cream;
      border-color: rgba($color-cream, 0.4);
    }

    &.is-active {
      background: $color-cream;
      border-color: $color-cream;
      color: $color-ink;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-4;
    list-style: none;

    @include up(md) {
      grid-template-columns: repeat(3, 1fr);
    }
    @include up(xl) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
