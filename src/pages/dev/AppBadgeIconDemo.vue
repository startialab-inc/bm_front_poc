<script setup lang="ts">
import { ref } from 'vue'
import AppBadgeIcon from '@/components/atoms/AppBadgeIcon.vue'

type BadgeIconType = 'Contact' | 'Editable' | 'PageSetting' | 'OpenTerm' | 'BowNowScript' | 'BowNow' | 'Curation'

// 全タイプ一覧
const types: { type: BadgeIconType; label: string; icon: string; node: string }[] = [
  { type: 'Contact',      label: 'コンタクト',    icon: 'fa-envelope',   node: '538:11924 / 788:15806' },
  { type: 'Editable',     label: '編集可能',      icon: 'fa-users',      node: '538:11925 / 788:15810' },
  { type: 'PageSetting',  label: 'ページ設定',    icon: 'fa-gears',      node: '538:11926 / 788:15812' },
  { type: 'OpenTerm',     label: '公開期間',      icon: 'fa-calendar',   node: '538:11927 / 788:15814' },
  { type: 'BowNowScript', label: 'BowNow スクリプト', icon: 'fa-code',  node: '538:11928 / 788:15816' },
  { type: 'BowNow',       label: 'BowNow',       icon: '（画像アセット）', node: '788:15785 / 788:15818' },
  { type: 'Curation',     label: 'キュレーション', icon: 'fa-quote-left', node: '1173:56462 / 1173:56464' },
]

// インタラクティブデモ用状態
const demoType = ref<BadgeIconType>('PageSetting')
const demoActive = ref(true)
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-800">AppBadgeIcon</h1>
      <p class="mt-1 text-sm text-slate-500">
        Figma node-id: <code class="text-xs bg-slate-200 px-1 rounded">538:11930</code>（Badge/PageSettingIcon）
      </p>
      <p class="mt-1 text-xs text-slate-400">
        24px 丸型アイコンバッジ。7種類のタイプ × active/inactive で計14バリアント。
      </p>
    </div>

    <!-- 全タイプ一覧（active / inactive 対比） -->
    <section class="mb-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 class="mb-4 text-base font-semibold text-slate-700">全タイプ一覧（active / inactive 対比）</h2>
      <p class="mb-4 text-xs text-slate-400">
        上段: active=true（有効）、下段: active=false（無効）
      </p>
      <div class="grid grid-cols-7 gap-6">
        <div
          v-for="item in types"
          :key="item.type"
          class="flex flex-col items-center gap-2"
        >
          <AppBadgeIcon :type="item.type" :active="true" />
          <AppBadgeIcon :type="item.type" :active="false" />
          <div class="text-center">
            <p class="text-[10px] font-medium text-slate-600 leading-tight">{{ item.type }}</p>
            <p class="text-[10px] text-slate-400 leading-tight">{{ item.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- タイプ別詳細 -->
    <section class="mb-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 class="mb-4 text-base font-semibold text-slate-700">タイプ別詳細</h2>
      <p class="mb-4 text-xs text-slate-400">
        背景色の仕様：BowNow / BowNowScript の active 時は深紅（#5a0000）。その他は brand/blue-monkey/800（#143166）。inactive は全タイプ共通で bg-sf-tertiary（#e2e8f0）。
      </p>
      <div class="space-y-3">
        <div
          v-for="item in types"
          :key="item.type"
          class="flex items-center gap-4 py-2 border-b border-slate-100 last:border-0"
        >
          <div class="flex gap-2 shrink-0">
            <AppBadgeIcon :type="item.type" :active="true" />
            <AppBadgeIcon :type="item.type" :active="false" />
          </div>
          <div class="min-w-0">
            <p class="text-sm font-medium text-slate-700">{{ item.type }}<span class="ml-2 text-xs text-slate-400 font-normal">{{ item.label }}</span></p>
            <p class="text-[10px] text-slate-400">アイコン: {{ item.icon }}　Figma node: {{ item.node }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section class="mb-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 class="mb-4 text-base font-semibold text-slate-700">インタラクティブデモ</h2>

      <!-- タイプ切り替え -->
      <div class="mb-3">
        <p class="mb-2 text-xs text-slate-500">type:</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="item in types"
            :key="item.type"
            class="text-xs border rounded px-2 py-1 transition-colors"
            :class="demoType === item.type
              ? 'bg-slate-800 text-white border-slate-800'
              : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'"
            @click="demoType = item.type"
          >
            {{ item.type }}
          </button>
        </div>
      </div>

      <!-- active 切り替え -->
      <div class="mb-4">
        <p class="mb-2 text-xs text-slate-500">active:</p>
        <div class="flex gap-2">
          <button
            class="text-xs border rounded px-3 py-1 transition-colors"
            :class="demoActive
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'"
            @click="demoActive = true"
          >
            true
          </button>
          <button
            class="text-xs border rounded px-3 py-1 transition-colors"
            :class="!demoActive
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'"
            @click="demoActive = false"
          >
            false
          </button>
        </div>
      </div>

      <!-- プレビュー -->
      <div class="flex items-center justify-center bg-slate-50 rounded-lg p-8 min-h-[100px]">
        <AppBadgeIcon :type="demoType" :active="demoActive" />
      </div>
      <p class="mt-2 text-center text-xs text-slate-400">
        type="{{ demoType }}" :active="{{ demoActive }}"
      </p>
    </section>
  </div>
</template>
