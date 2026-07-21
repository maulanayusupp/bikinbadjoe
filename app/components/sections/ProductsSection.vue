<script setup lang="ts">
const { t } = useI18n()
const { products } = useContentService()
</script>

<template>
  <section class="products section">
    <div class="container--wide">
      <SectionHeader :kicker="t('products.kicker')" :title="t('products.title')" :subtitle="t('products.subtitle')" />

      <ul class="products__grid">
        <li v-for="(p, i) in products" :key="p.id" v-reveal="(i % 3) * 90" class="product-card">
          <div class="product-card__media">
            <NuxtImg
              :src="p.image"
              :alt="t(`${p.i18n}.name`)"
              width="440"
              height="520"
              sizes="sm:90vw md:45vw lg:400px"
              class="product-card__img"
            />
          </div>
          <div class="product-card__body">
            <h3 class="product-card__name">{{ t(`${p.i18n}.name`) }}</h3>
            <p class="product-card__desc">{{ t(`${p.i18n}.desc`) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.products {
  background: $color-ink-800;

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-5;
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

.product-card {
  border-radius: $radius-lg;
  overflow: hidden;
  background: $color-ink;
  border: 1px solid $color-line;
  transition: transform $transition-base;

  &:hover {
    transform: translateY(-4px);

    .product-card__img {
      transform: scale(1.05);
    }
  }

  &__media {
    aspect-ratio: 4 / 5;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s $ease-out;
  }

  &__body {
    padding: $space-5;
  }

  &__name {
    font-size: $fs-h3;
    font-weight: $fw-bold;
    margin-bottom: $space-2;
  }

  &__desc {
    font-size: $fs-sm;
    color: $text-muted;
  }
}
</style>
