<script setup lang="ts">
import { ref } from 'vue'
import AppFormTitle from '@/components/molecules/AppFormTitle.vue'

// インタラクティブデモ用
const demoTitle = ref('ページ名')
const demoVariant = ref<'default' | 'login'>('default')
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="mb-8 text-2xl font-bold text-gray-800">AppFormTitle デモ</h1>

    <!-- 標準バリアント（アクセント縦線あり） -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">
        標準（variant="default"）：アクセント縦線あり
      </h2>
      <AppFormTitle title="ページ名" />
    </section>

    <!-- ログイン画面用バリアント（アクセント縦線なし） -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">
        ログイン画面用（variant="login"）：アクセント縦線なし
      </h2>
      <div class="flex flex-col gap-4">
        <AppFormTitle title="ログインID" variant="login" />
        <AppFormTitle title="パスワード" variant="login" />
      </div>
    </section>

    <!-- 長いタイトル（nowrap 確認） -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">
        長いタイトル（nowrap 確認）
      </h2>
      <AppFormTitle title="とても長いフォーム項目タイトルのサンプルテキスト" />
    </section>

    <!-- インタラクティブ -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">インタラクティブ</h2>
      <div class="mb-4 flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <label class="w-24 text-sm text-gray-600">タイトル</label>
          <input
            v-model="demoTitle"
            type="text"
            class="rounded border border-gray-300 px-2 py-1 text-sm"
          />
        </div>
        <div class="flex items-center gap-3">
          <label class="w-24 text-sm text-gray-600">variant</label>
          <select v-model="demoVariant" class="rounded border border-gray-300 px-2 py-1 text-sm">
            <option value="default">default</option>
            <option value="login">login</option>
          </select>
        </div>
      </div>
      <div class="rounded-lg border border-gray-100 p-4">
        <AppFormTitle :title="demoTitle" :variant="demoVariant" />
      </div>
    </section>
  </div>
</template>
