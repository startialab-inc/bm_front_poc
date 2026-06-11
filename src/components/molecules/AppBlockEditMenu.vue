<script setup lang="ts">
// ブロック編集メニューコンポーネント
// Unselect（未選択時: 4項目 + フッターヘルプ）と Select（選択時: 9項目）の2バリアント
import { useI18n } from 'vue-i18n'
import AppBlockEditMenuCell from './AppBlockEditMenuCell.vue'

type Variant = 'unselect' | 'select'

interface Props {
  /** メニューのバリアント。'unselect': 未選択時、'select': ブロック選択時 */
  variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'unselect',
})

const emit = defineEmits<{
  /** セル クリック時。クリックされたセルのアイコンクラスとラベルを渡す */
  clickItem: [icon: string, label: string]
}>()

const { t } = useI18n()
</script>

<template>
  <div
    v-if="props.variant === 'unselect'"
    class="relative w-[112px] h-[736px] bg-[#1b4187] flex flex-col"
  >
    <AppBlockEditMenuCell
      icon="fa-solid fa-plus"
      :label="t('components.AppBlockEditMenu.addBlock')"
      @click="emit('clickItem', 'fa-solid fa-plus', t('components.AppBlockEditMenu.addBlock'))"
    />
    <AppBlockEditMenuCell
      icon="fa-solid fa-image"
      :label="t('components.AppBlockEditMenu.fileUpload')"
      @click="emit('clickItem', 'fa-solid fa-image', t('components.AppBlockEditMenu.fileUpload'))"
    />
    <AppBlockEditMenuCell
      icon="fa-solid fa-shapes"
      :label="t('components.AppBlockEditMenu.downloadBlock')"
      @click="emit('clickItem', 'fa-solid fa-shapes', t('components.AppBlockEditMenu.downloadBlock'))"
    />
    <AppBlockEditMenuCell
      icon="fa-solid fa-file"
      :label="t('components.AppBlockEditMenu.pageTemplate')"
      @click="emit('clickItem', 'fa-solid fa-file', t('components.AppBlockEditMenu.pageTemplate'))"
    />
    <AppBlockEditMenuCell
      class="absolute bottom-[47px]"
      icon="fa-solid fa-circle-question"
      :label="t('components.AppBlockEditMenu.helpTool')"
      @click="emit('clickItem', 'fa-solid fa-circle-question', t('components.AppBlockEditMenu.helpTool'))"
    />
  </div>
  <div
    v-else
    class="relative w-[112px] h-[720px] bg-[#1b4187] flex flex-col"
  >
    <AppBlockEditMenuCell
      icon="fa-solid fa-clone"
      :label="t('components.AppBlockEditMenu.copyBlock')"
      @click="emit('clickItem', 'fa-solid fa-clone', t('components.AppBlockEditMenu.copyBlock'))"
    />
    <AppBlockEditMenuCell
      icon="fa-solid fa-image"
      :label="t('components.AppBlockEditMenu.fileUpload')"
      @click="emit('clickItem', 'fa-solid fa-image', t('components.AppBlockEditMenu.fileUpload'))"
    />
    <AppBlockEditMenuCell
      icon="fa-solid fa-eye-slash"
      :label="t('components.AppBlockEditMenu.hideBlock')"
      @click="emit('clickItem', 'fa-solid fa-eye-slash', t('components.AppBlockEditMenu.hideBlock'))"
    />
    <AppBlockEditMenuCell
      icon="fa-solid fa-pencil"
      :label="t('components.AppBlockEditMenu.editBlock')"
      @click="emit('clickItem', 'fa-solid fa-pencil', t('components.AppBlockEditMenu.editBlock'))"
    />
    <AppBlockEditMenuCell
      icon="fa-solid fa-plus"
      :label="t('components.AppBlockEditMenu.addBlock')"
      @click="emit('clickItem', 'fa-solid fa-plus', t('components.AppBlockEditMenu.addBlock'))"
    />
    <AppBlockEditMenuCell
      icon="fa-solid fa-star"
      :label="t('components.AppBlockEditMenu.addFavorite')"
      @click="emit('clickItem', 'fa-solid fa-star', t('components.AppBlockEditMenu.addFavorite'))"
    />
    <AppBlockEditMenuCell
      icon="fa-solid fa-circle-arrow-down"
      :label="t('components.AppBlockEditMenu.downloadBlock')"
      @click="emit('clickItem', 'fa-solid fa-circle-arrow-down', t('components.AppBlockEditMenu.downloadBlock'))"
    />
    <AppBlockEditMenuCell
      icon="fa-solid fa-trash"
      :label="t('components.AppBlockEditMenu.deleteBlock')"
      @click="emit('clickItem', 'fa-solid fa-trash', t('components.AppBlockEditMenu.deleteBlock'))"
    />
    <AppBlockEditMenuCell
      icon="fa-solid fa-lock"
      :label="t('components.AppBlockEditMenu.lockBlock')"
      @click="emit('clickItem', 'fa-solid fa-lock', t('components.AppBlockEditMenu.lockBlock'))"
    />
  </div>
</template>
