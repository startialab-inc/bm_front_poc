<script setup lang="ts">
import { ref } from 'vue'
import AppConfirmSection from '@/components/molecules/AppConfirmSection.vue'

// インタラクティブデモ用
const demoType = ref<'information' | 'caution'>('information')
const demoItems = ref(['注意事項1', '注意事項2'])
const newItemText = ref('')

function addItem() {
  if (newItemText.value.trim()) {
    demoItems.value.push(newItemText.value.trim())
    newItemText.value = ''
  }
}

function removeLastItem() {
  demoItems.value.pop()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="mb-8 text-2xl font-bold text-gray-800">AppConfirmSection デモ</h1>

    <!-- information（デフォルト） -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">
        type="information"（デフォルト）：案内メッセージ
      </h2>
      <AppConfirmSection
        type="information"
        :items="[
          'シェアパーツを表示したい箇所に次の書式で記述してください。「 %{入力したタグ名}% 」',
          '内容に記述したテキストやHTMLが再構築時に設定したタグと置き換わります。',
        ]"
      />
    </section>

    <!-- caution（警告） -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">
        type="caution"：警告メッセージ
      </h2>
      <AppConfirmSection
        type="caution"
        :items="[
          'URLが正しくありません。',
          'タイトルは必須項目です。',
          '公開日は今日以降の日付を指定してください。',
        ]"
      />
    </section>

    <!-- 1件のみ -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">
        1件のみ（各バリアント）
      </h2>
      <div class="flex flex-col gap-3">
        <AppConfirmSection
          type="information"
          :items="['シェアパーツを表示したい箇所に次の書式で記述してください。']"
        />
        <AppConfirmSection
          type="caution"
          :items="['URLが正しくありません。']"
        />
      </div>
    </section>

    <!-- 長文テキスト（折り返し確認） -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">
        長文テキスト（折り返し確認）
      </h2>
      <div class="flex flex-col gap-3">
        <AppConfirmSection
          type="information"
          :items="[
            'これは非常に長い案内メッセージのサンプルテキストです。長文の場合は省略せずに折り返して全文を表示します。',
          ]"
        />
        <AppConfirmSection
          type="caution"
          :items="[
            'これは非常に長い警告メッセージのサンプルテキストです。長文の場合は省略せずに折り返して全文を表示します。',
          ]"
        />
      </div>
    </section>

    <!-- 空配列 -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">
        空配列（何も表示されない）
      </h2>
      <div class="rounded border border-dashed border-gray-300 p-4">
        <AppConfirmSection :items="[]" />
        <p class="mt-2 text-xs text-gray-400">※ items=[] のとき何も表示されない</p>
      </div>
    </section>

    <!-- インタラクティブ -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">インタラクティブ</h2>
      <div class="mb-4 flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <label class="w-24 text-sm text-gray-600">type</label>
          <select v-model="demoType" class="rounded border border-gray-300 px-2 py-1 text-sm">
            <option value="information">information</option>
            <option value="caution">caution</option>
          </select>
        </div>
        <div class="flex items-center gap-3">
          <input
            v-model="newItemText"
            type="text"
            placeholder="メッセージを入力..."
            class="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
            @keydown.enter="addItem"
          />
          <button
            class="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
            @click="addItem"
          >
            追加
          </button>
          <button
            class="rounded bg-gray-400 px-3 py-1 text-sm text-white hover:bg-gray-500"
            @click="removeLastItem"
          >
            最後を削除
          </button>
        </div>
      </div>
      <div class="rounded-lg border border-gray-100 p-4">
        <AppConfirmSection :type="demoType" :items="demoItems" />
      </div>
    </section>
  </div>
</template>
