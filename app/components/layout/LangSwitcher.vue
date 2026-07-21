<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const available = computed(() => locales.value as { code: string; name: string }[])

function switchTo(code: string) {
  if (code !== locale.value) setLocale(code as 'id' | 'en')
}
</script>

<template>
  <div class="lang" role="group" aria-label="Language">
    <BaseIcon name="globe" :size="16" class="lang__globe" />
    <button
      v-for="l in available"
      :key="l.code"
      class="lang__btn"
      :class="{ 'is-active': l.code === locale }"
      :aria-pressed="l.code === locale"
      @click="switchTo(l.code)"
    >
      {{ l.code.toUpperCase() }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.lang {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px 8px;
  border: 1px solid $color-line;
  border-radius: $radius-pill;

  &__globe {
    color: $text-muted;
    margin-right: 2px;
  }

  &__btn {
    font-family: $font-heading;
    font-weight: $fw-bold;
    font-size: $fs-xs;
    letter-spacing: 0.05em;
    color: $text-muted;
    padding: 3px 8px;
    border-radius: $radius-pill;
    transition:
      color $transition-base,
      background $transition-base;

    &:hover {
      color: $text-base;
    }

    &.is-active {
      color: $color-ink;
      background: $color-cream;
    }
  }
}
</style>
