<script setup lang="ts">
import { RouterLink } from 'vue-router'

// Atoms コンポーネント一覧（Phase D 実装状況）
const atoms = [
  { name: 'AppButton',              node: '520:14190',  to: '/dev/app-button',               done: true  },
  { name: 'AppButtonIcon',          node: '632:8058',   to: '/dev/app-button-icon',           done: true  },
  { name: 'BaseRadioInput',         node: '（新設）',    to: '/dev/base-radio-input',          done: true  },
  { name: 'BaseCheckboxInput',      node: '（新設）',    to: '/dev/base-checkbox-input',       done: true  },
  { name: 'AppTag',                 node: '911:50285',  to: '/dev/app-tag',                   done: true  },
  { name: 'AppSwitch',              node: '849:2931',   to: '/dev/app-switch',                done: true  },
  { name: 'AppTooltip',             node: '619:13590',  to: '/dev/app-tooltip',               done: true  },
  { name: 'AppBadgeStatus',         node: '619:13589 / 864:40386', to: '/dev/app-badge-status', done: true  },
  { name: 'AppBadgeIcon',           node: '538:11930',  to: '/dev/app-badge-icon',            done: true  },
  { name: 'AppCountBadge',          node: '619:13664',  to: '/dev/app-count-badge',           done: true  },
  { name: 'AppTagBadge',            node: '621:17779',  to: '/dev/app-tag-badge',             done: true  },
  { name: 'AppSegmentControlItem',  node: '520:13248',  to: '/dev/app-segment-control-item',  done: true  },
  { name: 'AppTabItem',             node: '849:2330',   to: '/dev/app-tab-item',              done: true  },
  { name: 'AppPagerNumber',         node: '932:25025',  to: '/dev/app-pager-number',          done: true  },
  { name: 'AppProgressBar',         node: '955:48818',  to: '/dev/app-progress-bar',          done: true  },
  { name: 'AppPasswordStrength',    node: '1000:53908', to: '/dev/app-password-strength',     done: true  },
  { name: 'AppMenuIcon',            node: '308:6380',   to: '/dev/app-menu-icon',             done: true  },
  { name: 'AppSnackbar',             node: '2051:66855', to: '/dev/app-snackbar',              done: true  },
  { name: 'AppLogo',                node: '308:6387',   to: '/dev/app-logo',                  done: false },
  { name: 'AppLeftMenuIcon',        node: '411:7357',   to: '/dev/app-left-menu-icon',        done: false },
  { name: 'AppContact',             node: '520:12941',  to: '/dev/app-contact',               done: false },
]

// Molecules コンポーネント一覧
const molecules = [
  { name: 'AppRadioButton',      node: '917:52673',  to: '/dev/app-radio-button',      done: false },
  { name: 'AppCheckbox',         node: '917:53263',  to: '/dev/app-checkbox',          done: false },
  { name: 'AppSwitchLabel',      node: '（新設）',    to: '/dev/app-switch-label',      done: false },
  { name: 'AppSidebarMenuItem',  node: '308:6380',   to: '/dev/app-sidebar-menu-item', done: false },
  { name: 'AppSidebarSubMenu',   node: '308:6469',   to: '/dev/app-sidebar-sub-menu',  done: false },
  { name: 'AppSidebarSubMenuItem', node: '417:8671', to: '/dev/app-sidebar-sub-menu-item', done: false },
]

// Organisms コンポーネント一覧
const organisms = [
  { name: 'AppSidebar', node: '308:6191', to: '/dev/app-sidebar', done: false },
]
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-800">コンポーネント デモ一覧</h1>
      <p class="mt-1 text-sm text-slate-500">Phase D 実装状況（Atoms → Molecules → Organisms の順で実装）</p>
    </div>

    <!-- Atoms セクション -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-slate-700 border-b border-slate-300 pb-2">
        Atoms（{{ atoms.filter(a => a.done).length }} / {{ atoms.length }} 完了）
      </h2>
      <div class="grid grid-cols-3 gap-3">
        <template v-for="item in atoms" :key="item.name">
          <!-- 実装済み：クリック可能 -->
          <RouterLink
            v-if="item.done"
            :to="item.to"
            class="block rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div class="flex items-start justify-between">
              <span class="font-medium text-slate-800 text-sm">{{ item.name }}</span>
              <span class="text-[10px] rounded-full bg-green-100 text-green-700 px-2 py-0.5 font-medium">実装済み</span>
            </div>
            <p class="mt-1 text-[10px] text-slate-400">node: {{ item.node }}</p>
          </RouterLink>

          <!-- 未実装：グレーアウト -->
          <div
            v-else
            class="block rounded-lg bg-white p-4 shadow-sm border border-slate-100 opacity-50 cursor-not-allowed"
          >
            <div class="flex items-start justify-between">
              <span class="font-medium text-slate-500 text-sm">{{ item.name }}</span>
              <span class="text-[10px] rounded-full bg-slate-100 text-slate-400 px-2 py-0.5 font-medium">未実装</span>
            </div>
            <p class="mt-1 text-[10px] text-slate-300">node: {{ item.node }}</p>
          </div>
        </template>
      </div>
    </section>

    <!-- Molecules セクション -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-slate-700 border-b border-slate-300 pb-2">
        Molecules（{{ molecules.filter(m => m.done).length }} / {{ molecules.length }} 完了）
      </h2>
      <div class="grid grid-cols-3 gap-3">
        <template v-for="item in molecules" :key="item.name">
          <RouterLink
            v-if="item.done"
            :to="item.to"
            class="block rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div class="flex items-start justify-between">
              <span class="font-medium text-slate-800 text-sm">{{ item.name }}</span>
              <span class="text-[10px] rounded-full bg-green-100 text-green-700 px-2 py-0.5 font-medium">実装済み</span>
            </div>
            <p class="mt-1 text-[10px] text-slate-400">node: {{ item.node }}</p>
          </RouterLink>
          <div
            v-else
            class="block rounded-lg bg-white p-4 shadow-sm border border-slate-100 opacity-50 cursor-not-allowed"
          >
            <div class="flex items-start justify-between">
              <span class="font-medium text-slate-500 text-sm">{{ item.name }}</span>
              <span class="text-[10px] rounded-full bg-slate-100 text-slate-400 px-2 py-0.5 font-medium">未実装</span>
            </div>
            <p class="mt-1 text-[10px] text-slate-300">node: {{ item.node }}</p>
          </div>
        </template>
      </div>
    </section>

    <!-- Organisms セクション -->
    <section>
      <h2 class="mb-4 text-lg font-semibold text-slate-700 border-b border-slate-300 pb-2">
        Organisms（{{ organisms.filter(o => o.done).length }} / {{ organisms.length }} 完了）
      </h2>
      <div class="grid grid-cols-3 gap-3">
        <template v-for="item in organisms" :key="item.name">
          <RouterLink
            v-if="item.done"
            :to="item.to"
            class="block rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div class="flex items-start justify-between">
              <span class="font-medium text-slate-800 text-sm">{{ item.name }}</span>
              <span class="text-[10px] rounded-full bg-green-100 text-green-700 px-2 py-0.5 font-medium">実装済み</span>
            </div>
            <p class="mt-1 text-[10px] text-slate-400">node: {{ item.node }}</p>
          </RouterLink>
          <div
            v-else
            class="block rounded-lg bg-white p-4 shadow-sm border border-slate-100 opacity-50 cursor-not-allowed"
          >
            <div class="flex items-start justify-between">
              <span class="font-medium text-slate-500 text-sm">{{ item.name }}</span>
              <span class="text-[10px] rounded-full bg-slate-100 text-slate-400 px-2 py-0.5 font-medium">未実装</span>
            </div>
            <p class="mt-1 text-[10px] text-slate-300">node: {{ item.node }}</p>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>
