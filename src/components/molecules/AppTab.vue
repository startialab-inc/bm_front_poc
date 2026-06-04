<script setup lang="ts">
// タブナビゲーション Molecule コンポーネント
// Figma node-id: 849:2467（Tab）
// AppTabItem を並べてタブ切り替え UI を提供する。
// v-model で親から選択タブを双方向制御可能。

import AppTabItem from '@/components/atoms/AppTabItem.vue'

// 各タブアイテムの型定義
export interface TabItem {
  /** 表示ラベル（例: '基本情報'） */
  label: string
  /** 識別子（modelValue との比較に使用） */
  value: string
}

defineProps<{
  /** タブアイテムの配列 */
  items: TabItem[]
}>()

// v-model（選択中タブの value）
//   - 対応タブが selected=true でレンダリングされる
//   - クリックで value が更新される（双方向）
const model = defineModel<string>()
</script>

<template>
  <!-- コンテナ: flex row、下部ボーダー（divider-primary: #e5e5e5） -->
  <div class="flex border-b border-[#e5e5e5]">
    <AppTabItem
      v-for="item in items"
      :key="item.value"
      :label="item.label"
      :selected="model === item.value"
      @click="model = item.value"
    />
  </div>
</template>
