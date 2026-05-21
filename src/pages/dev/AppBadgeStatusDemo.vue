<script setup lang="ts">
import { ref } from 'vue'
import AppBadgeStatus from '@/components/atoms/AppBadgeStatus.vue'

// インタラクティブデモ用
const demoVariant = ref<'open' | 'close' | 'rebuilding' | 'editing' | 'approved'>('open')
const demoDatetime = ref('2026/05/20 10:00')
const variants = ['open', 'close', 'rebuilding', 'editing', 'approved'] as const
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-800">AppBadgeStatus</h1>
      <p class="mt-1 text-sm text-slate-500">
        Figma: Badge/PageStatus（619:13589）/ Badge/SubStatus（864:40386）
      </p>
    </div>

    <!-- Section 1: 全バリアント一覧 -->
    <section class="mb-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 class="mb-4 text-base font-semibold text-slate-700">全バリアント一覧</h2>
      <div class="flex flex-wrap items-end gap-4">
        <div
          v-for="v in variants"
          :key="v"
          class="flex flex-col items-center gap-2"
        >
          <AppBadgeStatus
            :variant="v"
            :datetime="v === 'rebuilding' ? '2026/05/20 10:00' : undefined"
          />
          <span class="text-[10px] text-slate-400">{{ v }}</span>
        </div>
      </div>
    </section>

    <!-- Section 2: Badge/PageStatus（open / close） -->
    <section class="mb-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 class="mb-1 text-base font-semibold text-slate-700">Badge/PageStatus</h2>
      <p class="mb-4 text-xs text-slate-400">Figma node-id: 619:13589 — ページの公開状態を示す2状態バッジ</p>
      <div class="flex items-center gap-4">
        <div class="flex flex-col items-center gap-2">
          <AppBadgeStatus variant="open" />
          <span class="text-xs text-slate-500">公開中（open）</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <AppBadgeStatus variant="close" />
          <span class="text-xs text-slate-500">非公開（close）</span>
        </div>
      </div>
    </section>

    <!-- Section 3: Badge/SubStatus（rebuilding / editing / approved） -->
    <section class="mb-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 class="mb-1 text-base font-semibold text-slate-700">Badge/SubStatus</h2>
      <p class="mb-4 text-xs text-slate-400">Figma node-id: 864:40386 — ページの副ステータスを示す3状態バッジ</p>
      <div class="flex flex-wrap items-end gap-6">
        <div class="flex flex-col items-center gap-2">
          <AppBadgeStatus variant="rebuilding" datetime="2026/05/20 10:00" />
          <span class="text-xs text-slate-500">再構築予約（rebuilding）</span>
          <span class="text-[10px] text-slate-400">アイコン + 日時テキスト</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <AppBadgeStatus variant="editing" />
          <span class="text-xs text-slate-500">編集中（editing）</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <AppBadgeStatus variant="approved" />
          <span class="text-xs text-slate-500">承認済（approved）</span>
        </div>
      </div>

      <!-- rebuilding: datetime なし -->
      <div class="mt-4 pt-4 border-t border-slate-100">
        <p class="mb-2 text-xs text-slate-400">rebuilding（datetime 未指定）</p>
        <div class="flex items-center gap-2">
          <AppBadgeStatus variant="rebuilding" />
          <span class="text-[10px] text-slate-400">datetime="" の場合は「再構築予約」のみ表示</span>
        </div>
      </div>
    </section>

    <!-- Section 4: インタラクティブデモ -->
    <section class="bg-white rounded-xl p-6 shadow-sm">
      <h2 class="mb-4 text-base font-semibold text-slate-700">インタラクティブデモ</h2>

      <!-- バリアント切り替えボタン -->
      <div class="mb-3 flex flex-wrap gap-2">
        <button
          v-for="v in variants"
          :key="v"
          @click="demoVariant = v"
          class="text-xs border rounded px-3 py-1.5 transition-colors"
          :class="demoVariant === v
            ? 'bg-slate-800 text-white border-slate-800'
            : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'"
        >
          {{ v }}
        </button>
      </div>

      <!-- datetime 入力（rebuilding のみ） -->
      <div v-if="demoVariant === 'rebuilding'" class="mb-3 flex items-center gap-2">
        <label class="text-xs text-slate-500 shrink-0">日時：</label>
        <input
          v-model="demoDatetime"
          type="text"
          placeholder="例: 2026/05/20 10:00"
          class="text-xs border border-slate-300 rounded px-2 py-1 w-52"
        />
      </div>

      <!-- プレビュー -->
      <div class="flex items-center justify-center bg-slate-50 rounded-lg p-8 min-h-[100px]">
        <AppBadgeStatus :variant="demoVariant" :datetime="demoDatetime" />
      </div>

      <!-- 現在の props 表示 -->
      <div class="mt-3 text-[11px] text-slate-400 font-mono">
        <span>variant="{{ demoVariant }}"</span>
        <span v-if="demoVariant === 'rebuilding'"> datetime="{{ demoDatetime }}"</span>
      </div>
    </section>
  </div>
</template>
