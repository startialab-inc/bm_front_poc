<script setup lang="ts">
import { ref } from 'vue'
import AppContactItemType from '@/components/molecules/AppContactItemType.vue'
import type { ContactItemType } from '@/components/molecules/AppContactItemType.vue'

// インタラクティブデモ用の v-model
const interactiveType = ref<ContactItemType>('default')

// 全バリアントの一覧
const allTypes: { type: ContactItemType; label: string }[] = [
  { type: 'default',     label: 'Default（姓名）' },
  { type: 'date',        label: 'Date（年月日）' },
  { type: 'year',        label: 'Year（年のみ）' },
  { type: 'textbox',     label: 'Textbox（テキストボックス1行）' },
  { type: 'textarea',    label: 'Textarea（テキストエリア複数行）' },
  { type: 'checkbox',    label: 'Checkbox（チェックボックス）' },
  { type: 'radiobutton', label: 'Radiobutton（ラジオボタン）' },
  { type: 'selectbox',   label: 'Selectbox（セレクトボックス）' },
  { type: 'file',        label: 'File（ファイル添付）' },
]
</script>

<template>
  <div class="p-8 space-y-12">
    <h1 class="text-2xl font-bold text-text-primary">AppContactItemType デモ</h1>

    <!-- インタラクティブデモ -->
    <section class="space-y-4">
      <h2 class="text-lg font-bold text-text-primary">インタラクティブデモ</h2>
      <p class="text-sm text-text-secondary">ドロップダウンで type を切り替えてオプションエリアの変化を確認できます。</p>
      <div class="border border-[#e5e5e5] rounded-[8px] p-6">
        <AppContactItemType v-model="interactiveType" />
        <p class="mt-4 text-xs text-text-secondary">現在の type: <code class="bg-[#f8fafc] px-1 rounded">{{ interactiveType }}</code></p>
      </div>
    </section>

    <!-- 全バリアント一覧 -->
    <section class="space-y-6">
      <h2 class="text-lg font-bold text-text-primary">全バリアント一覧（9種）</h2>
      <div
        v-for="item in allTypes"
        :key="item.type"
        class="space-y-2"
      >
        <h3 class="text-sm font-bold text-text-secondary">{{ item.label }}</h3>
        <div class="border border-[#e5e5e5] rounded-[8px] p-6">
          <AppContactItemType :model-value="item.type" />
        </div>
      </div>
    </section>
  </div>
</template>
