<script setup lang="ts">
const { t } = useI18n()
const { gallery } = useContentService()
</script>

<template>
  <section class="gallery section">
    <div class="container--wide">
      <SectionHeader :kicker="t('gallery.kicker')" :title="t('gallery.title')" :subtitle="t('gallery.subtitle')" />
      <div class="gallery__grid" v-reveal>
        <figure v-for="(g, i) in gallery" :key="i" class="gallery__item" :class="`gallery__item--${i % 6}`">
          <NuxtImg
            :src="g.src"
            :alt="t(g.altKey)"
            width="500"
            height="500"
            sizes="sm:50vw md:33vw lg:300px"
            class="gallery__img"
          />
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.gallery {
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 180px;
    gap: $space-3;
    margin-top: $space-7;

    @include up(md) {
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 220px;
    }
  }

  &__item {
    overflow: hidden;
    border-radius: $radius-md;
    margin: 0;

    // Editorial masonry-ish emphasis on a couple tiles.
    &--0 {
      grid-row: span 2;
    }
    &--3 {
      @include up(md) {
        grid-column: span 2;
      }
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s $ease-out;

    &:hover {
      transform: scale(1.06);
    }
  }
}
</style>
