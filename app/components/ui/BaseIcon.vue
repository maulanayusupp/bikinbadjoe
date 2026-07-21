<script setup lang="ts">
import { ICONS, type IconName } from '~/utils/icons'

const props = withDefaults(
  defineProps<{
    name: IconName
    size?: number | string
    label?: string
  }>(),
  { size: 24 },
)

const paths = computed(() => ICONS[props.name] ?? [])
</script>

<template>
  <svg
    class="icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    :aria-hidden="label ? undefined : true"
    :aria-label="label"
    :role="label ? 'img' : undefined"
    v-html="paths.join('')"
  />
</template>

<style scoped lang="scss">
.icon {
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
}
</style>
