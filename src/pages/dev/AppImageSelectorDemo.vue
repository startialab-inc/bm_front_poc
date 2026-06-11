<script setup lang="ts">
import { ref } from 'vue'
import AppImageSelector from '@/components/molecules/AppImageSelector.vue'

// インタラクティブデモ用の状態
const selectedUrl = ref<string | null>(null)

const handleSelect = (file: File) => {
  console.log('ファイル選択:', file.name, file.size, 'bytes')
}

const handleDelete = () => {
  console.log('画像削除')
}

// 固定URL（選択済み表示デモ用）
const previewUrl = 'https://placehold.co/920x523/e2e8f0/64748b?text=Image+Preview'
</script>

<template>
  <div class="p-8 space-y-12">
    <h1 class="text-2xl font-bold text-[#0d2144]">AppImageSelector デモ</h1>

    <!-- 未選択状態 -->
    <section class="space-y-4">
      <h2 class="text-lg font-bold text-[#0d2144] border-b border-[#e5e5e5] pb-2">
        未選択状態（Unselect）
      </h2>
      <div>
        <AppImageSelector :model-value="null" />
      </div>
    </section>

    <!-- 選択済み状態 -->
    <section class="space-y-4">
      <h2 class="text-lg font-bold text-[#0d2144] border-b border-[#e5e5e5] pb-2">
        選択済み状態（Selected）
      </h2>
      <div>
        <AppImageSelector :model-value="previewUrl" />
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section class="space-y-4">
      <h2 class="text-lg font-bold text-[#0d2144] border-b border-[#e5e5e5] pb-2">
        インタラクティブデモ（実際にファイルを選択・削除できます）
      </h2>
      <div class="space-y-3">
        <AppImageSelector
          v-model="selectedUrl"
          @select="handleSelect"
          @delete="handleDelete"
        />
        <p class="text-sm text-[#64748b]">
          現在の modelValue:
          <span class="font-mono text-xs break-all">
            {{ selectedUrl === null ? 'null（未選択）' : selectedUrl }}
          </span>
        </p>
      </div>
    </section>
  </div>
</template>
