<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** Font Awesome アイコン名（例: arrow-left） */
  icon: string
  /** アイコン種別クラス（例: fa-solid / fa-regular / fa-brands） */
  fontType?: string
  /** 無効状態 */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  fontType: 'fa-solid',
  disabled: false,
})

const iconClass = computed(() => [
  props.fontType,
  `fa-${props.icon}`,
  'text-sm',
  props.disabled ? 'text-icon-disable' : 'text-icon-primary',
])
</script>

<template>
  <button
    type="button"
    :disabled="props.disabled"
    class="inline-flex items-center justify-center w-8 h-8 rounded-full
           bg-slate-50
           hover:bg-surface-selected
           focus-visible:outline-none focus-visible:bg-surface-selected
           disabled:cursor-not-allowed"
  >
    <i :class="iconClass" />
  </button>
</template>
