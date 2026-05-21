<script setup lang="ts">
// 件数バッジコンポーネント（Atom）
// Figma node-id: 619:13664（PageCountBadge）
// 単一バリアント。表示する件数を count prop で受け取る。

defineProps<{
  /** 表示する件数 */
  count: number
}>()
</script>

<template>
  <!-- 件数バッジ: 背景 slate/200、テキスト brand/900、xs/semibold、rounded-md -->
  <span
    class="inline-flex items-center justify-center px-2 py-0.5 rounded-[8px] bg-[#e2e8f0] text-[#0d2144] text-xs font-semibold leading-4 whitespace-nowrap"
  >
    {{ count }}
  </span>
</template>
