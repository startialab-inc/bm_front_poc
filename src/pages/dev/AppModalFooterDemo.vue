<script setup lang="ts">
import { ref } from 'vue'
import AppModalFooter from '@/components/molecules/AppModalFooter.vue'
import AppButton from '@/components/atoms/AppButton.vue'

const lastClickLabel = ref<string | null>(null)

function handleClick(label: string) {
  lastClickLabel.value = label
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="mb-8 text-2xl font-bold text-gray-800">AppModalFooter デモ</h1>

    <!-- Basic（2ボタン） -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">
        Basic（2ボタン）: secondary + primary
      </h2>
      <AppModalFooter>
        <AppButton variant="secondary" label="保存して閉じる" @click="handleClick('保存して閉じる')" />
        <AppButton variant="primary" label="保存して設定を続ける" @click="handleClick('保存して設定を続ける')" />
      </AppModalFooter>
    </section>

    <!-- Article（3ボタン） -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">
        Article（3ボタン）: secondary + submit + primary
      </h2>
      <AppModalFooter>
        <AppButton variant="secondary" label="閉じる" @click="handleClick('閉じる')" />
        <AppButton variant="submit" label="申請する" @click="handleClick('申請する')" />
        <AppButton variant="primary" label="保存する" @click="handleClick('保存する')" />
      </AppModalFooter>
    </section>

    <!-- disabled ボタンを含むケース -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">
        disabled ボタンを含むケース
      </h2>
      <AppModalFooter>
        <AppButton variant="secondary" label="保存して閉じる" />
        <AppButton variant="primary" label="保存して設定を続ける" :disabled="true" />
      </AppModalFooter>
    </section>

    <!-- 1ボタン -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">
        1ボタン（閉じるのみ）
      </h2>
      <AppModalFooter>
        <AppButton variant="secondary" label="閉じる" @click="handleClick('閉じる（1ボタン）')" />
      </AppModalFooter>
    </section>

    <!-- クリックログ -->
    <section class="mb-6 rounded-xl bg-blue-50 p-6 shadow-sm">
      <h2 class="mb-2 text-sm font-semibold text-gray-500">クリックログ</h2>
      <p v-if="lastClickLabel" class="text-sm text-gray-700">
        「{{ lastClickLabel }}」がクリックされました
      </p>
      <p v-else class="text-sm text-gray-400">ボタンをクリックしてください</p>
    </section>
  </div>
</template>
