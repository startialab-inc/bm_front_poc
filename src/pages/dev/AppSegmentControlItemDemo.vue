<script setup lang="ts">
import { ref } from 'vue'
import AppSegmentControlItem from '@/components/atoms/AppSegmentControlItem.vue'
import AppSegmentControl, { type SegmentItem } from '@/components/molecules/AppSegmentControl.vue'

// インタラクティブデモ用のタブデータ
const tabs = ref<SegmentItem[]>([
  { label: 'すべて', count: 8, value: 'all' },
  { label: '公開中', count: 3, value: 'published' },
  { label: '非公開', count: 5, value: 'unpublished' },
])
const selectedValue = ref<string | undefined>('all')
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-800">AppSegmentControlItem</h1>
      <p class="mt-1 text-sm text-slate-500">
        Figma node-id: <code class="bg-slate-200 px-1 rounded text-xs">520:13248</code>（SegmentControlChild）
      </p>
    </div>

    <!-- 選択中バリアント -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">選択中（selected=true）</h2>
      <div class="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <div class="flex items-center bg-slate-100 rounded-[10px] p-1 gap-1 w-[240px]">
          <AppSegmentControlItem label="すべて" :count="8" :selected="true" />
        </div>
      </div>
    </section>

    <!-- 非選択バリアント -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">非選択（selected=false）</h2>
      <div class="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <div class="flex items-center bg-slate-100 rounded-[10px] p-1 gap-1 w-[240px]">
          <AppSegmentControlItem label="すべて" :count="8" :selected="false" />
        </div>
      </div>
    </section>

    <!-- AppSegmentControl（Molecule）デモ -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">AppSegmentControl（Molecule）</h2>
      <div class="bg-slate-50 rounded-lg p-6 border border-slate-200 space-y-4">
        <div>
          <p class="text-xs text-slate-400 mb-2">「すべて」選択中</p>
          <AppSegmentControl
            model-value="all"
            :items="[{ label: 'すべて', count: 8, value: 'all' }, { label: '公開中', count: 3, value: 'published' }, { label: '非公開', count: 5, value: 'unpublished' }]"
          />
        </div>
        <div>
          <p class="text-xs text-slate-400 mb-2">「公開中」選択中</p>
          <AppSegmentControl
            model-value="published"
            :items="[{ label: 'すべて', count: 8, value: 'all' }, { label: '公開中', count: 3, value: 'published' }, { label: '非公開', count: 5, value: 'unpublished' }]"
          />
        </div>
        <div>
          <p class="text-xs text-slate-400 mb-2">件数ゼロ</p>
          <AppSegmentControl
            model-value="all"
            :items="[{ label: 'すべて', count: 0, value: 'all' }, { label: '下書き', count: 0, value: 'draft' }]"
          />
        </div>
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section>
      <h2 class="mb-3 text-base font-semibold text-slate-700">インタラクティブデモ</h2>
      <div class="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <p class="text-xs text-slate-500 mb-3">タブをクリックして切り替え</p>
        <AppSegmentControl v-model="selectedValue" :items="tabs" />
        <p class="mt-3 text-xs text-slate-500">
          選択中: {{ tabs.find(t => t.value === selectedValue)?.label }}（{{ tabs.find(t => t.value === selectedValue)?.count }} 件）
        </p>
      </div>
    </section>
  </div>
</template>
