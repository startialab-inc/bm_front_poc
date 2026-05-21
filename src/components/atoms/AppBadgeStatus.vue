<script setup lang="ts">
import { computed } from 'vue'

// バッジの状態を表す型
type Variant = 'open' | 'close' | 'rebuilding' | 'editing' | 'approved'

const props = withDefaults(defineProps<{
  /** バッジの状態 */
  variant: Variant
  /** 再構築予約日時（variant="rebuilding" のときのみ使用） */
  datetime?: string
}>(), {
  datetime: '',
})

// 背景色マップ（Figma: Badge/PageStatus + Badge/SubStatus）
const bgMap: Record<Variant, string> = {
  open:       'bg-[#10b981]',  // emerald/500
  close:      'bg-[#e2e8f0]',  // bg-sf-tertiary
  rebuilding: 'bg-[#ea580c]',  // bg-btn-submit（オレンジ600）
  editing:    'bg-[#e2e8f0]',  // bg-sf-tertiary
  approved:   'bg-[#fff7ed]',  // bg-caution-light（オレンジ50）
}

// テキスト色マップ
const textMap: Record<Variant, string> = {
  open:       'text-[#fafafa]',  // primary-foreground
  close:      'text-[#0d2144]',  // text-primary
  rebuilding: 'text-[#fafafa]',  // primary-foreground
  editing:    'text-[#0d2144]',  // text-primary
  approved:   'text-[#ea580c]',  // bg-btn-submit（オレンジ）
}

// 横パディングマップ（rebuilding のみ px-1.5）
const pxMap: Record<Variant, string> = {
  open:       'px-2',
  close:      'px-2',
  rebuilding: 'px-1.5',
  editing:    'px-2',
  approved:   'px-2',
}

// ボーダーマップ（Figma で border: 1px solid transparent が指定されている variant のみ）
const borderMap: Record<Variant, string> = {
  open:       'border border-transparent',
  close:      'border border-transparent',
  rebuilding: '',
  editing:    '',
  approved:   'border border-transparent',
}

// ラベルテキスト（computed）
const labelText = computed(() => {
  if (props.variant === 'rebuilding') {
    return props.datetime ? `再構築予約：${props.datetime}` : '再構築予約'
  }
  const labelMap: Record<Exclude<Variant, 'rebuilding'>, string> = {
    open:     '公開中',
    close:    '非公開',
    editing:  '編集中',
    approved: '承認済',
  }
  return labelMap[props.variant]
})
</script>

<template>
  <span
    class="inline-flex items-center h-5 py-1 gap-1 rounded-[6px] text-xs font-normal leading-none"
    :class="[bgMap[variant], textMap[variant], pxMap[variant], borderMap[variant]]"
  >
    <!-- 時計アイコン（rebuilding 状態のみ表示） -->
    <i
      v-if="variant === 'rebuilding'"
      class="fa-solid fa-clock"
      aria-hidden="true"
    />
    <span>{{ labelText }}</span>
  </span>
</template>
