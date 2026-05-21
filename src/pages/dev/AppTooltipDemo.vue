<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppTooltip from '@/components/atoms/AppTooltip.vue'

// インタラクティブデモ用
const demoText = ref('ツールチップテキスト')
const demoPlacement = ref<'top' | 'bottom' | 'left' | 'right'>('top')
const demoTrigger = ref<'hover' | 'click' | 'manual'>('hover')
const demoWidth = ref('')
const demoOffset = ref(0)

// manual トリガー用
const manualTooltipRef = ref<InstanceType<typeof AppTooltip> | null>(null)
const demoManualTooltipRef = ref<InstanceType<typeof AppTooltip> | null>(null)
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <!-- ページヘッダー -->
    <div class="mb-8">
      <RouterLink to="/dev" class="text-sm text-brand-500 hover:underline">← デモ一覧</RouterLink>
      <h1 class="mt-2 text-2xl font-bold text-slate-800">AppTooltip</h1>
      <p class="mt-1 text-sm text-slate-500">
        ツールチップコンポーネント（Atom）。スロットにトリガー要素を渡し、hover / click / manual で表示制御できる。
      </p>
      <p class="mt-1 text-xs text-slate-400">Figma node-id: 619:13590</p>
    </div>

    <!-- セクション1: placement 4方向 -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        placement（表示方向）
      </h2>
      <p class="text-xs text-slate-400 mb-6">
        ボタンにホバーするとツールチップが表示される。矢印は placement と逆方向に向く。
      </p>
      <div class="grid grid-cols-2 gap-12 place-items-center py-8">
        <div class="flex flex-col items-center gap-3">
          <AppTooltip text="上に表示（top）" placement="top">
            <button class="px-3 py-1.5 rounded bg-slate-200 text-sm hover:bg-slate-300 transition-colors">top</button>
          </AppTooltip>
          <p class="text-[10px] text-slate-400">placement="top"（デフォルト）</p>
        </div>
        <div class="flex flex-col items-center gap-3">
          <AppTooltip text="下に表示（bottom）" placement="bottom">
            <button class="px-3 py-1.5 rounded bg-slate-200 text-sm hover:bg-slate-300 transition-colors">bottom</button>
          </AppTooltip>
          <p class="text-[10px] text-slate-400">placement="bottom"</p>
        </div>
        <div class="flex flex-col items-center gap-3">
          <AppTooltip text="左に表示（left）" placement="left">
            <button class="px-3 py-1.5 rounded bg-slate-200 text-sm hover:bg-slate-300 transition-colors">left</button>
          </AppTooltip>
          <p class="text-[10px] text-slate-400">placement="left"</p>
        </div>
        <div class="flex flex-col items-center gap-3">
          <AppTooltip text="右に表示（right）" placement="right">
            <button class="px-3 py-1.5 rounded bg-slate-200 text-sm hover:bg-slate-300 transition-colors">right</button>
          </AppTooltip>
          <p class="text-[10px] text-slate-400">placement="right"</p>
        </div>
      </div>
    </section>

    <!-- セクション2: trigger 3種 -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        trigger（表示トリガー）
      </h2>
      <div class="flex flex-wrap gap-12 items-start py-8 justify-around">
        <!-- hover -->
        <div class="flex flex-col items-center gap-3">
          <AppTooltip text="hover で表示" trigger="hover">
            <button class="px-3 py-1.5 rounded bg-slate-200 text-sm hover:bg-slate-300 transition-colors">ホバーしてね</button>
          </AppTooltip>
          <p class="text-[10px] text-slate-400">trigger="hover"（デフォルト）</p>
        </div>

        <!-- click -->
        <div class="flex flex-col items-center gap-3">
          <AppTooltip text="click で表示/非表示" trigger="click">
            <button class="px-3 py-1.5 rounded bg-blue-100 text-blue-700 text-sm hover:bg-blue-200 transition-colors">クリックしてね</button>
          </AppTooltip>
          <p class="text-[10px] text-slate-400">trigger="click"（再クリックで非表示）</p>
        </div>

        <!-- manual -->
        <div class="flex flex-col items-center gap-4">
          <AppTooltip ref="manualTooltipRef" text="手動制御のツールチップ" trigger="manual">
            <span class="px-3 py-1.5 rounded bg-emerald-100 text-emerald-700 text-sm">ターゲット要素</span>
          </AppTooltip>
          <div class="flex gap-2">
            <button
              @click="manualTooltipRef?.show()"
              class="px-2 py-1 rounded bg-blue-500 text-white text-xs hover:bg-blue-600 transition-colors"
            >show()</button>
            <button
              @click="manualTooltipRef?.hide()"
              class="px-2 py-1 rounded bg-slate-500 text-white text-xs hover:bg-slate-600 transition-colors"
            >hide()</button>
            <button
              @click="manualTooltipRef?.toggle()"
              class="px-2 py-1 rounded bg-emerald-500 text-white text-xs hover:bg-emerald-600 transition-colors"
            >toggle()</button>
          </div>
          <p class="text-[10px] text-slate-400">trigger="manual"</p>
        </div>
      </div>
    </section>

    <!-- セクション3: width 指定あり/なし -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        width（幅指定）
      </h2>
      <p class="text-xs text-slate-400 mb-6">
        未指定は auto（テキスト幅）。Figma 準拠は 146px。
      </p>
      <div class="flex gap-16 justify-around items-start py-8">
        <div class="flex flex-col items-center gap-3">
          <AppTooltip text="幅は自動（auto）" placement="top">
            <button class="px-3 py-1.5 rounded bg-slate-200 text-sm hover:bg-slate-300 transition-colors">width 未指定</button>
          </AppTooltip>
          <p class="text-[10px] text-slate-400">デフォルト（auto）</p>
        </div>
        <div class="flex flex-col items-center gap-3">
          <AppTooltip text="Figma 準拠の幅 146px" placement="top" width="146px">
            <button class="px-3 py-1.5 rounded bg-slate-200 text-sm hover:bg-slate-300 transition-colors">width="146px"</button>
          </AppTooltip>
          <p class="text-[10px] text-slate-400">width="146px"（Figma 準拠）</p>
        </div>
      </div>
    </section>

    <!-- セクション4: インタラクティブデモ -->
    <section class="mb-6 bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
        インタラクティブデモ
      </h2>
      <p class="text-xs text-slate-400 mb-6">
        各 props を動的に切り替えてプレビューできる。
      </p>

      <!-- コントロールパネル -->
      <div class="grid grid-cols-2 gap-4 mb-8 max-w-lg">
        <div>
          <label class="block text-xs text-slate-500 mb-1">text</label>
          <input
            v-model="demoText"
            type="text"
            class="w-full border border-slate-300 rounded px-2 py-1 text-sm"
          />
        </div>
        <div>
          <label class="block text-xs text-slate-500 mb-1">width（例: 146px）</label>
          <input
            v-model="demoWidth"
            type="text"
            placeholder="未入力で auto"
            class="w-full border border-slate-300 rounded px-2 py-1 text-sm"
          />
        </div>
        <div>
          <label class="block text-xs text-slate-500 mb-1">placement</label>
          <select v-model="demoPlacement" class="w-full border border-slate-300 rounded px-2 py-1 text-sm">
            <option value="top">top</option>
            <option value="bottom">bottom</option>
            <option value="left">left</option>
            <option value="right">right</option>
          </select>
        </div>
        <div>
          <label class="block text-xs text-slate-500 mb-1">trigger</label>
          <select v-model="demoTrigger" class="w-full border border-slate-300 rounded px-2 py-1 text-sm">
            <option value="hover">hover</option>
            <option value="click">click</option>
            <option value="manual">manual</option>
          </select>
        </div>
        <div>
          <label class="block text-xs text-slate-500 mb-1">offset（px）</label>
          <input
            v-model.number="demoOffset"
            type="number"
            min="0"
            class="w-full border border-slate-300 rounded px-2 py-1 text-sm"
          />
        </div>
      </div>

      <!-- プレビュー -->
      <div class="flex flex-col items-center gap-4 py-12 border border-dashed border-slate-200 rounded-lg">
        <AppTooltip
          ref="demoManualTooltipRef"
          :text="demoText"
          :placement="demoPlacement"
          :trigger="demoTrigger"
          :width="demoWidth || undefined"
          :offset="demoOffset"
        >
          <button class="px-4 py-2 rounded bg-slate-800 text-white text-sm hover:bg-slate-700 transition-colors">
            {{ demoTrigger === 'hover' ? 'ホバーしてね' : demoTrigger === 'click' ? 'クリックしてね' : 'ターゲット要素' }}
          </button>
        </AppTooltip>

        <!-- manual トリガー時の操作ボタン -->
        <div v-if="demoTrigger === 'manual'" class="flex gap-2 mt-2">
          <button
            @click="demoManualTooltipRef?.show()"
            class="px-2 py-1 rounded bg-blue-500 text-white text-xs hover:bg-blue-600 transition-colors"
          >show()</button>
          <button
            @click="demoManualTooltipRef?.hide()"
            class="px-2 py-1 rounded bg-slate-500 text-white text-xs hover:bg-slate-600 transition-colors"
          >hide()</button>
          <button
            @click="demoManualTooltipRef?.toggle()"
            class="px-2 py-1 rounded bg-emerald-500 text-white text-xs hover:bg-emerald-600 transition-colors"
          >toggle()</button>
        </div>
      </div>

      <!-- 現在の props 表示 -->
      <div class="mt-4 text-xs text-slate-400 font-mono">
        &lt;AppTooltip
        text="{{ demoText }}"
        placement="{{ demoPlacement }}"
        trigger="{{ demoTrigger }}"
        <template v-if="demoWidth">width="{{ demoWidth }}"</template>
        offset="{{ demoOffset }}"
        &gt;
      </div>
    </section>
  </div>
</template>
