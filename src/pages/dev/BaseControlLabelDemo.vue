<script setup lang="ts">
import { ref } from 'vue'
import BaseControlLabel from '@/components/atoms/BaseControlLabel.vue'

// インタラクティブデモ用の props
const demoLabel = ref('ラベルテキスト')
const demoWeight = ref<'normal' | 'medium'>('normal')
</script>

<template>
  <div class="p-8 space-y-10">
    <h1 class="text-2xl font-bold text-text-primary">BaseControlLabel デモ</h1>
    <p class="text-sm text-text-secondary">
      フォームコントロール（radio / checkbox / switch）に付属するテキストラベル Atom。
    </p>

    <!-- weight: normal -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-text-primary border-b pb-2">weight: normal（デフォルト）</h2>
      <div class="flex items-center gap-6">
        <BaseControlLabel label="ラジオボタンのラベル" weight="normal" />
        <BaseControlLabel label="チェックボックスのラベル" />
        <BaseControlLabel label="スイッチのラベル" weight="normal" />
      </div>
    </section>

    <!-- weight: medium -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-text-primary border-b pb-2">weight: medium（RadioButton box variant 用）</h2>
      <div class="flex items-center gap-6">
        <BaseControlLabel label="ボックスラジオボタンのラベル" weight="medium" />
        <BaseControlLabel label="別のボックス選択肢" weight="medium" />
      </div>
    </section>

    <!-- 実際の使用場面（context） -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-text-primary border-b pb-2">使用場面イメージ</h2>
      <div class="space-y-3">
        <label class="inline-flex items-center gap-2 cursor-pointer">
          <input type="radio" class="w-4 h-4 accent-blue-600" />
          <BaseControlLabel label="テキスト形式のラジオボタン" weight="normal" />
        </label>
        <label class="inline-flex items-center gap-[6px] px-[2px] cursor-pointer">
          <input type="checkbox" class="w-5 h-5 accent-blue-600" />
          <BaseControlLabel label="チェックボックスのラベル" weight="normal" />
        </label>
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-text-primary border-b pb-2">インタラクティブデモ</h2>
      <div class="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg max-w-sm">
        <div class="space-y-1">
          <label class="text-xs text-text-secondary font-medium">label</label>
          <input
            v-model="demoLabel"
            type="text"
            class="w-full border rounded px-3 py-1.5 text-sm"
          />
        </div>
        <div class="space-y-1">
          <label class="text-xs text-text-secondary font-medium">weight</label>
          <select v-model="demoWeight" class="w-full border rounded px-3 py-1.5 text-sm">
            <option value="normal">normal</option>
            <option value="medium">medium</option>
          </select>
        </div>
        <div class="pt-2 border-t">
          <BaseControlLabel :label="demoLabel" :weight="demoWeight" />
        </div>
      </div>
    </section>
  </div>
</template>
