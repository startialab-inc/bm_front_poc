<script setup lang="ts">
import { ref } from 'vue'
import AppTab from '@/components/molecules/AppTab.vue'

// 3件タブ（初期選択あり）
const selected3 = ref('basic')

// 5件タブ
const selected5 = ref('basic')

// 2件タブ
const selected2 = ref('overview')

// インタラクティブデモ
const interactiveSelected = ref('basic')

const items3 = [
  { label: '基本情報', value: 'basic' },
  { label: '詳細設定', value: 'detail' },
  { label: '変更履歴', value: 'history' },
]

const items5 = [
  { label: '基本情報', value: 'basic' },
  { label: '詳細設定', value: 'detail' },
  { label: '変更履歴', value: 'history' },
  { label: '設定', value: 'settings' },
  { label: 'プレビュー', value: 'preview' },
]

const items2 = [
  { label: '概要', value: 'overview' },
  { label: '詳細', value: 'detail' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <h1 class="mb-2 text-2xl font-bold text-slate-800">AppTab デモ</h1>
    <p class="mb-8 text-xs text-slate-400">Figma: Tab（849:2467）</p>

    <!-- 3件タブ（初期選択あり） -->
    <section class="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-700">3件タブ（初期選択あり）</h2>
      <AppTab v-model="selected3" :items="items3" />
      <p class="mt-3 text-xs text-slate-400">選択中: {{ selected3 }}</p>
    </section>

    <!-- 5件タブ -->
    <section class="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-700">5件タブ</h2>
      <AppTab v-model="selected5" :items="items5" />
      <p class="mt-3 text-xs text-slate-400">選択中: {{ selected5 }}</p>
    </section>

    <!-- 2件タブ -->
    <section class="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-700">2件タブ</h2>
      <AppTab v-model="selected2" :items="items2" />
      <p class="mt-3 text-xs text-slate-400">選択中: {{ selected2 }}</p>
    </section>

    <!-- インタラクティブデモ -->
    <section class="rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-700">インタラクティブデモ</h2>

      <!-- 外部から選択状態を変更 -->
      <div class="mb-6 rounded-lg bg-slate-50 p-4">
        <p class="mb-2 text-xs font-semibold text-slate-600">外部から選択状態を変更（v-model の双方向制御確認）</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="item in items3"
            :key="item.value"
            class="rounded px-3 py-1 text-xs font-medium border"
            :class="interactiveSelected === item.value
              ? 'bg-slate-800 text-white border-slate-800'
              : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'"
            @click="interactiveSelected = item.value"
          >
            {{ item.label }}
          </button>
        </div>
      </div>

      <!-- プレビュー -->
      <AppTab v-model="interactiveSelected" :items="items3" />
      <p class="mt-3 text-xs text-slate-400">選択中: {{ interactiveSelected }}</p>
    </section>
  </div>
</template>
