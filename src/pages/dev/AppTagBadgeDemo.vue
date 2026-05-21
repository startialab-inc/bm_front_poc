<script setup lang="ts">
import { ref } from 'vue'
import AppTagBadge from '@/components/atoms/AppTagBadge.vue'

// インタラクティブデモ用
const demoLabel = ref('タグ')

// ラベルサンプル
const sampleLabels = ['タグ', 'カテゴリ', 'ニュース', 'お知らせ', 'プレスリリース']
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-800">AppTagBadge</h1>
      <p class="mt-1 text-sm text-slate-500">
        Figma: Badge/Tag（621:17779）
      </p>
    </div>

    <!-- Section 1: ラベルバリエーション -->
    <section class="mb-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 class="mb-4 text-base font-semibold text-slate-700">ラベルバリエーション</h2>
      <div class="flex flex-wrap items-center gap-3">
        <div
          v-for="label in sampleLabels"
          :key="label"
          class="flex flex-col items-center gap-2"
        >
          <AppTagBadge :label="label" />
          <span class="text-[10px] text-slate-400">{{ label }}</span>
        </div>
      </div>
    </section>

    <!-- Section 2: 使用例 -->
    <section class="mb-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 class="mb-1 text-base font-semibold text-slate-700">使用例</h2>
      <p class="mb-4 text-xs text-slate-400">コンテンツタイトルの横にタグを並べるパターン</p>
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-slate-700">Webマーケティング入門</span>
          <AppTagBadge label="ニュース" />
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-slate-700">2024年度 第3四半期レポート</span>
          <AppTagBadge label="プレスリリース" />
          <AppTagBadge label="お知らせ" />
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-slate-700">製品アップデートのご案内</span>
          <AppTagBadge label="カテゴリ" />
        </div>
      </div>
    </section>

    <!-- Section 3: インタラクティブデモ -->
    <section class="bg-white rounded-xl p-6 shadow-sm">
      <h2 class="mb-4 text-base font-semibold text-slate-700">インタラクティブデモ</h2>

      <!-- テキスト入力 -->
      <div class="mb-4 flex items-center gap-3">
        <label class="text-xs text-slate-500 shrink-0">テキスト：</label>
        <input
          v-model="demoLabel"
          type="text"
          class="text-sm border border-slate-300 rounded px-2 py-1 w-48"
          placeholder="タグ名を入力..."
        />
      </div>

      <!-- プレビュー -->
      <div class="flex items-center justify-center bg-slate-50 rounded-lg p-8 min-h-[100px]">
        <AppTagBadge :label="demoLabel" />
      </div>

      <!-- 現在の props 表示 -->
      <div class="mt-3 text-[11px] text-slate-400 font-mono">
        <span>label="{{ demoLabel }}"</span>
      </div>
    </section>
  </div>
</template>
