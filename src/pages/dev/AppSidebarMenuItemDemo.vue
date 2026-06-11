<script setup lang="ts">
import { ref } from 'vue'
import AppSidebarMenuItem from '@/components/molecules/AppSidebarMenuItem.vue'
import AppSidebarSubMenu from '@/components/molecules/AppSidebarSubMenu.vue'
import AppSidebarSubMenuItem from '@/components/molecules/AppSidebarSubMenuItem.vue'

// インタラクティブデモ用の状態
const demoLabel = ref('ページ管理')
const demoIcon = ref('grip-horizontal')
const demoCurrent = ref(false)
const demoNotification = ref('')
const demoNotificationDot = ref(false)
const demoNotificationType = ref<'info' | 'success' | 'warning' | 'danger'>('success')
const demoHasSubMenu = ref(false)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="mb-8 text-2xl font-bold text-gray-800">AppSidebarMenuItem デモ</h1>

    <!-- sub-menu なし（リンクあり） -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">sub-menu なし（RouterLink）</h2>
      <p class="mb-3 text-sm text-gray-500">chevron アイコンなし・クリックでページ遷移</p>
      <div class="w-fit flex flex-col gap-2 rounded-lg bg-white p-4 shadow-sm">
        <AppSidebarMenuItem label="ダッシュボード" to="/" />
        <AppSidebarMenuItem label="リード管理" to="/" />
        <AppSidebarMenuItem label="ページ管理" to="/" />
      </div>
    </section>

    <!-- current 状態（アクティブ） -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">current 状態（青背景・アクティブ）</h2>
      <div class="w-fit flex flex-col gap-2 rounded-lg bg-white p-4 shadow-sm">
        <AppSidebarMenuItem label="ダッシュボード" :current="false" to="/" />
        <AppSidebarMenuItem label="リード管理" :current="true" to="/" />
        <AppSidebarMenuItem label="ページ管理" :current="false" to="/" />
      </div>
    </section>

    <!-- 通知バッジ（種別ごと） -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">通知バッジ（種別ごと）</h2>
      <p class="mb-3 text-sm text-gray-500">info / success / warning / danger の4種。DESIGN.md 「ステータス種別色」参照</p>
      <div class="w-fit flex flex-col gap-2 rounded-lg bg-white p-4 shadow-sm">
        <AppSidebarMenuItem label="info" notification="1" notificationType="info" to="/" />
        <AppSidebarMenuItem label="success（デフォルト）" notification="3" notificationType="success" to="/" />
        <AppSidebarMenuItem label="warning" notification="12" notificationType="warning" to="/" />
        <AppSidebarMenuItem label="danger" notification="99" notificationType="danger" to="/" />
        <AppSidebarMenuItem label="current + 通知あり" notification="5" notificationType="danger" :current="true" to="/" />
      </div>
    </section>

    <!-- ドット通知（true を渡すとテキストなし 12×12px 円） -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">ドット通知（notification=true）</h2>
      <p class="mb-3 text-sm text-gray-500">true を渡すと 12×12px の円のみ表示（テキストなし）</p>
      <div class="w-fit flex flex-col gap-2 rounded-lg bg-white p-4 shadow-sm">
        <AppSidebarMenuItem label="info" :notification="true" notificationType="info" to="/" />
        <AppSidebarMenuItem label="success" :notification="true" notificationType="success" to="/" />
        <AppSidebarMenuItem label="warning" :notification="true" notificationType="warning" to="/" />
        <AppSidebarMenuItem label="danger" :notification="true" notificationType="danger" to="/" />
        <AppSidebarMenuItem label="current + ドット通知" :notification="true" notificationType="danger" :current="true" to="/" />
      </div>
    </section>

    <!-- sub-menu あり（展開/閉じ込み） -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">sub-menu あり（展開/閉じ込みトグル）</h2>
      <p class="mb-3 text-sm text-gray-500">クリックするとサブメニューが開閉します。展開中は左縦線が表示されます</p>
      <div class="w-fit flex flex-col gap-2 rounded-lg bg-white p-4 shadow-sm">
        <AppSidebarMenuItem label="ページ管理">
          <AppSidebarSubMenu>
            <AppSidebarSubMenuItem label="ページ一覧" to="/" />
            <AppSidebarSubMenuItem label="新規作成" to="/" />
            <AppSidebarSubMenuItem label="設定" to="/" />
          </AppSidebarSubMenu>
        </AppSidebarMenuItem>

        <AppSidebarMenuItem label="リード管理" notification="2" notificationType="warning">
          <AppSidebarSubMenu>
            <AppSidebarSubMenuItem label="リード一覧" to="/" />
            <AppSidebarSubMenuItem label="インポート" to="/" />
          </AppSidebarSubMenu>
        </AppSidebarMenuItem>

        <AppSidebarMenuItem label="コンテンツ管理" :current="true">
          <AppSidebarSubMenu>
            <AppSidebarSubMenuItem label="記事一覧" to="/" />
            <AppSidebarSubMenuItem label="カテゴリ" to="/" />
          </AppSidebarSubMenu>
        </AppSidebarMenuItem>
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
            <label class="flex flex-col gap-1">
              <span class="text-xs text-gray-500">icon（FontAwesome 名。例: grip-horizontal / home / star）</span>
              <input
                v-model="demoIcon"
                class="rounded border border-gray-200 px-2 py-1 text-sm"
                type="text"
                placeholder="例: grip-horizontal"
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
                placeholder="例: 3 / NEW"
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
            <label class="flex items-center gap-2 text-sm">
              <input v-model="demoHasSubMenu" type="checkbox" />
              sub-menu あり
            </label>
          </div>
        </div>

        <!-- プレビュー -->
        <div class="flex items-start justify-center rounded-lg bg-white p-4 shadow-sm">
          <AppSidebarMenuItem
            :label="demoLabel"
            :icon="demoIcon || undefined"
            :current="demoCurrent"
            :notification="demoNotificationDot ? true : (demoNotification || undefined)"
            :notification-type="demoNotificationType"
            :to="demoHasSubMenu ? undefined : '/'"
          >
            <template v-if="demoHasSubMenu">
              <AppSidebarSubMenu>
                <AppSidebarSubMenuItem label="サブ項目 1" to="/" />
                <AppSidebarSubMenuItem label="サブ項目 2" to="/" />
              </AppSidebarSubMenu>
            </template>
          </AppSidebarMenuItem>
        </div>
      </div>
    </section>
  </div>
</template>
