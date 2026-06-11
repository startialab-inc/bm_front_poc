<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppSwitch from '@/components/atoms/AppSwitch.vue'
import AppSwitchLabel from '@/components/molecules/AppSwitchLabel.vue'

// インタラクティブデモ用
const demoValue = ref(false)

// 複数スイッチのフォームデモ用
const notifications = ref(true)
const darkMode = ref(false)
const autoSave = ref(true)
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <!-- ページヘッダー -->
    <div class="mb-8">
      <RouterLink to="/dev" class="text-sm text-brand-500 hover:underline">← デモ一覧</RouterLink>
      <h1 class="mt-2 text-2xl font-bold text-slate-800">AppSwitch</h1>
      <p class="mt-1 text-sm text-slate-500">
        トグルスイッチコンポーネント（Atom）。ON/OFF の2バリアントを持ち、v-model で状態を制御する。
      </p>
      <p class="mt-1 text-xs text-slate-400">Figma node-id: 849:2931</p>
    </div>

    <!-- セクション1: バリアント -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        バリアント
      </h2>
      <p class="text-xs text-slate-400 mb-4">
        OFF: 背景色 #e2e8f0（グレー）、つまみ左端 ／ ON: 背景色 #34d399（緑）、つまみ右端
      </p>
      <div class="flex items-center gap-8 flex-wrap">
        <div class="flex flex-col items-center gap-2">
          <AppSwitch :model-value="false" />
          <p class="text-[10px] text-slate-400">OFF（modelValue=false）</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <AppSwitch :model-value="true" />
          <p class="text-[10px] text-slate-400">ON（modelValue=true）</p>
        </div>
      </div>
    </section>

    <!-- セクション2: v-model インタラクティブデモ -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        v-model インタラクティブデモ
      </h2>
      <p class="text-xs text-slate-400 mb-4">
        クリックで ON/OFF が切り替わる。つまみが left プロパティの transition でアニメーションする。
      </p>
      <div class="flex flex-col items-center gap-4">
        <AppSwitch v-model="demoValue" />
        <p class="text-sm text-slate-600">
          状態:
          <span
            class="font-semibold"
            :class="demoValue ? 'text-emerald-600' : 'text-slate-400'"
          >{{ demoValue ? 'ON' : 'OFF' }}</span>
        </p>
        <p class="text-xs text-slate-400">（modelValue: {{ demoValue }}）</p>
      </div>
    </section>

    <!-- セクション3: AppSwitchLabel（Molecule）を使ったフォームデモ -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        AppSwitchLabel（Molecule）を使ったフォームデモ
      </h2>
      <p class="text-xs text-slate-400 mb-4">
        AppSwitchLabel は AppSwitch に leftLabel / rightLabel を組み合わせた Molecule。
        ラベルを含めた全体がクリック可能になる。
      </p>
      <div class="space-y-4 max-w-xs">
        <AppSwitchLabel v-model="notifications" right-label="通知" />
        <AppSwitchLabel v-model="darkMode" right-label="ダークモード" />
        <AppSwitchLabel v-model="autoSave" right-label="自動保存" />
        <div class="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-400">
          <p>通知: {{ notifications ? 'ON' : 'OFF' }}</p>
          <p>ダークモード: {{ darkMode ? 'ON' : 'OFF' }}</p>
          <p>自動保存: {{ autoSave ? 'ON' : 'OFF' }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
