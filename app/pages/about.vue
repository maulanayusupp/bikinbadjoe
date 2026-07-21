<script setup lang="ts">
const { t } = useI18n()
const { milestones, values } = useContentService()
usePageSeo({ key: 'about', path: '/about' })

const profileRows = ['name', 'field', 'founded', 'products', 'services'] as const
</script>

<template>
  <div>
    <PageHero :kicker="t('about.kicker')" :title="t('about.title')" />

    <section class="section">
      <div class="about-intro container--wide">
        <div class="about-intro__text">
          <p v-reveal class="about-intro__lead">{{ t('about.intro') }}</p>
          <p v-reveal="120" class="about-intro__body">{{ t('about.story') }}</p>
        </div>
        <figure v-reveal="160" class="about-intro__media">
          <NuxtImg src="/images/process/jahit.jpg" :alt="t('about.title')" width="520" height="620" class="about-intro__img" />
        </figure>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section timeline-section">
      <div class="container--wide">
        <ol class="timeline">
          <li v-for="(m, i) in milestones" :key="m.id" v-reveal="i * 120" class="timeline__item">
            <span class="timeline__year">{{ t(`${m.i18n}.year`) }}</span>
            <p class="timeline__label">{{ t(`${m.i18n}.label`) }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Values -->
    <section class="section">
      <div class="container--wide">
        <SectionHeader :title="t('about.valuesTitle')" align="center" />
        <ul class="values">
          <li v-for="(v, i) in values" :key="v.id" v-reveal="i * 90" class="value-card">
            <span class="value-card__icon"><BaseIcon :name="v.icon" :size="24" /></span>
            <h3 class="value-card__title">{{ t(`${v.i18n}.title`) }}</h3>
            <p class="value-card__desc">{{ t(`${v.i18n}.desc`) }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Company profile table -->
    <section class="section profile-section">
      <div class="container--wide">
        <SectionHeader :title="t('about.profileTitle')" />
        <dl class="profile" v-reveal>
          <div v-for="row in profileRows" :key="row" class="profile__row">
            <dt class="profile__key">{{ t(`about.profile.${row}`) }}</dt>
            <dd class="profile__val">{{ t(`about.profile.${row}Value`) }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <CtaSection />
  </div>
</template>

<style scoped lang="scss">
.about-intro {
  display: grid;
  gap: $space-6;
  align-items: center;

  @include up(lg) {
    grid-template-columns: 1.2fr 0.8fr;
  }

  &__lead {
    font-family: $font-heading;
    font-weight: $fw-semibold;
    font-size: $fs-h2;
    line-height: 1.35;
    color: $color-cream;
    margin-bottom: $space-4;
    text-wrap: pretty;
  }

  &__body {
    font-size: $fs-lead;
    color: $text-muted;
  }

  &__media {
    margin: 0;
    border-radius: $radius-lg;
    overflow: hidden;
    border: 3px solid $color-cream;
    transform: rotate(2deg);
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.timeline-section {
  background: $color-ink-800;
  border-block: 1px solid $color-line;
}

.timeline {
  display: grid;
  gap: $space-5;
  list-style: none;

  @include up(md) {
    grid-template-columns: repeat(3, 1fr);
  }

  &__item {
    padding-top: $space-4;
    border-top: 3px solid $color-primary;
  }

  &__year {
    @include display(2.6rem);
    color: $color-primary-400;
    display: block;
    margin-bottom: $space-2;
  }

  &__label {
    color: $text-muted;
  }
}

.values {
  display: grid;
  gap: $space-4;
  margin-top: $space-7;
  list-style: none;

  @include up(md) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.value-card {
  @include surface;
  padding: $space-6;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-3;

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba($color-primary, 0.14);
    color: $color-primary-400;
  }

  &__title {
    font-size: $fs-h3;
    font-weight: $fw-bold;
  }

  &__desc {
    font-size: $fs-sm;
    color: $text-muted;
  }
}

.profile {
  margin-top: $space-6;
  border: 1px solid $color-line;
  border-radius: $radius-lg;
  overflow: hidden;

  &__row {
    display: grid;
    grid-template-columns: 1fr;
    border-bottom: 1px solid $color-line;

    @include up(md) {
      grid-template-columns: 0.4fr 0.6fr;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  &__key {
    padding: $space-4 $space-5;
    font-family: $font-heading;
    font-weight: $fw-bold;
    color: $color-cream;
    background: $color-ink-800;
  }

  &__val {
    padding: $space-4 $space-5;
    color: $text-muted;
    margin: 0;
  }
}
</style>
