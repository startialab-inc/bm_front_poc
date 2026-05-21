<script setup lang="ts">
// タブナビゲーション子要素コンポーネント（Atom）
// Figma node-id: 849:2330（TabChild）
// 選択状態（div）と非選択状態（button）で要素タグを使い分ける。

defineProps<{
  /** タブラベル（例: 'タブ1'） */
  label: string
  /** 選択状態 */
  selected: boolean
}>()

defineEmits<{
  /** 非選択状態のボタンクリック時に発火 */
  click: []
}>()
</script>

<template>
  <!-- 選択中: div 要素・下部ブランド色ボーダー・テキスト primary -->
  <div
    v-if="selected"
    class="bg-white flex h-11 w-[204px] items-start border-b-2 border-[#2862cb]"
  >
    <div class="flex flex-1 items-center justify-center pt-[2px] h-full">
      <p class="flex-1 text-center text-[14px] font-medium leading-[20px] text-[#0d2144]">{{ label }}</p>
    </div>
  </div>

  <!-- 非選択: button 要素・下線なし・テキスト secondary -->
  <button
    v-else
    type="button"
    class="bg-white flex h-11 w-[204px] items-start"
    @click="$emit('click')"
  >
    <div class="flex flex-1 items-center justify-center pt-[2px] h-full">
      <p class="flex-1 text-center text-[14px] font-medium leading-[20px] text-[#64748b]">{{ label }}</p>
    </div>
  </button>
</template>
