<script setup lang="ts">
import { ref } from 'vue'
import AppSidebarSubMenu from '@/components/molecules/AppSidebarSubMenu.vue'
import AppSidebarSubMenuItem from '@/components/molecules/AppSidebarSubMenuItem.vue'
import AppSidebarMenuItem from '@/components/molecules/AppSidebarMenuItem.vue'

/** インタラクティブデモ用の props */
const demoType = ref<'inline' | 'popup'>('inline')
const demoStandalone = ref(true)
const clickedItem = ref('')

const handleItemClick = (label: string) => {
  clickedItem.value = label
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="mb-8 text-2xl font-bold text-gray-800">AppSidebarSubMenu デモ</h1>

    <!-- ─────────────────────────────────────────
         セクション 1: AppSidebarMenuItem 内での使用（inline）
    ─────────────────────────────────────────── -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">
        1. inline type（AppSidebarMenuItem スロット内）
      </h2>
      <p class="mb-4 text-sm text-gray-500">
        AppSidebarMenuItem のスロットに AppSidebarSubMenu を挿入する最も一般的な使用パターン。
        左縦ボーダーと左余白は親（AppSidebarMenuItem）が提供するため、AppSidebarSubMenu は gap と py のみ付与する。
      </p>
      <div class="inline-flex w-fit flex-col gap-2 rounded-[8px] bg-gray-50 p-4">
        <!-- 通常展開 -->
        <AppSidebarMenuItem label="ページ管理">
          <AppSidebarSubMenu>
            <AppSidebarSubMenuItem label="ページ一覧" />
            <AppSidebarSubMenuItem label="新規作成" />
            <AppSidebarSubMenuItem label="設定" />
          </AppSidebarSubMenu>
        </AppSidebarMenuItem>

        <!-- current=true で自動展開 + current アイテムを含む -->
        <AppSidebarMenuItem label="コンテンツ管理" :current="true">
          <AppSidebarSubMenu>
            <AppSidebarSubMenuItem label="記事一覧" :current="true" />
            <AppSidebarSubMenuItem label="カテゴリ" />
            <AppSidebarSubMenuItem label="タグ" />
          </AppSidebarSubMenu>
        </AppSidebarMenuItem>

        <!-- サブメニューなし（比較用） -->
        <AppSidebarMenuItem label="ダッシュボード" to="/" />
      </div>
    </section>

    <!-- ─────────────────────────────────────────
         セクション 2: inline type（standalone=true）
    ─────────────────────────────────────────── -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">
        2. inline type（standalone=true）
      </h2>
      <p class="mb-4 text-sm text-gray-500">
        AppSidebarMenuItem の外で単体使用する場合。standalone=true を指定すると
        左縦ボーダー（before:border-l）と左余白（pl-6）を自前で付与する。
        Figma ノード 308:6469 の仕様に対応。
      </p>
      <div class="w-[224px]">
        <AppSidebarSubMenu type="inline" :standalone="true">
          <AppSidebarSubMenuItem label="ページ一覧" :current="true" />
          <AppSidebarSubMenuItem label="新規作成" />
          <AppSidebarSubMenuItem label="設定" />
          <AppSidebarSubMenuItem label="長いテキストのサブメニュー項目はここで省略される長いテキスト" />
        </AppSidebarSubMenu>
      </div>
    </section>

    <!-- ─────────────────────────────────────────
         セクション 3: popup type
    ─────────────────────────────────────────── -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">
        3. popup type
      </h2>
      <p class="mb-4 text-sm text-gray-500">
        白背景 + drop-shadow のポップアップ形式。サイドバーがアイコンモード（折りたたみ）の際に
        メニューアイコンのホバーで表示することを想定。Figma ノード 520:6437 に対応。
      </p>
      <div class="relative inline-block">
        <AppSidebarSubMenu type="popup">
          <AppSidebarSubMenuItem label="ページ一覧" :current="true" />
          <AppSidebarSubMenuItem label="新規作成" />
          <AppSidebarSubMenuItem label="設定" />
        </AppSidebarSubMenu>
      </div>
    </section>

    <!-- ─────────────────────────────────────────
         セクション 4: 全バリアント比較
    ─────────────────────────────────────────── -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">
        4. 全バリアント比較
      </h2>
      <div class="flex flex-wrap gap-8 items-start">
        <!-- inline（AppSidebarMenuItem 内） -->
        <div class="w-fit rounded-[8px] bg-gray-50 p-4">
          <p class="mb-2 text-xs font-semibold text-gray-500">inline（AppSidebarMenuItem 内）</p>
          <AppSidebarMenuItem label="メニュー" :current="true">
            <AppSidebarSubMenu>
              <AppSidebarSubMenuItem label="サブ項目 1" :current="true" />
              <AppSidebarSubMenuItem label="サブ項目 2" />
              <AppSidebarSubMenuItem label="サブ項目 3" />
            </AppSidebarSubMenu>
          </AppSidebarMenuItem>
        </div>

        <!-- inline（standalone） -->
        <div class="w-[224px]">
          <p class="mb-2 text-xs font-semibold text-gray-500">inline（standalone=true）</p>
          <AppSidebarSubMenu type="inline" :standalone="true">
            <AppSidebarSubMenuItem label="サブ項目 1" :current="true" />
            <AppSidebarSubMenuItem label="サブ項目 2" />
            <AppSidebarSubMenuItem label="サブ項目 3" />
          </AppSidebarSubMenu>
        </div>

        <!-- popup -->
        <div class="rounded-[8px] bg-white p-4 shadow-md">
          <p class="mb-2 text-xs font-semibold text-gray-500">popup</p>
          <AppSidebarSubMenu type="popup">
            <AppSidebarSubMenuItem label="サブ項目 1" :current="true" />
            <AppSidebarSubMenuItem label="サブ項目 2" />
            <AppSidebarSubMenuItem label="サブ項目 3" />
          </AppSidebarSubMenu>
        </div>
      </div>
    </section>

    <!-- ─────────────────────────────────────────
         セクション 5: インタラクティブデモ
    ─────────────────────────────────────────── -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">
        5. インタラクティブデモ
      </h2>
      <div class="flex flex-wrap gap-6 items-start">
        <!-- コントロール -->
        <div class="flex flex-col gap-3 rounded-[8px] bg-white p-4 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700">Props 設定</h3>
          <label class="flex items-center gap-2 text-sm text-gray-600">
            <span class="w-20">type:</span>
            <select
              v-model="demoType"
              class="rounded border border-gray-300 px-2 py-1 text-sm"
            >
              <option value="inline">inline</option>
              <option value="popup">popup</option>
            </select>
          </label>
          <label
            v-if="demoType === 'inline'"
            class="flex items-center gap-2 text-sm text-gray-600"
          >
            <span class="w-20">standalone:</span>
            <input v-model="demoStandalone" type="checkbox" class="h-4 w-4" />
          </label>
          <div v-if="clickedItem" class="text-xs text-blue-600">
            クリック: {{ clickedItem }}
          </div>
        </div>

        <!-- プレビュー -->
        <div class="rounded-[8px] bg-gray-100 p-6">
          <AppSidebarSubMenu :type="demoType" :standalone="demoStandalone">
            <AppSidebarSubMenuItem
              label="項目 A"
              :current="true"
              @click="handleItemClick('項目 A')"
            />
            <AppSidebarSubMenuItem
              label="項目 B"
              @click="handleItemClick('項目 B')"
            />
            <AppSidebarSubMenuItem
              label="項目 C"
              @click="handleItemClick('項目 C')"
            />
          </AppSidebarSubMenu>
        </div>
      </div>
    </section>
  </div>
</template>
