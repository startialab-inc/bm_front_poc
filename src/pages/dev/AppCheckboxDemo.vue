<script setup lang="ts">
import { ref } from 'vue'
import AppCheckbox from '@/components/molecules/AppCheckbox.vue'

// 単体トグルデモ
const toggle1 = ref<string | number | boolean | undefined>(undefined)
const toggle2 = ref<string | number | boolean | undefined>(true)

// グループデモ（複数チェックボックス）
const notifications = ref<string | undefined>(undefined)
const marketing = ref<string | undefined>(undefined)
const updates = ref<string | undefined>(undefined)

// インタラクティブデモ用
const demoDisabled = ref(false)
const demoChecked = ref<string | number | boolean | undefined>(undefined)
const demoLabel = ref('このページのアクセス URL を変更する')
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <h1 class="mb-8 text-2xl font-bold text-slate-800">AppCheckbox デモ</h1>
    <p class="mb-2 text-xs text-slate-400">
      Figma: Checkbox（917:53263）
    </p>

    <!-- 単体トグル -->
    <section class="mb-10 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-700">単体トグル（boolean モード）</h2>
      <div class="space-y-3">
        <AppCheckbox
          v-model="toggle1"
          label="このページのアクセス URL を変更する（未選択）"
        />
        <AppCheckbox
          v-model="toggle2"
          label="このページのアクセス URL を変更する（選択済み）"
        />
      </div>
      <p class="mt-3 text-xs text-slate-400">
        未選択の値: {{ toggle1 ?? 'undefined' }} / 選択済みの値: {{ toggle2 }}
      </p>
    </section>

    <!-- 無効状態 -->
    <section class="mb-10 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-700">無効状態（disabled）</h2>
      <div class="space-y-3">
        <AppCheckbox
          :model-value="undefined"
          label="無効・未選択"
          :disabled="true"
        />
        <AppCheckbox
          :model-value="true"
          label="無効・選択済み"
          :disabled="true"
        />
      </div>
    </section>

    <!-- グループデモ -->
    <section class="mb-10 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-700">グループデモ（value バインド）</h2>
      <div class="space-y-3">
        <AppCheckbox
          v-model="notifications"
          value="notifications"
          label="メール通知を受け取る"
        />
        <AppCheckbox
          v-model="marketing"
          value="marketing"
          label="マーケティング情報を受け取る"
        />
        <AppCheckbox
          v-model="updates"
          value="updates"
          label="製品アップデート情報を受け取る"
        />
      </div>
      <p class="mt-3 text-xs text-slate-400">
        通知: {{ notifications ?? '未選択' }} /
        マーケティング: {{ marketing ?? '未選択' }} /
        アップデート: {{ updates ?? '未選択' }}
      </p>
    </section>

    <!-- インタラクティブデモ -->
    <section class="rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-700">インタラクティブデモ</h2>

      <!-- コントロール -->
      <div class="mb-6 flex flex-wrap gap-6 rounded-lg bg-slate-50 p-4">
        <div>
          <p class="mb-2 text-xs font-semibold text-slate-600">disabled</p>
          <label class="flex items-center gap-1 text-sm">
            <input v-model="demoDisabled" type="checkbox" />
            disabled
          </label>
        </div>
        <div>
          <p class="mb-2 text-xs font-semibold text-slate-600">label テキスト</p>
          <input
            v-model="demoLabel"
            type="text"
            class="rounded border border-slate-200 px-2 py-1 text-sm"
          />
        </div>
      </div>

      <!-- プレビュー -->
      <div class="flex flex-col gap-3">
        <AppCheckbox
          v-model="demoChecked"
          :label="demoLabel"
          :disabled="demoDisabled"
        />
      </div>
      <p class="mt-3 text-xs text-slate-400">値: {{ demoChecked ?? 'undefined' }}</p>
    </section>
  </div>
</template>
