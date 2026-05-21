<script setup lang="ts">
// タグバッジコンポーネント（Atom）
// Figma node-id: 621:17779（Badge/Tag）
// 単一バリアント。表示するテキストを label prop で受け取る。

defineProps<{
  /** バッジに表示するテキスト */
  label: string
}>()
</script>

<template>
  <!-- タグバッジ: 白背景・グレー枠 1px・border-radius 2px・10px テキスト -->
  <span
    class="inline-flex items-center justify-center px-[6px] py-[1px] rounded-[2px] border border-[#e5e5e5] bg-white text-[10px] font-normal leading-[16px] text-[#171717] whitespace-nowrap"
  >
    {{ label }}
  </span>
</template>
