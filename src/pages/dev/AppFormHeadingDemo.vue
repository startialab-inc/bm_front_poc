<script setup lang="ts">
import { ref } from 'vue'
import AppFormHeading from '@/components/molecules/AppFormHeading.vue'

// インタラクティブデモ用
const demoTitle = ref('基本設定')
const demoDescription = ref('1行目の説明文が入ります。<br/>2行目の説明文が入ります。')
const showDescription = ref(true)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="mb-8 text-2xl font-bold text-gray-800">AppFormHeading デモ</h1>

    <!-- タイトルのみ -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">タイトルのみ</h2>
      <AppFormHeading title="基本設定" />
    </section>

    <!-- タイトル＋説明文あり -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">タイトル＋説明文</h2>
      <AppFormHeading title="基本設定" description="説明文が入ります" />
    </section>

    <!-- 長い説明文 -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">長い説明文</h2>
      <AppFormHeading
        title="ページ公開設定"
        description="このセクションでは、ページの公開状態やスケジュールを設定できます。設定を変更した場合は必ず保存ボタンをクリックしてください。"
      />
    </section>

    <!-- &lt;br/&gt; による改行 -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">&lt;br/&gt; による改行</h2>
      <AppFormHeading
        title="利用規約"
        description="本サービスをご利用いただくには、利用規約への同意が必要です。<br/>詳細は各セクションをご確認ください。"
      />
    </section>

    <!-- インタラクティブ -->
    <section class="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-500">インタラクティブ</h2>
      <div class="mb-4 flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <label class="w-24 text-sm text-gray-600">タイトル</label>
          <input
            v-model="demoTitle"
            type="text"
            class="rounded border border-gray-300 px-2 py-1 text-sm"
          />
        </div>
        <div class="flex items-center gap-3">
          <label class="w-24 text-sm text-gray-600">説明文</label>
          <input
            v-model="demoDescription"
            type="text"
            class="rounded border border-gray-300 px-2 py-1 text-sm"
          />
        </div>
        <div class="flex items-center gap-3">
          <label class="w-24 text-sm text-gray-600">説明文を表示</label>
          <input v-model="showDescription" type="checkbox" />
        </div>
      </div>
      <div class="rounded-lg border border-gray-100 p-4">
        <AppFormHeading
          :title="demoTitle"
          :description="showDescription ? demoDescription : undefined"
        />
      </div>
    </section>
  </div>
</template>
