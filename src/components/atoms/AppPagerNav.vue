<script setup lang="ts">
// ページネーションのナビゲーション矢印ボタン Atom
// Figma: Pagination（932:25039）のナビゲーション矢印部分
// type に応じてアイコン・disabled 判定・emit 値が自動決定する。

import { computed } from 'vue'

// ナビゲーションボタンの種別
export type NavType = 'first' | 'prev' | 'next' | 'last'

const props = defineProps<{
  /** ボタン種別（アイコン・動作を決定） */
  type: NavType
  /** 現在ページ（1-indexed） */
  current: number
  /** 総ページ数 */
  total: number
  /** 明示的な無効化（省略時は type+current+total から自動判定） */
  disabled?: boolean
}>()

const emit = defineEmits<{
  /** クリック時に type を渡す（ページ計算は親コンポーネントに委譲） */
  click: [type: NavType]
}>()

// type → FontAwesome アイコンクラスのマップ
const iconMap: Record<NavType, string> = {
  first: 'fa-angles-left',
  prev: 'fa-angle-left',
  next: 'fa-angle-right',
  last: 'fa-angles-right',
}

const icon = computed(() => iconMap[props.type])

// disabled 判定: 明示的な無効化 or ページ位置による自動判定
const isDisabled = computed(() => {
  if (props.disabled) return true
  if (props.type === 'first' || props.type === 'prev') return props.current <= 1
  return props.current >= props.total
})

const handleClick = () => {
  if (!isDisabled.value) {
    emit('click', props.type)
  }
}
</script>

<template>
  <button
    type="button"
    :disabled="isDisabled"
    :class="[
      'flex items-center justify-center',
      isDisabled
        ? 'cursor-not-allowed text-[#cbd5e1]'
        : 'cursor-pointer text-[#0d2144] hover:opacity-70',
    ]"
    @click="handleClick"
  >
    <i :class="`fa-solid ${icon} text-sm`" />
  </button>
</template>
