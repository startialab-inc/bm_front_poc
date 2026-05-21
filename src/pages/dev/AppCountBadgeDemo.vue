<script setup lang="ts">
import { ref } from 'vue'
import AppCountBadge from '@/components/atoms/AppCountBadge.vue'

// インタラクティブデモ用
const demoCount = ref(42)

// 件数サンプル
const sampleCounts = [1, 10, 100, 1000, 9999]
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-800">AppCountBadge</h1>
      <p class="mt-1 text-sm text-slate-500">
        Figma: PageCountBadge（619:13664）
      </p>
    </div>

    <!-- Section 1: 件数バリエーション -->
    <section class="mb-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 class="mb-4 text-base font-semibold text-slate-700">件数バリエーション</h2>
      <div class="flex flex-wrap items-center gap-6">
        <div
          v-for="n in sampleCounts"
          :key="n"
          class="flex flex-col items-center gap-2"
        >
          <AppCountBadge :count="n" />
          <span class="text-[10px] text-slate-400">{{ n }}件</span>
        </div>
      </div>
    </section>

    <!-- Section 2: 使用例（テキストの隣に並べる） -->
    <section class="mb-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 class="mb-1 text-base font-semibold text-slate-700">使用例</h2>
      <p class="mb-4 text-xs text-slate-400">ページ一覧タイトルの横に件数を表示するパターン</p>
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium text-slate-700">ページ一覧</span>
        <AppCountBadge :count="128" />
      </div>
    </section>

    <!-- Section 3: インタラクティブデモ -->
    <section class="bg-white rounded-xl p-6 shadow-sm">
      <h2 class="mb-4 text-base font-semibold text-slate-700">インタラクティブデモ</h2>

      <!-- 件数入力 -->
      <div class="mb-4 flex items-center gap-3">
        <label class="text-xs text-slate-500 shrink-0">件数：</label>
        <input
          v-model.number="demoCount"
          type="number"
          min="0"
          class="text-sm border border-slate-300 rounded px-2 py-1 w-28"
        />
      </div>

      <!-- プレビュー -->
      <div class="flex items-center justify-center bg-slate-50 rounded-lg p-8 min-h-[100px]">
        <AppCountBadge :count="demoCount" />
      </div>

      <!-- 現在の props 表示 -->
      <div class="mt-3 text-[11px] text-slate-400 font-mono">
        <span>count={{ demoCount }}</span>
      </div>
    </section>
  </div>
</template>
