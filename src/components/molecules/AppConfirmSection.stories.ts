import type { Meta, StoryObj } from '@storybook/vue3'
import AppConfirmSection from './AppConfirmSection.vue'

const meta: Meta<typeof AppConfirmSection> = {
  title: 'Molecules/AppConfirmSection',
  component: AppConfirmSection,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['information', 'caution'],
    },
    items: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof AppConfirmSection>

// information（デフォルト）
export const Information: Story = {
  name: 'information（デフォルト）',
  args: {
    type: 'information',
    items: [
      'シェアパーツを表示したい箇所に次の書式で記述してください。「 %{入力したタグ名}% 」',
      '内容に記述したテキストやHTMLが再構築時に設定したタグと置き換わります。',
    ],
  },
}

// caution（警告）
export const Caution: Story = {
  name: 'caution（警告）',
  args: {
    type: 'caution',
    items: [
      'URLが正しくありません。',
      'タイトルは必須項目です。',
      '公開日は今日以降の日付を指定してください。',
    ],
  },
}

// 1件のみ（information）
export const SingleItemInformation: Story = {
  name: '1件のみ（information）',
  args: {
    type: 'information',
    items: ['シェアパーツを表示したい箇所に次の書式で記述してください。'],
  },
}

// 1件のみ（caution）
export const SingleItemCaution: Story = {
  name: '1件のみ（caution）',
  args: {
    type: 'caution',
    items: ['URLが正しくありません。'],
  },
}

// インタラクティブ（Controls で props を変更可能）
export const Interactive: Story = {
  name: 'インタラクティブ',
  args: {
    type: 'information',
    items: ['注意事項1', '注意事項2'],
  },
}
