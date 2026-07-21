<script setup lang="ts">
import type { IconName } from '~/utils/icons'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'outline' | 'ghost' | 'cream'
    size?: 'md' | 'lg'
    to?: string
    href?: string
    icon?: IconName
    iconRight?: IconName
    block?: boolean
    external?: boolean
  }>(),
  { variant: 'primary', size: 'md' },
)

const NuxtLink = resolveComponent('NuxtLink')

const tag = computed(() => {
  if (props.to) return NuxtLink
  if (props.href) return 'a'
  return 'button'
})

const attrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href)
    return {
      href: props.href,
      target: props.external ? '_blank' : undefined,
      rel: props.external ? 'noopener noreferrer' : undefined,
    }
  return {}
})
</script>

<template>
  <component
    :is="tag"
    v-bind="attrs"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block }]"
  >
    <BaseIcon v-if="icon" :name="icon" :size="size === 'lg' ? 22 : 19" />
    <span class="btn__label"><slot /></span>
    <BaseIcon v-if="iconRight" :name="iconRight" :size="size === 'lg' ? 22 : 19" />
  </component>
</template>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $space-2;
  font-family: $font-heading;
  font-weight: $fw-bold;
  letter-spacing: 0.01em;
  line-height: 1;
  border-radius: $radius-pill;
  border: 2px solid transparent;
  transition:
    transform $transition-base,
    background $transition-base,
    color $transition-base,
    box-shadow $transition-base,
    border-color $transition-base;

  &--md {
    padding: 0.85rem 1.5rem;
    font-size: $fs-sm;
  }
  &--lg {
    padding: 1.05rem 2rem;
    font-size: $fs-body;
  }
  &--block {
    display: flex;
    width: 100%;
  }

  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }

  &--primary {
    background: $color-primary;
    color: $color-white;
    box-shadow: $shadow-primary;

    &:hover {
      background: $color-primary-400;
    }
  }

  &--cream {
    background: $color-cream;
    color: $color-ink;

    &:hover {
      background: $color-white;
    }
  }

  &--outline {
    border-color: $color-line;
    color: $text-base;

    &:hover {
      border-color: $color-cream;
      background: rgba($color-cream, 0.06);
    }
  }

  &--ghost {
    color: $text-base;

    &:hover {
      color: $color-primary-400;
      transform: none;
    }
  }
}
</style>
