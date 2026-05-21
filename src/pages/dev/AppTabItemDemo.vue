<script setup lang="ts">
import { ref } from 'vue'
import AppTabItem from '@/components/atoms/AppTabItem.vue'

// インタラクティブデモ用のタブデータ
const tabs = ref(['タブ1', 'タブ2', 'タブ3'])
const selectedIndex = ref(0)
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-800">AppTabItem</h1>
      <p class="mt-1 text-sm text-slate-500">
        Figma node-id: <code class="bg-slate-200 px-1 rounded text-xs">849:2330</code>（TabChild）
      </p>
    </div>

    <!-- 選択中バリアント -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">選択中（selected=true）</h2>
      <div class="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <div class="flex items-start border-b border-slate-200">
          <AppTabItem label="タブ1" :selected="true" />
        </div>
      </div>
    </section>

    <!-- 非選択バリアント -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">非選択（selected=false）</h2>
      <div class="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <div class="flex items-start border-b border-slate-200">
          <AppTabItem label="タブ1" :selected="false" />
        </div>
      </div>
    </section>

    <!-- Tab 風横並びデモ -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">Tab 風横並び</h2>
      <div class="bg-slate-50 rounded-lg p-6 border border-slate-200 space-y-6">
        <div>
          <p class="text-xs text-slate-400 mb-2">「タブ1」選択中</p>
          <div class="flex items-start border-b border-slate-200">
            <AppTabItem label="タブ1" :selected="true" />
            <AppTabItem label="タブ2" :selected="false" />
            <AppTabItem label="タブ3" :selected="false" />
          </div>
        </div>
        <div>
          <p class="text-xs text-slate-400 mb-2">「タブ2」選択中</p>
          <div class="flex items-start border-b border-slate-200">
            <AppTabItem label="タブ1" :selected="false" />
            <AppTabItem label="タブ2" :selected="true" />
            <AppTabItem label="タブ3" :selected="false" />
          </div>
        </div>
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section>
      <h2 class="mb-3 text-base font-semibold text-slate-700">インタラクティブデモ</h2>
      <div class="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <p class="text-xs text-slate-500 mb-3">タブをクリックして切り替え</p>
        <div class="flex items-start border-b border-slate-200">
          <AppTabItem
            v-for="(tab, i) in tabs"
            :key="tab"
            :label="tab"
            :selected="selectedIndex === i"
            @click="selectedIndex = i"
          />
        </div>
        <p class="mt-3 text-xs text-slate-500">選択中: {{ tabs[selectedIndex] }}</p>
      </div>
    </section>
  </div>
</template>
