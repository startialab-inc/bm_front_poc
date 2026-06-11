<script setup lang="ts">
// フォーム項目の「入力タイプ」設定 Molecule
// Figma: ContactItemType（1793:71658）
// type に応じてヘッダー行のみ（Default）または追加オプションエリアを表示する

import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

// ラジオグループ名の衝突を防ぐため、インスタンスごとにユニーク ID を生成する
const uid = Math.random().toString(36).slice(2, 9)

import AppRadioButton from '../molecules/AppRadioButton.vue'
import BaseCheckboxInput from '../atoms/BaseCheckboxInput.vue'
import BaseControlLabel from '../atoms/BaseControlLabel.vue'

const { t } = useI18n()

export type ContactItemType =
  | 'default'
  | 'date'
  | 'year'
  | 'textbox'
  | 'textarea'
  | 'checkbox'
  | 'radiobutton'
  | 'selectbox'
  | 'file'

// v-model: 選択中の入力タイプ
const type = defineModel<ContactItemType>({ default: 'default' })

// ---- 各タイプのオプション state ----
// Date: 今日の日付チェック + 初期値テキスト
const dateUseToday = ref<string | undefined>(undefined)
const dateDefaultValue = ref('')

// Year: 有効範囲 from/to + 初期値
const yearFrom = ref('')
const yearTo = ref('')
const yearDefault = ref('')

// Textbox / File: 長さ（短/中/長）
const sizeOption = ref<'short' | 'medium' | 'long'>('short')

// Textarea: 幅 + 高さ（それぞれ 短/中/長）
const widthOption = ref<'short' | 'medium' | 'long'>('short')
const heightOption = ref<'short' | 'medium' | 'long'>('short')

// Checkbox / Radiobutton / Selectbox: 選択肢テキスト
const choices = ref('')

/** type ↔ ドロップダウン表示テキストのマッピング（i18n） */
const typeOptions = computed<{ value: ContactItemType; label: string }[]>(() => [
  { value: 'default',     label: t('components.AppContactItemType.types.default') },
  { value: 'date',        label: t('components.AppContactItemType.types.date') },
  { value: 'year',        label: t('components.AppContactItemType.types.year') },
  { value: 'textbox',     label: t('components.AppContactItemType.types.textbox') },
  { value: 'textarea',    label: t('components.AppContactItemType.types.textarea') },
  { value: 'checkbox',    label: t('components.AppContactItemType.types.checkbox') },
  { value: 'radiobutton', label: t('components.AppContactItemType.types.radiobutton') },
  { value: 'selectbox',   label: t('components.AppContactItemType.types.selectbox') },
  { value: 'file',        label: t('components.AppContactItemType.types.file') },
])
</script>

<template>
  <!-- コンテナ幅 640px（Figma: sizes.width = 640） -->
  <div class="w-[640px]">

    <!-- ヘッダー行: 全 type 共通（高さ 48px） -->
    <div class="flex items-center h-12">
      <!-- ラベル: 左アクセントバー（2×16px）+ テキスト（幅 96px） -->
      <div class="w-24 flex items-center gap-2 shrink-0">
        <span class="w-0.5 h-4 rounded-[2px] bg-text-primary shrink-0" />
        <span class="text-sm font-bold text-text-primary leading-none">{{ t('components.AppContactItemType.labelTitle') }}</span>
      </div>

      <!-- ドロップダウン（幅 368px / 高さ 36px / 角丸 6px） -->
      <!-- gap-4 = 16px でラベルと間隔を空け、offset 合計 96+16=112px -->
      <div class="relative ml-4 w-[368px]">
        <select
          v-model="type"
          class="w-full h-9 rounded-[6px] border border-[#e5e5e5] px-3 pr-8 appearance-none text-sm text-text-primary cursor-pointer bg-white"
        >
          <option
            v-for="opt in typeOptions"
            :key="opt.value"
            :value="opt.value"
          >
            {{ opt.label }}
          </option>
        </select>
        <!-- chevron-down アイコン（16px相当） -->
        <i class="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-text-primary" />
      </div>
    </div>

    <!-- オプションエリア: Default 以外で表示 -->
    <!-- pl=112px（ラベル96+gap16）/ py=4px（py-1） -->
    <div
      v-if="type !== 'default'"
      class="pl-[112px] py-1"
    >
      <!-- オプション内コンテナ: 背景 #f8fafc / 角丸 8px / padding 16px -->
      <div class="bg-[#f8fafc] rounded-[8px] px-4 py-2 flex flex-col gap-0">

        <!-- Date: 横並び（チェックボックス + 初期値入力） -->
        <template v-if="type === 'date'">
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2 cursor-pointer shrink-0">
              <BaseCheckboxInput
                v-model="dateUseToday"
                value="useToday"
                size="sm"
              />
              <BaseControlLabel :label="t('components.AppContactItemType.dateUseToday')" />
            </label>
            <!-- 初期値ラベル + 入力欄：残り幅全体を使う（Figma: flex-[1_0_0]） -->
            <div class="flex flex-1 min-w-0 items-center gap-2">
              <BaseControlLabel :label="t('components.AppContactItemType.defaultValue')" />
              <input
                v-model="dateDefaultValue"
                type="text"
                :placeholder="t('components.AppContactItemType.placeholderDate')"
                :disabled="dateUseToday === 'useToday'"
                class="flex-1 min-w-0 h-9 rounded-[6px] border border-[#e5e5e5] px-3 text-sm text-text-primary bg-white disabled:bg-[#f8fafc] disabled:text-text-disabled disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </template>

        <!-- Year: 横並び（有効範囲 from〜to + 初期値） -->
        <template v-else-if="type === 'year'">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <BaseControlLabel :label="t('components.AppContactItemType.validRange')" />
              <input
                v-model="yearFrom"
                type="number"
                class="h-9 w-20 rounded-[6px] border border-[#e5e5e5] px-3 text-sm text-text-primary bg-white"
              />
              <span class="text-sm text-text-primary">{{ t('components.AppContactItemType.rangeSeparator') }}</span>
              <input
                v-model="yearTo"
                type="number"
                class="h-9 w-20 rounded-[6px] border border-[#e5e5e5] px-3 text-sm text-text-primary bg-white"
              />
            </div>
            <div class="flex items-center gap-2">
              <BaseControlLabel :label="t('components.AppContactItemType.defaultValue')" />
              <input
                v-model="yearDefault"
                type="number"
                class="h-9 w-20 rounded-[6px] border border-[#e5e5e5] px-3 text-sm text-text-primary bg-white"
              />
            </div>
          </div>
        </template>

        <!-- Textbox / File: 長さ 短/中/長 ラジオ -->
        <template v-else-if="type === 'textbox' || type === 'file'">
          <div class="flex items-center gap-2">
            <BaseControlLabel :label="t('components.AppContactItemType.length')" />
            <AppRadioButton v-model="sizeOption" value="short" :name="`contactItemTypeSize-${uid}`" :label="t('components.AppContactItemType.short')" />
            <AppRadioButton v-model="sizeOption" value="medium" :name="`contactItemTypeSize-${uid}`" :label="t('components.AppContactItemType.medium')" />
            <AppRadioButton v-model="sizeOption" value="long" :name="`contactItemTypeSize-${uid}`" :label="t('components.AppContactItemType.long')" />
          </div>
        </template>

        <!-- Textarea: 幅 短/中/長 + 高さ 短/中/長 -->
        <template v-else-if="type === 'textarea'">
          <div class="flex items-center gap-2">
            <BaseControlLabel :label="t('components.AppContactItemType.length')" />
            <AppRadioButton v-model="widthOption" value="short" :name="`contactItemTypeWidth-${uid}`" :label="t('components.AppContactItemType.short')" />
            <AppRadioButton v-model="widthOption" value="medium" :name="`contactItemTypeWidth-${uid}`" :label="t('components.AppContactItemType.medium')" />
            <AppRadioButton v-model="widthOption" value="long" :name="`contactItemTypeWidth-${uid}`" :label="t('components.AppContactItemType.long')" />
          </div>
          <div class="flex items-center gap-2">
            <BaseControlLabel :label="t('components.AppContactItemType.height')" />
            <AppRadioButton v-model="heightOption" value="short" :name="`contactItemTypeHeight-${uid}`" :label="t('components.AppContactItemType.short')" />
            <AppRadioButton v-model="heightOption" value="medium" :name="`contactItemTypeHeight-${uid}`" :label="t('components.AppContactItemType.medium')" />
            <AppRadioButton v-model="heightOption" value="long" :name="`contactItemTypeHeight-${uid}`" :label="t('components.AppContactItemType.long')" />
          </div>
        </template>

        <!-- Checkbox / Radiobutton / Selectbox: 注釈 + 選択肢テキストエリア -->
        <template v-else>
          <p class="text-xs text-text-secondary leading-none">
            {{ t('components.AppContactItemType.choicesNote') }}
          </p>
          <textarea
            v-model="choices"
            :placeholder="t('components.AppContactItemType.choicesPlaceholder')"
            class="h-24 w-full rounded-[6px] border border-[#e5e5e5] px-3 py-2 text-sm text-text-primary bg-white resize-none"
          />
        </template>

      </div>
    </div>
  </div>
</template>
