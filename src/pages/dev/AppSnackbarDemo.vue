<script setup lang="ts">
import { ref } from 'vue'
import AppSnackbar from '@/components/atoms/AppSnackbar.vue'

// インタラクティブデモ用
const demoType = ref<'success' | 'info' | 'warning' | 'error'>('success')
const demoTitle = ref('タイトルテキスト')
const demoDescription = ref('description here')
const showDescription = ref(true)
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-800">AppSnackbar</h1>
      <p class="mt-1 text-sm text-slate-500">Figma node-id: 2051:66855</p>
    </div>

    <!-- type バリアント -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-slate-700 border-b border-slate-300 pb-2">
        type バリアント
      </h2>
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <span class="w-20 text-xs text-slate-500 shrink-0">success</span>
          <AppSnackbar type="success" title="保存しました" description="変更内容が正常に保存されました。" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-xs text-slate-500 shrink-0">info</span>
          <AppSnackbar type="info" title="更新があります" description="新しいバージョンが利用可能です。" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-xs text-slate-500 shrink-0">warning</span>
          <AppSnackbar type="warning" title="注意が必要です" description="この操作は元に戻せません。" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-xs text-slate-500 shrink-0">error</span>
          <AppSnackbar type="error" title="エラーが発生しました" description="入力内容を確認してください。" />
        </div>
      </div>
    </section>

    <!-- description なし（タイトルのみ） -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-slate-700 border-b border-slate-300 pb-2">
        タイトルのみ（description なし）
      </h2>
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <span class="w-20 text-xs text-slate-500 shrink-0">success</span>
          <AppSnackbar type="success" title="保存しました" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-xs text-slate-500 shrink-0">info</span>
          <AppSnackbar type="info" title="情報をお知らせします" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-xs text-slate-500 shrink-0">warning</span>
          <AppSnackbar type="warning" title="注意してください" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-xs text-slate-500 shrink-0">error</span>
          <AppSnackbar type="error" title="エラーが発生しました" />
        </div>
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section>
      <h2 class="mb-4 text-lg font-semibold text-slate-700 border-b border-slate-300 pb-2">
        インタラクティブデモ
      </h2>
      <div class="bg-white rounded-lg p-6 shadow-sm">
        <!-- コントロールパネル -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">type</label>
            <select
              v-model="demoType"
              class="w-full border border-slate-200 rounded px-2 py-1 text-sm"
            >
              <option value="success">success</option>
              <option value="info">info</option>
              <option value="warning">warning</option>
              <option value="error">error</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">title</label>
            <input
              v-model="demoTitle"
              type="text"
              class="w-full border border-slate-200 rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">description（省略可）</label>
            <input
              v-model="demoDescription"
              type="text"
              :disabled="!showDescription"
              class="w-full border border-slate-200 rounded px-2 py-1 text-sm disabled:opacity-40"
            />
          </div>
          <div class="flex items-end">
            <label class="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input v-model="showDescription" type="checkbox" class="rounded" />
              description を表示する
            </label>
          </div>
        </div>
        <!-- プレビュー -->
        <div class="bg-slate-50 rounded p-4">
          <AppSnackbar
            :type="demoType"
            :title="demoTitle"
            :description="showDescription ? demoDescription : undefined"
          />
        </div>
        <!-- 実装コード -->
        <div class="mt-4 bg-slate-800 rounded p-3 text-xs text-slate-300 font-mono">
          &lt;AppSnackbar
          type="{{ demoType }}"
          title="{{ demoTitle }}"
          <template v-if="showDescription"> description="{{ demoDescription }}"</template>
          /&gt;
        </div>
      </div>
    </section>
  </div>
</template>
