<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseCheckboxInput from '@/components/atoms/BaseCheckboxInput.vue'

// グループ選択デモ用（各チェックボックスは独立して ON/OFF）
const groupA = ref('optionA')
const groupB = ref('')
const groupC = ref('optionC')

// インタラクティブデモ用
const demoValue = ref('demo-a')
const demoSelected = ref('demo-a')
const demoDisabled = ref(false)
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <!-- ページヘッダー -->
    <div class="mb-8">
      <RouterLink to="/dev" class="text-sm text-brand-500 hover:underline">← デモ一覧</RouterLink>
      <h1 class="mt-2 text-2xl font-bold text-slate-800">BaseCheckboxInput</h1>
      <p class="mt-1 text-sm text-slate-500">
        チェックボックス基礎入力コンポーネント（Atom）。Molecule の AppCheckbox.vue がこのコンポーネントをラップして使用する。
      </p>
      <p class="mt-1 text-xs text-slate-400">Figma node-id: なし（新設コンポーネント）</p>
    </div>

    <!-- セクション1: 状態別 -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        状態別（State）
      </h2>
      <p class="text-xs text-slate-400 mb-4">
        未チェック: 塗りつぶしグレー（bg-btn-disable #d1d5db）/ チェック済み: ブランド青（bg-btn-primary #2862cb）+ 白チェックマーク / disabled: 半透明（opacity-50）
      </p>
      <div class="flex items-start gap-10 flex-wrap">
        <!-- 未チェック -->
        <div class="text-center">
          <BaseCheckboxInput value="a" model-value="" />
          <p class="text-[10px] text-slate-400 mt-2">未チェック</p>
        </div>
        <!-- チェック済み -->
        <div class="text-center">
          <BaseCheckboxInput value="b" model-value="b" />
          <p class="text-[10px] text-slate-400 mt-2">チェック済み</p>
        </div>
        <!-- disabled 未チェック -->
        <div class="text-center">
          <BaseCheckboxInput value="c" model-value="" disabled />
          <p class="text-[10px] text-slate-400 mt-2">Disabled（未チェック）</p>
        </div>
        <!-- disabled チェック済み -->
        <div class="text-center">
          <BaseCheckboxInput value="d" model-value="d" disabled />
          <p class="text-[10px] text-slate-400 mt-2">Disabled（チェック済み）</p>
        </div>
      </div>
    </section>

    <!-- セクション2: グループ選択（複数同時チェック可） -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        グループ選択（複数同時チェック可）
      </h2>
      <p class="text-xs text-slate-400 mb-4">
        ラジオボタンと異なり、チェックボックスは複数を同時に選択できる。各チェックボックスは独立した v-model を持つ。
      </p>
      <div class="flex items-center gap-6 flex-wrap mb-3">
        <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <BaseCheckboxInput v-model="groupA" value="optionA" />
          <span>オプション A</span>
        </label>
        <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <BaseCheckboxInput v-model="groupB" value="optionB" />
          <span>オプション B</span>
        </label>
        <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <BaseCheckboxInput v-model="groupC" value="optionC" />
          <span>オプション C</span>
        </label>
      </div>
      <p class="text-xs text-slate-500">
        A: <strong class="text-slate-700">{{ groupA || '（未選択）' }}</strong>
        / B: <strong class="text-slate-700">{{ groupB || '（未選択）' }}</strong>
        / C: <strong class="text-slate-700">{{ groupC || '（未選択）' }}</strong>
      </p>
    </section>

    <!-- セクション3: インタラクティブデモ -->
    <section class="bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        インタラクティブデモ
      </h2>
      <div class="flex gap-8">
        <!-- コントロールパネル -->
        <div class="space-y-3 min-w-48">
          <div>
            <label class="text-xs font-medium text-slate-600 block mb-1">value（このチェックボックスの値）</label>
            <input
              v-model="demoValue"
              type="text"
              placeholder="例: option1"
              class="text-sm border border-slate-300 rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label class="text-xs font-medium text-slate-600 block mb-1">modelValue（選択中の値）</label>
            <input
              v-model="demoSelected"
              type="text"
              placeholder="例: option1"
              class="text-sm border border-slate-300 rounded px-2 py-1 w-full"
            />
          </div>
          <div class="flex items-center gap-2">
            <input id="demoDisabled" v-model="demoDisabled" type="checkbox" />
            <label for="demoDisabled" class="text-xs font-medium text-slate-600">disabled</label>
          </div>
          <p class="text-[10px] text-slate-400">
            value と modelValue が一致するとチェック状態になる
          </p>
        </div>

        <!-- プレビュー -->
        <div class="flex-1 flex items-center justify-center bg-slate-50 rounded-lg p-8">
          <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <BaseCheckboxInput
              v-model="demoSelected"
              :value="demoValue"
              :disabled="demoDisabled"
            />
            <span>ラベルテキスト（value: {{ demoValue }}）</span>
          </label>
        </div>
      </div>
    </section>
  </div>
</template>
