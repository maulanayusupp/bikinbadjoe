<script setup lang="ts">
const { t } = useI18n()
const { testimonials } = useContentService()
</script>

<template>
  <section class="tst section">
    <div class="container--wide">
      <SectionHeader :kicker="t('testimonials.kicker')" :title="t('testimonials.title')" align="center" />
      <ul class="tst__grid">
        <li v-for="(item, i) in testimonials" :key="item.id" v-reveal="(i % 2) * 100" class="tst-card">
          <BaseIcon name="sparkles" :size="22" class="tst-card__mark" />
          <blockquote class="tst-card__quote">"{{ t(`${item.i18n}.quote`) }}"</blockquote>
          <figcaption class="tst-card__author">— {{ t(`${item.i18n}.author`) }}</figcaption>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.tst {
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-4;
    margin-top: $space-7;
    list-style: none;

    @include up(md) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.tst-card {
  @include surface;
  padding: $space-6;
  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__mark {
    color: $color-primary-400;
  }

  &__quote {
    font-family: $font-heading;
    font-weight: $fw-semibold;
    font-size: $fs-h3;
    line-height: 1.4;
    color: $color-cream;
    text-wrap: pretty;
  }

  &__author {
    font-size: $fs-sm;
    color: $text-muted;
    font-weight: $fw-medium;
  }
}
</style>
