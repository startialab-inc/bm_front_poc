<script setup lang="ts">
import AppContact from '@/components/atoms/AppContact.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-800">AppContact</h1>
      <p class="mt-1 text-sm text-slate-500">
        Figma node-id: <code class="text-xs bg-slate-200 rounded px-1">520:12941</code>（Contact）
      </p>
      <p class="mt-1 text-sm text-slate-500">単一バリアント・props なし。青い円（64×64px）＋白い吹き出しアイコン。</p>
    </div>

    <!-- デフォルト表示 -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-slate-700 border-b border-slate-300 pb-2">
        デフォルト表示（64×64px）
      </h2>
      <div class="bg-white inline-flex p-6 rounded-lg shadow-sm">
        <AppContact />
      </div>
    </section>

    <!-- 各種背景での確認 -->
    <section class="mb-10">
      <h2 class="mb-4 text-lg font-semibold text-slate-700 border-b border-slate-300 pb-2">
        各種背景での表示確認
      </h2>
      <div class="flex flex-wrap gap-6 items-end">
        <div class="flex flex-col items-center gap-2">
          <span class="text-xs text-slate-500">白背景</span>
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <AppContact />
          </div>
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-xs text-slate-500">グレー背景</span>
          <div class="bg-slate-200 p-6 rounded-lg shadow-sm">
            <AppContact />
          </div>
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-xs text-slate-500">サイドバー背景（#1b4187）</span>
          <div class="bg-[#1b4187] p-6 rounded-lg shadow-sm">
            <AppContact />
          </div>
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-xs text-slate-500">ダーク背景</span>
          <div class="bg-slate-800 p-6 rounded-lg shadow-sm">
            <AppContact />
          </div>
        </div>
      </div>
    </section>

    <!-- 仕様メモ -->
    <section>
      <h2 class="mb-4 text-lg font-semibold text-slate-700 border-b border-slate-300 pb-2">
        仕様メモ
      </h2>
      <div class="bg-white rounded-lg shadow-sm p-6 text-sm text-slate-600 space-y-2">
        <p><strong>サイズ:</strong> 64×64px（Figma の 64.5px はデザインの不備のため 64px 固定）</p>
        <p><strong>形状:</strong> 円形（rounded-full）</p>
        <p><strong>背景色:</strong> #2862cb（brand/blue monkey/500）</p>
        <p><strong>アイコン:</strong> public/assets/images/contact.svg（白い吹き出しマーク）</p>
        <p><strong>アイコンサイズ:</strong> 円に対して 100%（w-full h-full）</p>
        <p><strong>設計意図:</strong> SVG に背景を含めないことで、将来的な背景色変更が容易</p>
      </div>
    </section>
  </div>
</template>
