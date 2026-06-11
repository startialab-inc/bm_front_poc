<script setup lang="ts">
import { ref } from 'vue'
import AppSidebarSubMenuItem from '@/components/molecules/AppSidebarSubMenuItem.vue'
import AppSidebarMenuItem from '@/components/molecules/AppSidebarMenuItem.vue'

// インタラクティブデモ用の状態
const demoLabel = ref('ページ一覧')
const demoCurrent = ref(false)
const demoNotification = ref('')
const demoNotificationDot = ref(false)
const demoNotificationType = ref<'info' | 'success' | 'warning' | 'danger'>('info')
const clickCount = ref(0)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="mb-8 text-2xl font-bold text-gray-800">AppSidebarSubMenuItem デモ</h1>
    <p class="mb-6 text-sm text-gray-500">
      Figma: 417:8671 / side-bar/sub-menu<br>
      サイドバーのサブメニュー項目。3状態（Default / Current / Hover）で背景色が変化。
    </p>

    <!-- Default / Current 状態 -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">状態バリアント</h2>
      <div class="flex flex-col gap-2 rounded-lg bg-white p-4 shadow-sm">
        <p class="mb-1 text-xs text-gray-400">Default（背景なし）</p>
        <AppSidebarSubMenuItem label="ページ一覧" />

        <p class="mb-1 mt-3 text-xs text-gray-400">Current（内側 bg-[#e2e8f0]）</p>
        <AppSidebarSubMenuItem label="新規作成" :current="true" />

        <p class="mb-1 mt-3 text-xs text-gray-400">Default（Hover で bg-[#ddeaff] が付く）</p>
        <AppSidebarSubMenuItem label="設定" />
      </div>
    </section>

    <!-- 通知バッジ -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">通知バッジ</h2>
      <div class="flex flex-col gap-2 rounded-lg bg-white p-4 shadow-sm">
        <p class="mb-1 text-xs text-gray-400">info（デフォルト）</p>
        <AppSidebarSubMenuItem label="ページ一覧" notification="3" />

        <p class="mb-1 mt-3 text-xs text-gray-400">success</p>
        <AppSidebarSubMenuItem label="新規作成" notification="5" notification-type="success" />

        <p class="mb-1 mt-3 text-xs text-gray-400">warning</p>
        <AppSidebarSubMenuItem label="設定" notification="12" notification-type="warning" />

        <p class="mb-1 mt-3 text-xs text-gray-400">danger</p>
        <AppSidebarSubMenuItem label="削除" notification="1" notification-type="danger" />

        <p class="mb-1 mt-3 text-xs text-gray-400">通知バッジ + Current</p>
        <AppSidebarSubMenuItem label="お知らせ" notification="99" :current="true" />
      </div>
    </section>

    <!-- ドット通知（true を渡すとテキストなし 12×12px 円） -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">ドット通知（notification=true）</h2>
      <p class="mb-3 text-sm text-gray-500">true を渡すと 12×12px の円のみ表示（テキストなし）</p>
      <div class="flex flex-col gap-2 rounded-lg bg-white p-4 shadow-sm">
        <p class="mb-1 text-xs text-gray-400">info</p>
        <AppSidebarSubMenuItem label="ページ一覧" :notification="true" notification-type="info" />

        <p class="mb-1 mt-3 text-xs text-gray-400">success</p>
        <AppSidebarSubMenuItem label="新規作成" :notification="true" notification-type="success" />

        <p class="mb-1 mt-3 text-xs text-gray-400">warning</p>
        <AppSidebarSubMenuItem label="設定" :notification="true" notification-type="warning" />

        <p class="mb-1 mt-3 text-xs text-gray-400">danger</p>
        <AppSidebarSubMenuItem label="削除" :notification="true" notification-type="danger" />

        <p class="mb-1 mt-3 text-xs text-gray-400">ドット通知 + Current</p>
        <AppSidebarSubMenuItem label="お知らせ" :notification="true" notification-type="danger" :current="true" />
      </div>
    </section>

    <!-- RouterLink バージョン -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">RouterLink バージョン（to あり）</h2>
      <p class="mb-3 text-sm text-gray-500">to を指定すると RouterLink でレンダリングされる</p>
      <div class="flex flex-col gap-2 rounded-lg bg-white p-4 shadow-sm">
        <AppSidebarSubMenuItem label="ページ一覧" to="/" />
        <AppSidebarSubMenuItem label="新規作成（Current）" to="/" :current="true" />
      </div>
    </section>

    <!-- AppSidebarMenuItem 内での使用例 -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">AppSidebarMenuItem 内での使用例</h2>
      <p class="mb-3 text-sm text-gray-500">
        AppSidebarMenuItem の default slot に AppSidebarSubMenuItem を配置する実際の使用パターン
      </p>
      <div class="rounded-lg bg-white p-4 shadow-sm">
        <AppSidebarMenuItem label="ページ管理">
          <AppSidebarSubMenuItem label="ページ一覧" />
          <AppSidebarSubMenuItem label="新規作成" :current="true" />
          <AppSidebarSubMenuItem label="設定" />
        </AppSidebarMenuItem>
      </div>
    </section>

    <!-- 長いテキストの省略 -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">テキスト省略（overflow ellipsis）</h2>
      <div class="rounded-lg bg-white p-4 shadow-sm">
        <AppSidebarSubMenuItem label="とても長いメニューテキストが入力されたときに末尾が省略されることを確認するサンプルテキスト" />
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">インタラクティブデモ</h2>
      <div class="grid grid-cols-2 gap-6">
        <!-- コントロール -->
        <div class="rounded-lg bg-white p-4 shadow-sm">
          <h3 class="mb-3 text-sm font-semibold text-gray-600">設定</h3>
          <div class="flex flex-col gap-3">
            <label class="flex flex-col gap-1">
              <span class="text-xs text-gray-500">label</span>
              <input
                v-model="demoLabel"
                class="rounded border border-gray-200 px-2 py-1 text-sm"
                type="text"
              />
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input v-model="demoNotificationDot" type="checkbox" />
              ドット通知（notification=true）
            </label>
            <label class="flex flex-col gap-1">
              <span class="text-xs text-gray-500">notification テキスト（ドット通知 OFF 時のみ有効。空欄で非表示）</span>
              <input
                v-model="demoNotification"
                :disabled="demoNotificationDot"
                class="rounded border border-gray-200 px-2 py-1 text-sm disabled:opacity-40"
                type="text"
                placeholder="未指定でバッジ非表示"
              />
            </label>
            <label class="flex flex-col gap-1">
              <span class="text-xs text-gray-500">notificationType</span>
              <select
                v-model="demoNotificationType"
                class="rounded border border-gray-200 px-2 py-1 text-sm"
              >
                <option value="info">info</option>
                <option value="success">success</option>
                <option value="warning">warning</option>
                <option value="danger">danger</option>
              </select>
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input v-model="demoCurrent" type="checkbox" />
              current
            </label>
          </div>
          <p class="mt-3 text-xs text-gray-400">
            クリック回数（click emit）: {{ clickCount }}
          </p>
        </div>

        <!-- プレビュー -->
        <div class="flex items-center justify-center rounded-lg bg-white p-4 shadow-sm">
          <AppSidebarSubMenuItem
            :label="demoLabel"
            :current="demoCurrent"
            :notification="demoNotificationDot ? true : (demoNotification || undefined)"
            :notification-type="demoNotificationType"
            @click="clickCount++"
          />
        </div>
      </div>
    </section>
  </div>
</template>
