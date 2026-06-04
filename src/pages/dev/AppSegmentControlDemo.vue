<script setup lang="ts">
import { ref } from 'vue'
import AppSegmentControl from '@/components/molecules/AppSegmentControl.vue'

// 4件タブ（初期選択あり）
const selected4 = ref('all')

// 7件タブ
const selected7 = ref('all')

// 2件タブ
const selected2 = ref('active')

// 初期選択なし
const selectedNone = ref<string | undefined>(undefined)

// インタラクティブデモ
const interactiveSelected = ref<string | undefined>('all')

const items4 = [
  { label: 'すべて', count: 8, value: 'all' },
  { label: '公開中', count: 8, value: 'published' },
  { label: '非公開中', count: 0, value: 'unpublished' },
  { label: '編集中', count: 4, value: 'editing' },
]

const items7 = [
  { label: 'すべて', count: 8, value: 'all' },
  { label: '公開中', count: 8, value: 'published' },
  { label: '非公開中', count: 0, value: 'unpublished' },
  { label: '編集中', count: 4, value: 'editing' },
  { label: '申請中', count: 3, value: 'pending' },
  { label: '承認済', count: 4, value: 'approved' },
  { label: '差戻し', count: 1, value: 'rejected' },
]

const items2 = [
  { label: '有効', count: 5, value: 'active' },
  { label: '無効', count: 2, value: 'inactive' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <h1 class="mb-2 text-2xl font-bold text-slate-800">AppSegmentControl デモ</h1>
    <p class="mb-8 text-xs text-slate-400">Figma: SegmentControl（520:13298）</p>

    <!-- 4件タブ（初期選択あり） -->
    <section class="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-700">4件タブ（初期選択あり）</h2>
      <AppSegmentControl v-model="selected4" :items="items4" />
      <p class="mt-3 text-xs text-slate-400">選択中: {{ selected4 }}</p>
    </section>

    <!-- 7件タブ -->
    <section class="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-700">7件タブ</h2>
      <AppSegmentControl v-model="selected7" :items="items7" />
      <p class="mt-3 text-xs text-slate-400">選択中: {{ selected7 }}</p>
    </section>

    <!-- 2件タブ -->
    <section class="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-700">2件タブ</h2>
      <AppSegmentControl v-model="selected2" :items="items2" />
      <p class="mt-3 text-xs text-slate-400">選択中: {{ selected2 }}</p>
    </section>

    <!-- 初期選択なし -->
    <section class="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-700">初期選択なし（v-model 省略パターン）</h2>
      <AppSegmentControl v-model="selectedNone" :items="items4" />
      <p class="mt-3 text-xs text-slate-400">選択中: {{ selectedNone ?? '（未選択）' }}</p>
    </section>

    <!-- インタラクティブデモ -->
    <section class="rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-700">インタラクティブデモ</h2>

      <!-- 外部から選択状態を変更 -->
      <div class="mb-6 rounded-lg bg-slate-50 p-4">
        <p class="mb-2 text-xs font-semibold text-slate-600">外部から選択状態を変更（v-model の双方向制御確認）</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="item in items4"
            :key="item.value"
            class="rounded px-3 py-1 text-xs font-medium border"
            :class="interactiveSelected === item.value
              ? 'bg-slate-800 text-white border-slate-800'
              : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'"
            @click="interactiveSelected = item.value"
          >
            {{ item.label }}
          </button>
          <button
            class="rounded px-3 py-1 text-xs font-medium border bg-white text-slate-400 border-slate-200 hover:bg-slate-50"
            @click="interactiveSelected = undefined"
          >
            クリア
          </button>
        </div>
      </div>

      <!-- プレビュー -->
      <AppSegmentControl v-model="interactiveSelected" :items="items4" />
      <p class="mt-3 text-xs text-slate-400">選択中: {{ interactiveSelected ?? '（未選択）' }}</p>
    </section>
  </div>
</template>
