<script setup lang="ts">
// アセットパスは import.meta.env.BASE_URL を使用（Vite base 設定対応）
const src = `${import.meta.env.BASE_URL}assets/images/contact.svg`
</script>

<template>
  <!-- 青い背景円（64×64px）。背景色はブランドカラー brand/blue monkey/500 (#2862cb) -->
  <div class="w-16 h-16 rounded-full bg-[#2862cb] overflow-hidden">
    <!-- 吹き出しアイコン SVG（背景なし）を 100% サイズで表示 -->
    <img
      :src="src"
      alt="コンタクトボタン"
      class="w-full h-full"
    />
  </div>
</template>
