<script setup lang="ts">
import { ref } from 'vue'
import AppBlockEditMenu from '@/components/molecules/AppBlockEditMenu.vue'

// インタラクティブデモ用の状態
const selectedVariant = ref<'unselect' | 'select'>('unselect')
const lastClickedItem = ref<{ icon: string; label: string } | null>(null)

const handleClickItem = (icon: string, label: string) => {
  lastClickedItem.value = { icon, label }
}
</script>

<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-8">AppBlockEditMenu デモ</h1>

    <!-- Unselect バリアント -->
    <section class="mb-12">
      <h2 class="text-lg font-semibold mb-4">Unselect（未選択時）</h2>
      <div class="flex gap-8 items-start">
        <AppBlockEditMenu variant="unselect" @click-item="handleClickItem" />
      </div>
    </section>

    <!-- Select バリアント -->
    <section class="mb-12">
      <h2 class="text-lg font-semibold mb-4">Select（ブロック選択時）</h2>
      <div class="flex gap-8 items-start">
        <AppBlockEditMenu variant="select" @click-item="handleClickItem" />
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section class="mb-12">
      <h2 class="text-lg font-semibold mb-4">インタラクティブデモ</h2>
      <div class="flex gap-8 items-start flex-wrap">
        <div class="flex flex-col gap-4">
          <div class="flex gap-2">
            <button
              :class="[
                'px-3 py-1 rounded text-sm font-medium border',
                selectedVariant === 'unselect'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300',
              ]"
              @click="selectedVariant = 'unselect'"
            >
              Unselect
            </button>
            <button
              :class="[
                'px-3 py-1 rounded text-sm font-medium border',
                selectedVariant === 'select'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300',
              ]"
              @click="selectedVariant = 'select'"
            >
              Select
            </button>
          </div>
          <AppBlockEditMenu :variant="selectedVariant" @click-item="handleClickItem" />
        </div>

        <div class="bg-white rounded p-4 text-sm min-w-[200px]">
          <p class="font-semibold mb-2">クリックログ</p>
          <div v-if="lastClickedItem" class="text-gray-700">
            <p>アイコン: {{ lastClickedItem.icon }}</p>
            <p>ラベル: {{ lastClickedItem.label }}</p>
          </div>
          <p v-else class="text-gray-400">セルをクリックしてください</p>
        </div>
      </div>
    </section>
  </div>
</template>
