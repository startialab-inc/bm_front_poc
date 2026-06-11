<script setup lang="ts">
import { ref } from 'vue'
import AppLeftMenuIcon from '@/components/atoms/AppLeftMenuIcon.vue'

const activeStatus = ref<'close' | 'open'>('close')

const toggle = () => {
  activeStatus.value = activeStatus.value === 'close' ? 'open' : 'close'
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-800">AppLeftMenuIcon</h1>
      <p class="mt-1 text-sm text-slate-500">
        Figma node-id: <code class="rounded bg-slate-200 px-1 text-xs">411:7357</code>（Icon/LeftMenu）
      </p>
    </div>

    <!-- Close バリアント -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">サイドバー開き状態（status="close"）</h2>
      <p class="mb-3 text-xs text-slate-500">16 × 16px / panel-left アイコン</p>
      <div class="rounded-lg border border-slate-200 bg-white p-6 inline-flex">
        <AppLeftMenuIcon status="close" />
      </div>
    </section>

    <!-- Open バリアント -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">サイドバー閉じ状態（status="open"）</h2>
      <p class="mb-3 text-xs text-slate-500">16 × 16px / panel-left-close アイコン</p>
      <div class="rounded-lg border border-slate-200 bg-white p-6 inline-flex">
        <AppLeftMenuIcon status="open" />
      </div>
    </section>

    <!-- 全バリアント比較 -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">全バリアント比較</h2>
      <div class="rounded-lg border border-slate-200 bg-white p-6">
        <div class="flex items-start gap-10 flex-wrap">
          <div class="flex flex-col items-center gap-3">
            <span class="text-xs font-medium text-slate-500">Close</span>
            <AppLeftMenuIcon status="close" />
            <span class="text-xs text-slate-400">サイドバー開き状態</span>
          </div>
          <div class="flex flex-col items-center gap-3">
            <span class="text-xs font-medium text-slate-500">Open</span>
            <AppLeftMenuIcon status="open" />
            <span class="text-xs text-slate-400">サイドバー閉じ状態</span>
          </div>
        </div>
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">インタラクティブデモ</h2>
      <p class="mb-3 text-xs text-slate-500">
        アイコンをクリックすると toggle イベントが発火し、親（このデモページ）が status を切り替えます
      </p>
      <div class="rounded-lg border border-slate-200 bg-white p-6 space-y-4">
        <div class="flex items-center gap-4">
          <AppLeftMenuIcon :status="activeStatus" @toggle="toggle" />
          <span class="text-sm font-mono text-slate-600">
            status: "<strong>{{ activeStatus }}</strong>"
          </span>
        </div>
        <p class="text-xs text-slate-400">
          status="close" → panel-left.svg / status="open" → panel-left-close.svg
        </p>
      </div>
    </section>
  </div>
</template>
