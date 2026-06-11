<script setup lang="ts">
import { ref } from 'vue'
import AppSwitchLabel from '@/components/molecules/AppSwitchLabel.vue'

// インタラクティブデモ用の状態
const interactiveValue = ref(false)
const interactiveLeft = ref('通知')
const interactiveRight = ref('受け取る')
const interactiveDisabled = ref(false)
</script>

<template>
  <div class="p-8 space-y-10">
    <h1 class="text-xl font-bold text-text-primary">AppSwitchLabel デモ</h1>

    <!-- ラベルなし -->
    <section class="space-y-4">
      <h2 class="text-base font-medium text-text-primary border-b pb-2">ラベルなし</h2>
      <div class="flex items-center gap-6">
        <AppSwitchLabel />
        <AppSwitchLabel :model-value="true" />
      </div>
    </section>

    <!-- 左ラベルのみ -->
    <section class="space-y-4">
      <h2 class="text-base font-medium text-text-primary border-b pb-2">左ラベルのみ</h2>
      <div class="flex items-center gap-6">
        <AppSwitchLabel left-label="通知を受け取る" />
        <AppSwitchLabel left-label="通知を受け取る" :model-value="true" />
      </div>
    </section>

    <!-- 右ラベルのみ -->
    <section class="space-y-4">
      <h2 class="text-base font-medium text-text-primary border-b pb-2">右ラベルのみ</h2>
      <div class="flex items-center gap-6">
        <AppSwitchLabel right-label="有効にする" />
        <AppSwitchLabel right-label="有効にする" :model-value="true" />
      </div>
    </section>

    <!-- 左右両方のラベル -->
    <section class="space-y-4">
      <h2 class="text-base font-medium text-text-primary border-b pb-2">両ラベル</h2>
      <div class="flex items-center gap-6">
        <AppSwitchLabel left-label="OFF" right-label="ON" />
        <AppSwitchLabel left-label="OFF" right-label="ON" :model-value="true" />
      </div>
    </section>

    <!-- disabled 状態 -->
    <section class="space-y-4">
      <h2 class="text-base font-medium text-text-primary border-b pb-2">disabled</h2>
      <div class="flex items-center gap-6">
        <AppSwitchLabel left-label="設定変更不可" disabled />
        <AppSwitchLabel left-label="設定変更不可" :model-value="true" disabled />
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section class="space-y-4">
      <h2 class="text-base font-medium text-text-primary border-b pb-2">インタラクティブデモ</h2>
      <div class="flex flex-col gap-4">
        <!-- プレビュー -->
        <div class="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
          <AppSwitchLabel
            v-model="interactiveValue"
            :left-label="interactiveLeft || undefined"
            :right-label="interactiveRight || undefined"
            :disabled="interactiveDisabled"
          />
          <span class="text-sm text-gray-500">
            現在の値: <strong>{{ interactiveValue }}</strong>
          </span>
        </div>
        <!-- コントロール -->
        <div class="grid grid-cols-2 gap-3 text-sm">
          <label class="flex flex-col gap-1">
            <span class="font-medium text-text-primary">leftLabel</span>
            <input
              v-model="interactiveLeft"
              type="text"
              class="border rounded px-2 py-1 text-sm"
              placeholder="（空欄でラベルなし）"
            />
          </label>
          <label class="flex flex-col gap-1">
            <span class="font-medium text-text-primary">rightLabel</span>
            <input
              v-model="interactiveRight"
              type="text"
              class="border rounded px-2 py-1 text-sm"
              placeholder="（空欄でラベルなし）"
            />
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input v-model="interactiveDisabled" type="checkbox" />
            <span class="font-medium text-text-primary">disabled</span>
          </label>
        </div>
      </div>
    </section>
  </div>
</template>
