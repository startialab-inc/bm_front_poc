<script setup lang="ts">
import { computed } from 'vue'

// バリアントの型定義
type Variant = 'ghost' | 'primary' | 'submit' | 'destructive' | 'secondary' | 'sort' | 'filter'
type Size = 'sm' | 'md'

const props = withDefaults(defineProps<{
  /** ボタンのバリアント */
  variant: Variant
  /** ボタンのラベル */
  label?: string
  /** サイズ（ghost は sm、それ以外は md がデフォルト） */
  size?: Size
  /** Font Awesome アイコン名（fa-{name} 形式で指定）：ボタン左側 */
  iconLeft?: string
  /** Font Awesome アイコン名（fa-{name} 形式で指定）：ボタン右側 */
  iconRight?: string
  /** 無効状態 */
  disabled?: boolean
}>(), {
  disabled: false,
})

// sort / filter のデフォルトラベル
const effectiveLabel = computed(() => {
  if (props.label) return props.label
  if (props.variant === 'sort') return '更新日順に表示'
  if (props.variant === 'filter') return '絞り込み検索'
  return ''
})

// sort / filter のデフォルト右アイコン
const effectiveIconRight = computed(() => {
  if (props.iconRight) return props.iconRight
  if (props.variant === 'sort') return 'arrow-down-wide-short'
  if (props.variant === 'filter') return 'sliders'
  return ''
})

const effectiveIconLeft = computed(() => props.iconLeft ?? '')

const hasLeftIcon = computed(() => !!effectiveIconLeft.value)
const hasRightIcon = computed(() => !!effectiveIconRight.value)

// ghost / sort / filter はアイコンあり系
const isGhostStyle = computed(() =>
  props.variant === 'ghost' || props.variant === 'sort' || props.variant === 'filter'
)

// 実効サイズ（ghost は sm、それ以外は md）
const effectiveSize = computed((): Size => {
  if (props.size) return props.size
  return props.variant === 'ghost' ? 'sm' : 'md'
})

// ベースクラス（全バリアント共通）
// outline-none は各バリアントで管理するため除外（secondary の outline と競合するため）
const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg text-sm cursor-pointer border-0 disabled:cursor-not-allowed'

// サイズクラス
const sizeClasses = computed(() => ({
  sm: 'h-8 py-1 pl-3 pr-4',  // 32px / padding: 4px 16px 4px 12px
  md: 'h-10',                 // 40px
})[effectiveSize.value])

// md サイズのパディング（ghost 系と filled 系で異なる）
const paddingClasses = computed(() => {
  if (effectiveSize.value === 'sm') return ''
  // ghost 系 md（sort / filter）
  if (isGhostStyle.value) return 'py-1 pl-3 pr-4'
  // filled 系 md（primary / submit / destructive / secondary）
  return 'py-2 px-4'
})

// バリアントクラス
const variantClasses = computed(() => {
  switch (props.variant) {
    case 'ghost':
      return [
        'bg-transparent text-text-primary font-normal leading-none outline-none',
        'hover:bg-brand-50 hover:text-text-brand hover:font-bold',
        'focus:bg-brand-50 focus:text-text-brand focus:font-bold focus:outline focus:outline-1 focus:outline-brand-500',
        'disabled:bg-transparent disabled:text-text-disable disabled:font-normal',
      ].join(' ')

    case 'sort':
    case 'filter':
      return [
        'bg-transparent text-text-brand font-normal leading-none outline-none',
        'hover:bg-brand-50',
        'focus:bg-brand-50 focus:outline-none',
        'disabled:bg-transparent disabled:text-text-disable',
      ].join(' ')

    case 'primary':
      return [
        'bg-btn-primary text-text-white font-medium leading-5 outline-none',
        'hover:bg-btn-primary-hover',
        'focus:bg-btn-primary-focus focus:outline-none',
        'disabled:bg-btn-disable',
      ].join(' ')

    case 'submit':
      return [
        'bg-btn-submit text-text-white font-medium leading-5 outline-none',
        'hover:bg-btn-submit-hover',
        'focus:bg-btn-submit-focus focus:outline-none',
        'disabled:bg-btn-disable',
      ].join(' ')

    case 'destructive':
      return [
        'bg-btn-destructive text-text-white font-medium leading-5 outline-none',
        'hover:bg-btn-destructive-hover',
        'focus:bg-btn-destructive-focus focus:outline-none',
        'disabled:bg-btn-disable',
      ].join(' ')

    case 'secondary':
      return [
        'bg-surface-primary text-brand-800 font-medium leading-5 outline outline-1 outline-brand-800',
        'hover:bg-surface-secondary-hover',
        'focus:bg-surface-secondary-hover focus:outline-0',
        'disabled:bg-transparent disabled:text-text-disable disabled:outline-border-disable',
      ].join(' ')

    default:
      return ''
  }
})

// アイコンの色クラス（disabled 時は props を参照して直接制御）
const iconColorClass = computed(() => {
  if (props.disabled) return 'text-icon-disable'
  switch (props.variant) {
    case 'ghost':
      return 'text-icon-primary'
    case 'sort':
    case 'filter':
      return 'text-icon-brand'
    default:
      return ''
  }
})
</script>

<template>
  <button
    :disabled="disabled"
    :class="[baseClasses, sizeClasses, paddingClasses, variantClasses]"
    v-bind="$attrs"
  >
    <!-- 左アイコン -->
    <i
      v-if="hasLeftIcon"
      :class="['fa-solid', `fa-${effectiveIconLeft}`, 'text-base', iconColorClass]"
      aria-hidden="true"
    />
    <!-- ラベル -->
    <span>{{ effectiveLabel }}</span>
    <!-- 右アイコン -->
    <i
      v-if="hasRightIcon"
      :class="['fa-solid', `fa-${effectiveIconRight}`, 'text-base', iconColorClass]"
      aria-hidden="true"
    />
  </button>
</template>
