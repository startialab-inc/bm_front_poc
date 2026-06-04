import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTab from './AppTab.vue'
import AppTabItem from '@/components/atoms/AppTabItem.vue'

const items = [
  { label: '基本情報', value: 'basic' },
  { label: '詳細設定', value: 'detail' },
  { label: '変更履歴', value: 'history' },
]

describe('AppTab', () => {
  describe('レンダリング', () => {
    it('items の数だけ AppTabItem が描画される', () => {
      const wrapper = mount(AppTab, {
        props: { items, modelValue: 'basic', 'onUpdate:modelValue': () => {} },
      })
      const tabItems = wrapper.findAllComponents(AppTabItem)
      expect(tabItems.length).toBe(items.length)
    })

    it('各タブのラベルが表示される', () => {
      const wrapper = mount(AppTab, {
        props: { items, modelValue: 'basic', 'onUpdate:modelValue': () => {} },
      })
      for (const item of items) {
        expect(wrapper.text()).toContain(item.label)
      }
    })
  })

  describe('props / 初期選択', () => {
    it('modelValue に一致するタブが div 要素（クリック不可）として描画される', () => {
      const wrapper = mount(AppTab, {
        props: { items, modelValue: 'basic', 'onUpdate:modelValue': () => {} },
      })
      // 選択中は div、非選択は button → button は items.length - 1 個
      const buttons = wrapper.findAll('button')
      expect(buttons.length).toBe(items.length - 1)
    })

    it('modelValue が 2番目の value のとき、2番目が選択状態になる', () => {
      const wrapper = mount(AppTab, {
        props: { items, modelValue: 'detail', 'onUpdate:modelValue': () => {} },
      })
      const buttons = wrapper.findAll('button')
      expect(buttons.length).toBe(items.length - 1)
    })

    it('modelValue が空文字のとき全タブが button 要素（未選択）として描画される', () => {
      const wrapper = mount(AppTab, {
        props: { items, modelValue: '', 'onUpdate:modelValue': () => {} },
      })
      const buttons = wrapper.findAll('button')
      expect(buttons.length).toBe(items.length)
    })

    it('選択中タブに border-b-2 クラスが付与される', () => {
      const wrapper = mount(AppTab, {
        props: { items, modelValue: 'basic', 'onUpdate:modelValue': () => {} },
      })
      expect(wrapper.html()).toContain('border-b-2')
    })
  })

  describe('v-model', () => {
    it('非選択タブのクリックで update:modelValue が emit される', async () => {
      const wrapper = mount(AppTab, {
        props: { items, modelValue: 'basic', 'onUpdate:modelValue': () => {} },
      })
      // 最初の button（非選択タブ）をクリック
      const firstButton = wrapper.find('button')
      await firstButton.trigger('click')
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
    })

    it('クリックした button に対応する value が emit される', async () => {
      const wrapper = mount(AppTab, {
        props: { items, modelValue: 'basic', 'onUpdate:modelValue': () => {} },
      })
      // items[0] が選択中なので最初の button は items[1]（detail）
      const firstButton = wrapper.find('button')
      await firstButton.trigger('click')
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted![0][0]).toBe('detail')
    })

    it('3番目のタブをクリックすると対応する value が emit される', async () => {
      const wrapper = mount(AppTab, {
        props: { items, modelValue: 'basic', 'onUpdate:modelValue': () => {} },
      })
      const buttons = wrapper.findAll('button')
      await buttons[1].trigger('click')
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted![0][0]).toBe('history')
    })
  })
})
