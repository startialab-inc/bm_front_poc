<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

type StrengthType = 'short' | 'weak' | 'normal' | 'strong'

const props = defineProps<{
  /** パスワード強度レベル */
  type: StrengthType
}>()

const { t } = useI18n()

// 背景色クラスマップ
const bgClass = computed(() => {
  const map: Record<StrengthType, string> = {
    short:  'bg-red-500',
    weak:   'bg-orange-500',
    normal: 'bg-[#713f12]',
    strong: 'bg-green-500',
  }
  return map[props.type]
})

// 幅クラス（short のみ auto、他は固定 180px）
const widthClass = computed(() =>
  props.type === 'short' ? '' : 'w-[180px]'
)

// ラベルテキスト（i18n 経由）
const label = computed(() =>
  t(`components.AppPasswordStrength.${props.type}`)
)
</script>

<template>
  <div :class="['inline-flex items-center justify-center px-6 py-1', bgClass, widthClass]">
    <p class="text-xs leading-none text-white whitespace-nowrap">{{ label }}</p>
  </div>
</template>
