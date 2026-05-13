<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppButtonIcon from '@/components/atoms/AppButtonIcon.vue'

// インタラクティブデモ用の状態
const demoIcon = ref('arrow-right')
const demoFontType = ref<'fa-solid' | 'fa-regular' | 'fa-brands'>('fa-solid')
const demoDisabled = ref(false)
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <!-- ページヘッダー -->
    <div class="mb-8">
      <RouterLink to="/dev" class="text-sm text-brand-500 hover:underline">← デモ一覧</RouterLink>
      <h1 class="mt-2 text-2xl font-bold text-slate-800">AppButtonIcon</h1>
      <p class="mt-1 text-sm text-slate-500">
        丸型アイコンボタンコンポーネント（32×32px 固定、FontAwesome 対応）
      </p>
      <p class="mt-1 text-xs text-slate-400">
        Figma node-id: 632:8058
      </p>
    </div>

    <!-- セクション1: 状態別 -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        状態別（State）
      </h2>
      <p class="text-xs text-slate-400 mb-4">
        Default: bg-slate-50（#f8fafc）/ Hover・Focus: bg-surface-selected（#eff6ff）/ Disabled: アイコン色が text-icon-disable に変化
      </p>
      <div class="flex items-start gap-8 flex-wrap">
        <!-- Default -->
        <div class="text-center">
          <AppButtonIcon icon="bell" />
          <p class="text-[10px] text-slate-400 mt-2">Default</p>
        </div>
        <!-- Hover（クラスを手動付与して擬似表示） -->
        <div class="text-center">
          <button
            type="button"
            class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-selected"
          >
            <i class="fa-solid fa-bell text-sm text-icon-primary" />
          </button>
          <p class="text-[10px] text-slate-400 mt-2">Hover</p>
        </div>
        <!-- Focus（クラスを手動付与して擬似表示） -->
        <div class="text-center">
          <button
            type="button"
            class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-selected"
          >
            <i class="fa-solid fa-bell text-sm text-icon-primary" />
          </button>
          <p class="text-[10px] text-slate-400 mt-2">Focus</p>
        </div>
        <!-- Disabled -->
        <div class="text-center">
          <AppButtonIcon icon="bell" disabled />
          <p class="text-[10px] text-slate-400 mt-2">Disabled</p>
        </div>
      </div>
    </section>

    <!-- セクション2: アイコン種別 -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        アイコン種別（fontType）
      </h2>

      <!-- fa-solid -->
      <div class="mb-6">
        <p class="text-xs font-medium text-slate-600 mb-1">fa-solid（デフォルト）</p>
        <p class="text-[10px] text-slate-400 mb-3">塗りつぶしアイコン</p>
        <div class="flex items-center gap-4 flex-wrap">
          <div class="text-center">
            <AppButtonIcon icon="arrow-right" />
            <p class="text-[10px] text-slate-400 mt-1">arrow-right</p>
          </div>
          <div class="text-center">
            <AppButtonIcon icon="xmark" />
            <p class="text-[10px] text-slate-400 mt-1">xmark</p>
          </div>
          <div class="text-center">
            <AppButtonIcon icon="magnifying-glass" />
            <p class="text-[10px] text-slate-400 mt-1">magnifying-glass</p>
          </div>
          <div class="text-center">
            <AppButtonIcon icon="chevron-down" />
            <p class="text-[10px] text-slate-400 mt-1">chevron-down</p>
          </div>
          <div class="text-center">
            <AppButtonIcon icon="bell" />
            <p class="text-[10px] text-slate-400 mt-1">bell</p>
          </div>
          <div class="text-center">
            <AppButtonIcon icon="gear" />
            <p class="text-[10px] text-slate-400 mt-1">gear</p>
          </div>
        </div>
      </div>

      <!-- fa-regular -->
      <div class="mb-6">
        <p class="text-xs font-medium text-slate-600 mb-1">fa-regular</p>
        <p class="text-[10px] text-slate-400 mb-3">輪郭線アイコン</p>
        <div class="flex items-center gap-4 flex-wrap">
          <div class="text-center">
            <AppButtonIcon icon="bell" font-type="fa-regular" />
            <p class="text-[10px] text-slate-400 mt-1">bell</p>
          </div>
          <div class="text-center">
            <AppButtonIcon icon="star" font-type="fa-regular" />
            <p class="text-[10px] text-slate-400 mt-1">star</p>
          </div>
          <div class="text-center">
            <AppButtonIcon icon="circle" font-type="fa-regular" />
            <p class="text-[10px] text-slate-400 mt-1">circle</p>
          </div>
        </div>
      </div>

      <!-- fa-brands -->
      <div>
        <p class="text-xs font-medium text-slate-600 mb-1">fa-brands</p>
        <p class="text-[10px] text-slate-400 mb-3">ブランドアイコン</p>
        <div class="flex items-center gap-4 flex-wrap">
          <div class="text-center">
            <AppButtonIcon icon="github" font-type="fa-brands" />
            <p class="text-[10px] text-slate-400 mt-1">github</p>
          </div>
          <div class="text-center">
            <AppButtonIcon icon="twitter" font-type="fa-brands" />
            <p class="text-[10px] text-slate-400 mt-1">twitter</p>
          </div>
        </div>
      </div>
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
            <label class="text-xs font-medium text-slate-600 block mb-1">icon（FA アイコン名）</label>
            <input
              v-model="demoIcon"
              type="text"
              placeholder="例: arrow-right, bell"
              class="text-sm border border-slate-300 rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label class="text-xs font-medium text-slate-600 block mb-1">fontType</label>
            <select
              v-model="demoFontType"
              class="text-sm border border-slate-300 rounded px-2 py-1 w-full"
            >
              <option value="fa-solid">fa-solid</option>
              <option value="fa-regular">fa-regular</option>
              <option value="fa-brands">fa-brands</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <input id="demoDisabled" v-model="demoDisabled" type="checkbox" />
            <label for="demoDisabled" class="text-xs font-medium text-slate-600">disabled</label>
          </div>
        </div>

        <!-- プレビュー -->
        <div class="flex-1 flex items-center justify-center bg-slate-50 rounded-lg p-8">
          <AppButtonIcon
            :icon="demoIcon"
            :font-type="demoFontType"
            :disabled="demoDisabled"
          />
        </div>
      </div>
    </section>
  </div>
</template>
