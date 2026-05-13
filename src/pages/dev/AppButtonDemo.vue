<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppButton from '@/components/atoms/AppButton.vue'

// インタラクティブデモ用の状態
const demoVariant = ref<'ghost' | 'primary' | 'submit' | 'destructive' | 'secondary' | 'sort' | 'filter'>('primary')
const demoLabel = ref('ボタン')
const demoIconLeft = ref('')
const demoIconRight = ref('')
const demoDisabled = ref(false)
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <!-- ページヘッダー -->
    <div class="mb-8">
      <RouterLink to="/dev" class="text-sm text-brand-500 hover:underline">← デモ一覧</RouterLink>
      <h1 class="mt-2 text-2xl font-bold text-slate-800">AppButton</h1>
      <p class="mt-1 text-sm text-slate-500">
        汎用ボタンコンポーネント（7バリアント）
      </p>
      <p class="mt-1 text-xs text-slate-400">
        Figma node-id: 520:14190（ghost）/ 523:14502（primary）/ 523:14538（submit）/
        523:14567（destructive）/ 523:14596（secondary）/ 910:42970（sort）/ 910:42969（filter）
      </p>
    </div>

    <!-- セクション1: ghost バリアント -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        ghost バリアント（sm / 32px / 透明背景）
      </h2>

      <div class="mb-4">
        <p class="text-xs text-slate-400 mb-2">右アイコン（ラベル＋アイコン）</p>
        <div class="flex items-center gap-4 flex-wrap">
          <div class="text-center">
            <AppButton variant="ghost" label="アクション" icon-right="circle" />
            <p class="text-[10px] text-slate-400 mt-1">Default</p>
          </div>
          <div class="text-center">
            <AppButton variant="ghost" label="アクション" icon-right="circle" disabled />
            <p class="text-[10px] text-slate-400 mt-1">Disabled</p>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <p class="text-xs text-slate-400 mb-2">左アイコン（アイコン＋ラベル）</p>
        <div class="flex items-center gap-4 flex-wrap">
          <div class="text-center">
            <AppButton variant="ghost" label="アクション" icon-left="circle" />
            <p class="text-[10px] text-slate-400 mt-1">Default</p>
          </div>
          <div class="text-center">
            <AppButton variant="ghost" label="アクション" icon-left="circle" disabled />
            <p class="text-[10px] text-slate-400 mt-1">Disabled</p>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <p class="text-xs text-slate-400 mb-2">両側アイコン（アイコン＋ラベル＋アイコン）</p>
        <div class="flex items-center gap-4 flex-wrap">
          <div class="text-center">
            <AppButton variant="ghost" label="アクション" icon-left="circle" icon-right="chevron-down" />
            <p class="text-[10px] text-slate-400 mt-1">Default</p>
          </div>
          <div class="text-center">
            <AppButton variant="ghost" label="アクション" icon-left="circle" icon-right="chevron-down" disabled />
            <p class="text-[10px] text-slate-400 mt-1">Disabled</p>
          </div>
        </div>
      </div>

      <div>
        <p class="text-xs text-slate-400 mb-2">アイコンなし</p>
        <div class="flex items-center gap-4 flex-wrap">
          <div class="text-center">
            <AppButton variant="ghost" label="アクション" />
            <p class="text-[10px] text-slate-400 mt-1">Default</p>
          </div>
          <div class="text-center">
            <AppButton variant="ghost" label="アクション" disabled />
            <p class="text-[10px] text-slate-400 mt-1">Disabled</p>
          </div>
        </div>
      </div>
    </section>

    <!-- セクション2: filled バリアント -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        filled バリアント（md / 40px）
      </h2>

      <!-- primary -->
      <div class="mb-6">
        <p class="text-xs font-medium text-slate-600 mb-2">primary（青・塗りつぶし）</p>
        <p class="text-[10px] text-slate-400 mb-2">Default: #2862cb / Hover: #1b4187 / Focus: #0d2144 / Disabled: #d1d5db</p>
        <div class="flex items-center gap-4 flex-wrap">
          <div class="text-center">
            <AppButton variant="primary" label="保存" />
            <p class="text-[10px] text-slate-400 mt-1">Default</p>
          </div>
          <div class="text-center">
            <AppButton variant="primary" label="保存" disabled />
            <p class="text-[10px] text-slate-400 mt-1">Disabled</p>
          </div>
        </div>
      </div>

      <!-- submit -->
      <div class="mb-6">
        <p class="text-xs font-medium text-slate-600 mb-2">submit（オレンジ・塗りつぶし）</p>
        <p class="text-[10px] text-slate-400 mb-2">Default: #ea580c / Hover: #f97316 / Focus: #c2410c / Disabled: #d1d5db</p>
        <div class="flex items-center gap-4 flex-wrap">
          <div class="text-center">
            <AppButton variant="submit" label="送信" />
            <p class="text-[10px] text-slate-400 mt-1">Default</p>
          </div>
          <div class="text-center">
            <AppButton variant="submit" label="送信" disabled />
            <p class="text-[10px] text-slate-400 mt-1">Disabled</p>
          </div>
        </div>
      </div>

      <!-- destructive -->
      <div class="mb-6">
        <p class="text-xs font-medium text-slate-600 mb-2">destructive（赤・塗りつぶし）</p>
        <p class="text-[10px] text-slate-400 mb-2">Default: #dc2626 / Hover: #ef4444 / Focus: #b91c1c / Disabled: #d1d5db</p>
        <div class="flex items-center gap-4 flex-wrap">
          <div class="text-center">
            <AppButton variant="destructive" label="削除" />
            <p class="text-[10px] text-slate-400 mt-1">Default</p>
          </div>
          <div class="text-center">
            <AppButton variant="destructive" label="削除" disabled />
            <p class="text-[10px] text-slate-400 mt-1">Disabled</p>
          </div>
        </div>
      </div>

      <!-- secondary -->
      <div>
        <p class="text-xs font-medium text-slate-600 mb-2">secondary（白背景・紺枠線）</p>
        <p class="text-[10px] text-slate-400 mb-2">Default: #ffffff + 枠線 #143166 / Hover: #e2e8f0 / Focus: #e2e8f0（枠線なし） / Disabled: 透明 + 枠線 #d4d4d4</p>
        <div class="flex items-center gap-4 flex-wrap">
          <div class="text-center">
            <AppButton variant="secondary" label="キャンセル" />
            <p class="text-[10px] text-slate-400 mt-1">Default</p>
          </div>
          <div class="text-center">
            <AppButton variant="secondary" label="キャンセル" disabled />
            <p class="text-[10px] text-slate-400 mt-1">Disabled</p>
          </div>
        </div>
      </div>
    </section>

    <!-- セクション3: sort / filter バリアント -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        sort / filter バリアント（md / 40px / アイコン固定）
      </h2>
      <p class="text-xs text-slate-400 mb-4">Figma では単一状態のみ定義。Hover/Focus は ghost に準じた #ddeaff 背景を適用。</p>
      <div class="flex items-center gap-4 flex-wrap">
        <div class="text-center">
          <AppButton variant="sort" />
          <p class="text-[10px] text-slate-400 mt-1">sort（デフォルトラベル）</p>
        </div>
        <div class="text-center">
          <AppButton variant="filter" />
          <p class="text-[10px] text-slate-400 mt-1">filter（デフォルトラベル）</p>
        </div>
        <div class="text-center">
          <AppButton variant="sort" label="名前順に表示" />
          <p class="text-[10px] text-slate-400 mt-1">sort（ラベル指定）</p>
        </div>
      </div>
    </section>

    <!-- セクション4: インタラクティブデモ -->
    <section class="bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        インタラクティブデモ
      </h2>
      <div class="flex gap-8">
        <!-- コントロールパネル -->
        <div class="space-y-3 min-w-48">
          <div>
            <label class="text-xs font-medium text-slate-600 block mb-1">variant</label>
            <select
              v-model="demoVariant"
              class="text-sm border border-slate-300 rounded px-2 py-1 w-full"
            >
              <option value="ghost">ghost</option>
              <option value="primary">primary</option>
              <option value="submit">submit</option>
              <option value="destructive">destructive</option>
              <option value="secondary">secondary</option>
              <option value="sort">sort</option>
              <option value="filter">filter</option>
            </select>
          </div>
          <div>
            <label class="text-xs font-medium text-slate-600 block mb-1">label</label>
            <input
              v-model="demoLabel"
              type="text"
              class="text-sm border border-slate-300 rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label class="text-xs font-medium text-slate-600 block mb-1">iconLeft（FA アイコン名）</label>
            <input
              v-model="demoIconLeft"
              type="text"
              placeholder="例: circle, star"
              class="text-sm border border-slate-300 rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label class="text-xs font-medium text-slate-600 block mb-1">iconRight（FA アイコン名）</label>
            <input
              v-model="demoIconRight"
              type="text"
              placeholder="例: chevron-down, arrow-right"
              class="text-sm border border-slate-300 rounded px-2 py-1 w-full"
            />
          </div>
          <div class="flex items-center gap-2">
            <input id="demoDisabled" v-model="demoDisabled" type="checkbox" />
            <label for="demoDisabled" class="text-xs font-medium text-slate-600">disabled</label>
          </div>
        </div>

        <!-- プレビュー -->
        <div class="flex-1 flex items-center justify-center bg-slate-50 rounded-lg p-8">
          <AppButton
            :variant="demoVariant"
            :label="demoLabel"
            :icon-left="demoIconLeft || undefined"
            :icon-right="demoIconRight || undefined"
            :disabled="demoDisabled"
          />
        </div>
      </div>
    </section>
  </div>
</template>
