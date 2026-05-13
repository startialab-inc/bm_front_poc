<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseRadioInput from '@/components/atoms/BaseRadioInput.vue'

// グループ選択デモ用
const groupSelected = ref('option1')

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
      <h1 class="mt-2 text-2xl font-bold text-slate-800">BaseRadioInput</h1>
      <p class="mt-1 text-sm text-slate-500">
        ラジオボタン基礎入力コンポーネント（Atom）。Molecule の AppRadioButton.vue がこのコンポーネントをラップして使用する。
      </p>
      <p class="mt-1 text-xs text-slate-400">Figma node-id: なし（新設コンポーネント）</p>
    </div>

    <!-- セクション1: 状態別 -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        状態別（State）
      </h2>
      <p class="text-xs text-slate-400 mb-4">
        未選択: 塗りつぶしグレー（bg-btn-disable #d1d5db）/ 選択済み: 青外周4px + 白中心ドット8px / disabled: 半透明（opacity-50）
      </p>
      <div class="flex items-start gap-10 flex-wrap">
        <!-- 未選択 -->
        <div class="text-center">
          <BaseRadioInput value="a" name="state-demo" model-value="" />
          <p class="text-[10px] text-slate-400 mt-2">未選択</p>
        </div>
        <!-- 選択済み -->
        <div class="text-center">
          <BaseRadioInput value="b" name="state-demo-2" model-value="b" />
          <p class="text-[10px] text-slate-400 mt-2">選択済み</p>
        </div>
        <!-- disabled 未選択 -->
        <div class="text-center">
          <BaseRadioInput value="c" name="state-demo-3" model-value="" disabled />
          <p class="text-[10px] text-slate-400 mt-2">Disabled（未選択）</p>
        </div>
        <!-- disabled 選択済み -->
        <div class="text-center">
          <BaseRadioInput value="d" name="state-demo-4" model-value="d" disabled />
          <p class="text-[10px] text-slate-400 mt-2">Disabled（選択済み）</p>
        </div>
      </div>
    </section>

    <!-- セクション2: グループ選択（相互排他） -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        グループ選択（同一 name で相互排他）
      </h2>
      <p class="text-xs text-slate-400 mb-4">
        同じ <code class="bg-slate-100 px-1 rounded">name</code> 属性を持つラジオボタンは一度に1つしか選択できない。
        Molecule の AppRadioButton はこのパターンを内包する。
      </p>
      <div class="flex items-center gap-4 flex-wrap mb-3">
        <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <BaseRadioInput v-model="groupSelected" value="option1" name="group-demo" />
          <span>オプション 1</span>
        </label>
        <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <BaseRadioInput v-model="groupSelected" value="option2" name="group-demo" />
          <span>オプション 2</span>
        </label>
        <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <BaseRadioInput v-model="groupSelected" value="option3" name="group-demo" />
          <span>オプション 3</span>
        </label>
      </div>
      <p class="text-xs text-slate-500">
        選択中の値: <strong class="text-slate-700">{{ groupSelected }}</strong>
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
            <label class="text-xs font-medium text-slate-600 block mb-1">value（このボタンの値）</label>
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
            value と modelValue が一致すると選択状態になる
          </p>
        </div>

        <!-- プレビュー -->
        <div class="flex-1 flex items-center justify-center bg-slate-50 rounded-lg p-8">
          <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <BaseRadioInput
              v-model="demoSelected"
              :value="demoValue"
              name="interactive-demo"
              :disabled="demoDisabled"
            />
            <span>ラベルテキスト（value: {{ demoValue }}）</span>
          </label>
        </div>
      </div>
    </section>
  </div>
</template>
