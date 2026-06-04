<script setup lang="ts">
import { ref } from 'vue'
import AppRadioButton from '@/components/molecules/AppRadioButton.vue'

// テキスト形式グループのデモ
const selectedText = ref('a')

// ボックス形式グループのデモ
const selectedBox = ref('a')

// インタラクティブデモ用
const demoVariant = ref<'text' | 'box'>('text')
const demoDisabled = ref(false)
const demoSelected = ref('a')
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <h1 class="mb-8 text-2xl font-bold text-slate-800">AppRadioButton デモ</h1>
    <p class="mb-2 text-xs text-slate-400">
      Figma: RadioButton/Text（917:52673）・RadioButton/Box（917:53007）
    </p>

    <!-- テキスト形式 -->
    <section class="mb-10 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-700">テキスト形式（variant="text"）</h2>
      <div class="space-y-1">
        <AppRadioButton
          v-model="selectedText"
          variant="text"
          name="demo-text"
          value="a"
          label="オプション A"
        />
        <AppRadioButton
          v-model="selectedText"
          variant="text"
          name="demo-text"
          value="b"
          label="オプション B"
        />
        <AppRadioButton
          v-model="selectedText"
          variant="text"
          name="demo-text"
          value="c"
          label="オプション C"
        />
        <AppRadioButton
          v-model="selectedText"
          variant="text"
          name="demo-text"
          value="d"
          label="オプション D（無効）"
          :disabled="true"
        />
      </div>
      <p class="mt-3 text-xs text-slate-400">選択中: {{ selectedText }}</p>
    </section>

    <!-- ボックス形式 -->
    <section class="mb-10 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-700">ボックス形式（variant="box"）</h2>
      <div class="flex flex-wrap gap-2">
        <AppRadioButton
          v-model="selectedBox"
          variant="box"
          name="demo-box"
          value="a"
          label="オプション A"
        />
        <AppRadioButton
          v-model="selectedBox"
          variant="box"
          name="demo-box"
          value="b"
          label="オプション B"
        />
        <AppRadioButton
          v-model="selectedBox"
          variant="box"
          name="demo-box"
          value="c"
          label="オプション C"
        />
        <AppRadioButton
          v-model="selectedBox"
          variant="box"
          name="demo-box"
          value="d"
          label="オプション D（無効）"
          :disabled="true"
        />
      </div>
      <p class="mt-3 text-xs text-slate-400">選択中: {{ selectedBox }}</p>
    </section>

    <!-- インタラクティブデモ -->
    <section class="rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-700">インタラクティブデモ</h2>

      <!-- コントロール -->
      <div class="mb-6 flex flex-wrap gap-6 rounded-lg bg-slate-50 p-4">
        <div>
          <p class="mb-2 text-xs font-semibold text-slate-600">variant</p>
          <div class="flex gap-3">
            <label class="flex items-center gap-1 text-sm">
              <input v-model="demoVariant" type="radio" value="text" name="ctrl-variant" />
              text
            </label>
            <label class="flex items-center gap-1 text-sm">
              <input v-model="demoVariant" type="radio" value="box" name="ctrl-variant" />
              box
            </label>
          </div>
        </div>
        <div>
          <p class="mb-2 text-xs font-semibold text-slate-600">disabled</p>
          <label class="flex items-center gap-1 text-sm">
            <input v-model="demoDisabled" type="checkbox" />
            disabled
          </label>
        </div>
      </div>

      <!-- プレビュー -->
      <div class="flex flex-wrap gap-2">
        <AppRadioButton
          v-model="demoSelected"
          :variant="demoVariant"
          :disabled="demoDisabled"
          name="demo-interactive"
          value="a"
          label="オプション A"
        />
        <AppRadioButton
          v-model="demoSelected"
          :variant="demoVariant"
          :disabled="demoDisabled"
          name="demo-interactive"
          value="b"
          label="オプション B"
        />
        <AppRadioButton
          v-model="demoSelected"
          :variant="demoVariant"
          :disabled="demoDisabled"
          name="demo-interactive"
          value="c"
          label="オプション C"
        />
      </div>
      <p class="mt-3 text-xs text-slate-400">選択中: {{ demoSelected }}</p>
    </section>
  </div>
</template>
