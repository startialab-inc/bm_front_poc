<script setup lang="ts">
// セグメントコントロール子要素コンポーネント（Atom）
// Figma node-id: 520:13248（SegmentControlChild）
// 選択状態（div）と非選択状態（button）で要素タグを使い分ける。

defineProps<{
  /** タブラベル（例: 'すべて'） */
  label: string
  /** 件数（括弧付きで表示。例: 8 → '(8)'） */
  count: number
  /** 選択状態 */
  selected: boolean
}>()

defineEmits<{
  /** 非選択状態のボタンクリック時に発火 */
  click: []
}>()
</script>

<template>
  <!-- 選択中: div 要素・白背景・6px 角丸 -->
  <div
    v-if="selected"
    class="flex items-center justify-center gap-1 px-2 py-1 h-[31px] bg-white border border-[rgba(255,255,255,0)] rounded-[6px] flex-1"
  >
    <p class="text-[14px] font-medium leading-[20px] text-[#0d2144] whitespace-nowrap">{{ label }}</p>
    <div class="h-[20px] min-w-[20px] flex items-center justify-center px-1 overflow-hidden">
      <p class="text-[12px] font-semibold leading-[16px] text-[#64748b] whitespace-nowrap">({{ count }})</p>
    </div>
  </div>

  <!-- 非選択: button 要素・透明背景・8px 角丸 -->
  <button
    v-else
    type="button"
    class="flex items-center justify-center gap-1 px-2 py-1 h-[31px] bg-transparent rounded-[8px] flex-1"
    @click="$emit('click')"
  >
    <p class="text-[14px] font-medium leading-[20px] text-[#64748b] whitespace-nowrap">{{ label }}</p>
    <div class="h-[20px] min-w-[20px] flex items-center justify-center px-1 overflow-hidden">
      <p class="text-[12px] font-semibold leading-[16px] text-[#64748b] whitespace-nowrap">({{ count }})</p>
    </div>
  </button>
</template>
