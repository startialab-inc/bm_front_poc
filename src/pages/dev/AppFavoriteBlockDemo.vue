<script setup lang="ts">
import { ref } from 'vue'
import AppFavoriteBlock from '@/components/molecules/AppFavoriteBlock.vue'

// インタラクティブデモ用の状態
const selectedIndex = ref<number | null>(null)

const demoBlocks = [
  { id: 1, title: 'トップページ用ブロック' },
  { id: 2, title: 'お知らせ一覧ブロック' },
  { id: 3, title: 'バナーエリアブロック' },
]

function handleBlockClick(id: number) {
  selectedIndex.value = id
}

function handleEdit(title: string) {
  alert(`編集: ${title}`)
}

function handleDelete(title: string) {
  alert(`削除: ${title}`)
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-800">AppFavoriteBlock</h1>
      <p class="mt-1 text-sm text-slate-500">
        お気に入りブロック選択コンポーネント（#37 / node: 932:24445）
      </p>
    </div>

    <!-- Default 状態 -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-slate-700 border-b border-slate-300 pb-2">
        Default（未選択）
      </h2>
      <div class="flex gap-6 flex-wrap">
        <AppFavoriteBlock
          title="ブロックタイトル"
          :selected="false"
        />
      </div>
    </section>

    <!-- Selected 状態 -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-slate-700 border-b border-slate-300 pb-2">
        Selected（選択済み）
      </h2>
      <div class="flex gap-6 flex-wrap">
        <AppFavoriteBlock
          title="ブロックタイトル"
          :selected="true"
        />
      </div>
    </section>

    <!-- 並べて比較 -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-slate-700 border-b border-slate-300 pb-2">
        Default / Selected 比較
      </h2>
      <div class="flex gap-6 flex-wrap">
        <div>
          <p class="mb-2 text-xs text-slate-400">Default</p>
          <AppFavoriteBlock title="未選択ブロック" :selected="false" />
        </div>
        <div>
          <p class="mb-2 text-xs text-slate-400">Selected</p>
          <AppFavoriteBlock title="選択済みブロック" :selected="true" />
        </div>
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-slate-700 border-b border-slate-300 pb-2">
        インタラクティブデモ（クリックで選択状態を切り替え）
      </h2>
      <div class="flex gap-6 flex-wrap">
        <AppFavoriteBlock
          v-for="block in demoBlocks"
          :key="block.id"
          :title="block.title"
          :selected="selectedIndex === block.id"
          @click="handleBlockClick(block.id)"
          @edit="handleEdit(block.title)"
          @delete="handleDelete(block.title)"
        />
      </div>
      <p v-if="selectedIndex !== null" class="mt-4 text-sm text-slate-600">
        選択中: {{ demoBlocks.find(b => b.id === selectedIndex)?.title }}
      </p>
      <p v-else class="mt-4 text-sm text-slate-400">ブロックをクリックして選択してください</p>
    </section>
  </div>
</template>
