<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'landscape' | 'portrait' | 'square'
  }>(),
  { variant: 'landscape' }
)

// バリアントごとの表示寸法（Figma 仕様）
const dimensions: Record<string, { width: number; height: number }> = {
  landscape: { width: 160, height: 48 },
  portrait: { width: 160, height: 170 },
  square: { width: 40, height: 40 },
}

// variant の変化に追従するため computed で定義する
const src = computed(() => `${import.meta.env.BASE_URL}assets/images/logo/logo-${props.variant}.svg`)
const dim = computed(() => dimensions[props.variant])
</script>

<template>
  <img
    :src="src"
    :width="dim.width"
    :height="dim.height"
    :alt="`BlueMonkey logo (${variant})`"
    class="block"
  />
</template>
