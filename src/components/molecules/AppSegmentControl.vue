<script setup lang="ts">
// セグメントコントロール Molecule コンポーネント
// Figma node-id: 520:13298（SegmentControl）
// 画面内の表示コンテンツをフィルタリングするための UI。
// クリックで選択セグメントが切り替わる。
// v-model で親から選択状態を制御可能（双方向）。

import AppSegmentControlItem from '@/components/atoms/AppSegmentControlItem.vue'

// 各セグメントアイテムの型定義
export interface SegmentItem {
  /** 表示ラベル（例: 'すべて'） */
  label: string
  /** 件数（括弧付きで表示。例: 8 → '(8)'） */
  count: number
  /** フィルター識別子（例: 'all', 'published'） */
  value: string
}

defineProps<{
  /** セグメントアイテムの配列 */
  items: SegmentItem[]
}>()

// v-model（省略可）
//   - 省略時: いずれも未選択
//   - 設定時: 指定 value のセグメントがアクティブ
//   - 親が ref を変更すると → 対応セグメントがアクティブに切り替わる（双方向）
const model = defineModel<string | undefined>()
</script>

<template>
  <!-- コンテナ: 高さ 40px、bg-sf-tertiary（#e2e8f0）、4px パディング、6px 角丸 -->
  <div class="flex h-10 bg-[#e2e8f0] rounded-[6px] p-1">
    <AppSegmentControlItem
      v-for="item in items"
      :key="item.value"
      :label="item.label"
      :count="item.count"
      :selected="model === item.value"
      @click="model = item.value"
    />
  </div>
</template>
