<script setup lang="ts">
import { ref } from 'vue'
import AppLogo from '@/components/atoms/AppLogo.vue'

const activeVariant = ref<'landscape' | 'portrait' | 'square'>('landscape')
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-800">AppLogo</h1>
      <p class="mt-1 text-sm text-slate-500">
        Figma node-id: <code class="rounded bg-slate-200 px-1 text-xs">308:6387</code>（logo）
      </p>
    </div>

    <!-- Landscape バリアント -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">横並び（Landscape）</h2>
      <p class="mb-3 text-xs text-slate-500">160 × 48px</p>
      <div class="rounded-lg border border-slate-200 bg-white p-6 inline-flex">
        <AppLogo variant="landscape" />
      </div>
    </section>

    <!-- Portrait バリアント -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">縦積み（Portrait）</h2>
      <p class="mb-3 text-xs text-slate-500">160 × 170px</p>
      <div class="rounded-lg border border-slate-200 bg-white p-6 inline-flex">
        <AppLogo variant="portrait" />
      </div>
    </section>

    <!-- Square バリアント -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">アイコンのみ（Square）</h2>
      <p class="mb-3 text-xs text-slate-500">40 × 40px</p>
      <div class="rounded-lg border border-slate-200 bg-white p-6 inline-flex">
        <AppLogo variant="square" />
      </div>
    </section>

    <!-- 全バリアント比較 -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">全バリアント比較</h2>
      <div class="rounded-lg border border-slate-200 bg-white p-6">
        <div class="flex items-start gap-10 flex-wrap">
          <div class="flex flex-col items-start gap-3">
            <span class="text-xs font-medium text-slate-500 uppercase tracking-wide">Landscape</span>
            <AppLogo variant="landscape" />
            <span class="text-xs text-slate-400">160 × 48px</span>
          </div>
          <div class="flex flex-col items-start gap-3">
            <span class="text-xs font-medium text-slate-500 uppercase tracking-wide">Portrait</span>
            <AppLogo variant="portrait" />
            <span class="text-xs text-slate-400">160 × 170px</span>
          </div>
          <div class="flex flex-col items-start gap-3">
            <span class="text-xs font-medium text-slate-500 uppercase tracking-wide">Square</span>
            <AppLogo variant="square" />
            <span class="text-xs text-slate-400">40 × 40px</span>
          </div>
        </div>
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">インタラクティブデモ</h2>
      <p class="mb-3 text-xs text-slate-500">ボタンで variant を切り替えて確認できます</p>
      <div class="rounded-lg border border-slate-200 bg-white p-6 space-y-4">
        <div class="flex gap-2">
          <button
            v-for="v in ['landscape', 'portrait', 'square'] as const"
            :key="v"
            class="rounded px-3 py-1 text-xs font-medium transition-colors"
            :class="activeVariant === v
              ? 'bg-[#2862cb] text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
            @click="activeVariant = v"
          >
            {{ v }}
          </button>
        </div>
        <div class="flex items-center justify-center rounded bg-slate-50 p-8">
          <AppLogo :variant="activeVariant" />
        </div>
        <p class="text-xs text-slate-400">現在の variant: <strong>{{ activeVariant }}</strong></p>
      </div>
    </section>
  </div>
</template>
