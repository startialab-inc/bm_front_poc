<script setup lang="ts">
import { ref } from 'vue'
import AppBlockEditMenuCell from '@/components/molecules/AppBlockEditMenuCell.vue'

// インタラクティブデモ用
const customIcon = ref('fa-solid fa-plus')
const customLabel = ref('ブロック追加')
const clickCount = ref(0)

function handleClick() {
  clickCount.value++
}
</script>

<template>
  <div class="p-8 space-y-10">
    <h1 class="text-2xl font-bold text-[#0d2144]">AppBlockEditMenuCell デモ</h1>

    <!-- Default（空） -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-[#0d2144]">Default（icon・label 空）</h2>
      <div class="flex gap-2 bg-[#1b4187] p-4 rounded">
        <AppBlockEditMenuCell />
      </div>
    </section>

    <!-- インタラクション -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-[#0d2144]">インタラクション</h2>
      <p class="text-sm text-[#64748b]">セルにホバーまたはフォーカスすると背景色が変化します。</p>
      <div class="flex gap-0 bg-[#1b4187]">
        <AppBlockEditMenuCell icon="fa-solid fa-plus" label="ホバーしてみて" />
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-[#0d2144]">インタラクティブデモ</h2>
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-4">
          <label class="text-sm text-[#0d2144] w-16">アイコン:</label>
          <input
            v-model="customIcon"
            type="text"
            placeholder="fa-solid fa-plus"
            class="border border-[#e2e8f0] rounded px-2 py-1 text-sm w-56"
          />
        </div>
        <div class="flex items-center gap-4">
          <label class="text-sm text-[#0d2144] w-16">ラベル:</label>
          <input
            v-model="customLabel"
            type="text"
            class="border border-[#e2e8f0] rounded px-2 py-1 text-sm w-56"
          />
        </div>
      </div>
      <div class="flex gap-0 bg-[#1b4187]">
        <AppBlockEditMenuCell :icon="customIcon" :label="customLabel" @click="handleClick" />
      </div>
      <p class="text-sm text-[#64748b]">クリック回数: {{ clickCount }}</p>
    </section>
  </div>
</template>
