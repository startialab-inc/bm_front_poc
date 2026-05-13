<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppTag from '@/components/atoms/AppTag.vue'

// 削除デモ用タグリスト
const demoTags = ref(['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vite', 'Storybook'])
const removeTag = (tag: string) => {
  demoTags.value = demoTags.value.filter(t => t !== tag)
}
const resetTags = () => {
  demoTags.value = ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vite', 'Storybook']
}

// インタラクティブデモ用
const demoLabel = ref('タグラベル')
const demoDeletable = ref(false)
const demoDeleted = ref(false)
const handleDemoDelete = () => { demoDeleted.value = true }
const resetDemoDelete = () => { demoDeleted.value = false }
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <!-- ページヘッダー -->
    <div class="mb-8">
      <RouterLink to="/dev" class="text-sm text-brand-500 hover:underline">← デモ一覧</RouterLink>
      <h1 class="mt-2 text-2xl font-bold text-slate-800">AppTag</h1>
      <p class="mt-1 text-sm text-slate-500">
        タグコンポーネント（Atom）。削除ボタンの有無で2つのバリアントを持つ。
      </p>
      <p class="mt-1 text-xs text-slate-400">Figma node-id: 911:50285</p>
    </div>

    <!-- セクション1: バリアント -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        バリアント
      </h2>
      <p class="text-xs text-slate-400 mb-4">
        Undelete: 削除ボタンなし・ボーダーあり（border 1px #e5e5e5）／
        Deleteable: 削除ボタン（fa-circle-xmark）あり・ボーダーなし
      </p>
      <div class="flex items-center gap-6 flex-wrap">
        <div class="text-center space-y-2">
          <AppTag label="タグラベル" :deletable="false" />
          <p class="text-[10px] text-slate-400">Undelete（deletable=false）</p>
        </div>
        <div class="text-center space-y-2">
          <AppTag label="タグラベル" :deletable="true" />
          <p class="text-[10px] text-slate-400">Deleteable（deletable=true）</p>
        </div>
      </div>
    </section>

    <!-- セクション2: 複数タグの並列表示 -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        複数タグの並列表示
      </h2>
      <div class="space-y-3">
        <div>
          <p class="text-xs text-slate-500 mb-2">Undelete</p>
          <div class="flex flex-wrap gap-2">
            <AppTag label="Vue 3" />
            <AppTag label="TypeScript" />
            <AppTag label="Tailwind CSS v4" />
            <AppTag label="Storybook" />
          </div>
        </div>
        <div>
          <p class="text-xs text-slate-500 mb-2">Deleteable</p>
          <div class="flex flex-wrap gap-2">
            <AppTag label="Vue 3" :deletable="true" />
            <AppTag label="TypeScript" :deletable="true" />
            <AppTag label="Tailwind CSS v4" :deletable="true" />
            <AppTag label="Storybook" :deletable="true" />
          </div>
        </div>
      </div>
    </section>

    <!-- セクション3: 削除インタラクションデモ -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        削除インタラクション（@delete イベント）
      </h2>
      <p class="text-xs text-slate-400 mb-4">
        × ボタンをクリックするとタグが削除される。delete イベントを親コンポーネントで受け取りリストから除外する実装例。
      </p>
      <div class="flex flex-wrap gap-2 mb-3">
        <AppTag
          v-for="tag in demoTags"
          :key="tag"
          :label="tag"
          :deletable="true"
          @delete="removeTag(tag)"
        />
        <span v-if="demoTags.length === 0" class="text-sm text-slate-400">（タグがすべて削除されました）</span>
      </div>
      <button
        type="button"
        class="text-xs text-slate-500 underline cursor-pointer"
        @click="resetTags"
      >
        リセット
      </button>
    </section>

    <!-- セクション4: インタラクティブデモ -->
    <section class="bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        インタラクティブデモ
      </h2>
      <div class="flex gap-8">
        <!-- コントロールパネル -->
        <div class="space-y-3 min-w-48">
          <div>
            <label class="text-xs font-medium text-slate-600 block mb-1">label</label>
            <input
              v-model="demoLabel"
              type="text"
              placeholder="タグラベル"
              class="text-sm border border-slate-300 rounded px-2 py-1 w-full"
            />
          </div>
          <div class="flex items-center gap-2">
            <input id="demoDeletable" v-model="demoDeletable" type="checkbox" @change="resetDemoDelete" />
            <label for="demoDeletable" class="text-xs font-medium text-slate-600">deletable</label>
          </div>
        </div>

        <!-- プレビュー -->
        <div class="flex-1 flex flex-col items-center justify-center gap-4 bg-slate-50 rounded-lg p-8">
          <AppTag
            v-if="!demoDeleted"
            :label="demoLabel"
            :deletable="demoDeletable"
            @delete="handleDemoDelete"
          />
          <p v-else class="text-sm text-slate-400">（削除されました）</p>
          <p v-if="demoDeleted" class="text-xs text-slate-400">
            <button type="button" class="underline cursor-pointer" @click="resetDemoDelete">元に戻す</button>
          </p>
          <p class="text-xs text-slate-400">
            {{ demoDeletable ? 'Deleteable バリアント' : 'Undelete バリアント' }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
