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
  { name: 'AppLogo',                node: '308:6387',   to: '/dev/app-logo',                  done: true  },
  { name: 'AppLeftMenuIcon',        node: '411:7357',   to: '/dev/app-left-menu-icon',        done: true  },
  { name: 'AppContact',             node: '520:12941',  to: '/dev/app-contact',               done: true  },
]

// Molecules コンポーネント一覧
const molecules = [
  // M-1〜M-3: Atoms 格上げ・新設
  { name: 'AppRadioButton',               node: '917:52673',  to: '/dev/app-radio-button',                  done: true  },
  { name: 'AppCheckbox',                  node: '917:53263',  to: '/dev/app-checkbox',                      done: true  },
  { name: 'AppSwitchLabel',               node: '（新設）',    to: '/dev/app-switch-label',                  done: false },
  // #29〜#45: Figma Molecules
  { name: 'AppSegmentControl',            node: '520:13298',  to: '/dev/app-segment-control',               done: true  },
  { name: 'AppTab',                       node: '849:2467',   to: '/dev/app-tab',                           done: true  },
  { name: 'AppPagination',                node: '932:25039',  to: '/dev/app-pagination',                    done: false },
  { name: 'AppFormHeading',               node: '801:16732',  to: '/dev/app-form-heading',                  done: false },
  { name: 'AppFormTitle',                 node: '801:16744',  to: '/dev/app-form-title',                    done: false },
  { name: 'AppConfirmSection',            node: '806:17001',  to: '/dev/app-confirm-section',               done: false },
  { name: 'AppCalendarTime',              node: '849:3283',   to: '/dev/app-calendar-time',                 done: false },
  { name: 'AppPageSettingStatus',         node: '621:12561',  to: '/dev/app-page-setting-status',           done: false },
  { name: 'AppFavoriteBlock',             node: '932:24445',  to: '/dev/app-favorite-block',                done: false },
  { name: 'AppBlockEditMenuCell',         node: '643:13340',  to: '/dev/app-block-edit-menu-cell',          done: false },
  { name: 'AppSidebarMenuItem',           node: '308:6450',   to: '/dev/app-sidebar-menu-item',             done: false },
  { name: 'AppSidebarSubMenu',            node: '308:6469',   to: '/dev/app-sidebar-sub-menu',              done: false },
  { name: 'AppSidebarSubMenuItem',        node: '417:8671',   to: '/dev/app-sidebar-sub-menu-item',         done: false },
  { name: 'AppScrollArea',                node: '950:43861',  to: '/dev/app-scroll-area',                   done: false },
  { name: 'AppBlockEditMenu',             node: '797:9870',   to: '/dev/app-block-edit-menu',               done: false },
  { name: 'AppModalFooter',               node: '871:50191',  to: '/dev/app-modal-footer',                  done: false },
  // M-7〜M-9: 追加 Molecules
  { name: 'AppImageSelector',             node: '2051:66897', to: '/dev/app-image-selector',                done: false },
  { name: 'AppContactItemType',           node: '1793:71658', to: '/dev/app-contact-item-type',             done: false },
  { name: 'AppContactItemTypeSelectMenu', node: '2051:67078', to: '/dev/app-contact-item-type-select-menu', done: false },
]

// Organisms コンポーネント一覧
const organisms = [
  // #46: Sidebar
  { name: 'AppSidebar',                       node: '308:6191',  to: '/dev/app-sidebar',                         done: false },
  // #47〜54: Header・Title 系
  { name: 'AppHeader',                         node: '520:6480',  to: '/dev/app-header',                          done: false },
  { name: 'AppTitle',                          node: '643:13397', to: '/dev/app-title',                           done: false },
  { name: 'AppTitlePages',                     node: '520:11934', to: '/dev/app-title-pages',                     done: false },
  { name: 'AppTitlePageDetail',                node: '632:7983',  to: '/dev/app-title-page-detail',               done: false },
  { name: 'AppTitleNewArticle',                node: '938:50708', to: '/dev/app-title-new-article',               done: false },
  { name: 'AppTitlePageSetting',               node: '799:16654', to: '/dev/app-title-page-setting',              done: false },
  { name: 'AppTitleUserDirectorySetting',      node: '849:6145',  to: '/dev/app-title-user-directory-setting',    done: false },
  { name: 'AppTitleModalBasic',                node: '849:3837',  to: '/dev/app-title-modal-basic',               done: false },
  // #55〜81: Table 系
  { name: 'AppTableHeaderLeftPages',           node: '621:13684', to: '/dev/app-table-header-left-pages',         done: false },
  { name: 'AppTableHeaderRight（9種）',         node: '—',         to: '/dev/app-table-header-right',              done: false },
  { name: 'AppTableRowLeftPages',              node: '621:13867', to: '/dev/app-table-row-left-pages',            done: false },
  { name: 'AppTableRowLeft（7種）',             node: '—',         to: '/dev/app-table-row-left',                  done: false },
  { name: 'AppTableRowRightPages',             node: '621:14049', to: '/dev/app-table-row-right-pages',           done: false },
  { name: 'AppTableRowRight（8種）',            node: '—',         to: '/dev/app-table-row-right',                 done: false },
  // #82〜98: InlineMenu・Table・Contact 系
  { name: 'AppInlineMenu（9種）',               node: '—',         to: '/dev/app-inline-menu',                     done: false },
  { name: 'AppTable等（8種）',                  node: '—',         to: '/dev/app-table',                           done: false },
  { name: 'AppContactItemCell',                node: '1793:71220', to: '/dev/app-contact-item-cell',              done: false },
  { name: 'AppContactItemAdd',                 node: '1793:71219', to: '/dev/app-contact-item-add',               done: false },
  { name: 'AppContactItemErrorModal',          node: '1793:74592', to: '/dev/app-contact-item-error-modal',       done: false },
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
