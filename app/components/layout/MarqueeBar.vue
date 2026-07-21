<script setup lang="ts">
const { tm, rt } = useI18n()

// marquee is an array in locale files
const items = computed(() => (tm('marquee') as unknown[]).map((m) => rt(m as string)))
const loop = computed(() => [...items.value, ...items.value])
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <span v-for="(item, i) in loop" :key="i" class="marquee__item">
        {{ item }}
        <BaseIcon name="spark" :size="15" class="marquee__spark" />
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.marquee {
  overflow: hidden;
  background: $color-primary;
  color: $color-white;
  border-block: 1px solid rgba($color-ink, 0.2);

  &__track {
    display: flex;
    width: max-content;
    animation: marquee 32s linear infinite;
  }

  &:hover .marquee__track {
    animation-play-state: paused;
  }

  &__item {
    display: inline-flex;
    align-items: center;
    gap: $space-4;
    padding-inline: $space-4;
    font-family: $font-heading;
    font-weight: $fw-extra;
    font-size: $fs-sm;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &__spark {
    opacity: 0.85;
  }
}
</style>
