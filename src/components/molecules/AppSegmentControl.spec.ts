import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSegmentControl from './AppSegmentControl.vue'
import AppSegmentControlItem from '@/components/atoms/AppSegmentControlItem.vue'

const items = [
  { label: 'すべて', count: 8, value: 'all' },
  { label: '公開中', count: 3, value: 'published' },
  { label: '非公開中', count: 0, value: 'unpublished' },
  { label: '編集中', count: 4, value: 'editing' },
]

describe('AppSegmentControl', () => {
  describe('レンダリング', () => {
    it('items の数だけ AppSegmentControlItem が描画される', () => {
      const wrapper = mount(AppSegmentControl, {
        props: { items, modelValue: 'all', 'onUpdate:modelValue': () => {} },
      })
      const segmentItems = wrapper.findAllComponents(AppSegmentControlItem)
      expect(segmentItems.length).toBe(items.length)
    })

    it('各アイテムのラベルが表示される', () => {
      const wrapper = mount(AppSegmentControl, {
        props: { items, modelValue: 'all', 'onUpdate:modelValue': () => {} },
      })
      for (const item of items) {
        expect(wrapper.text()).toContain(item.label)
      }
    })

    it('各アイテムの件数が (N) 形式で表示される', () => {
      const wrapper = mount(AppSegmentControl, {
        props: { items, modelValue: 'all', 'onUpdate:modelValue': () => {} },
      })
      expect(wrapper.text()).toContain('(8)')
      expect(wrapper.text()).toContain('(0)')
      expect(wrapper.text()).toContain('(4)')
    })
  })

  describe('props/初期選択', () => {
    it('modelValue に一致するアイテムが白背景（bg-white）で描画される', () => {
      const wrapper = mount(AppSegmentControl, {
        props: { items, modelValue: 'published', 'onUpdate:modelValue': () => {} },
      })
      // selected=true のアイテムは div 要素・bg-white クラス
      expect(wrapper.html()).toContain('bg-white')
    })

    it('modelValue に一致するアイテムが div 要素（クリック不可）として描画される', () => {
      const wrapper = mount(AppSegmentControl, {
        props: { items, modelValue: 'all', 'onUpdate:modelValue': () => {} },
      })
      // selected=true → div で描画（button 数 = items.length - 1）
      const buttons = wrapper.findAll('button')
      expect(buttons.length).toBe(items.length - 1)
    })

    it('modelValue が undefined のとき全アイテムが button 要素（未選択）として描画される', () => {
      const wrapper = mount(AppSegmentControl, {
        props: { items, modelValue: undefined, 'onUpdate:modelValue': () => {} },
      })
      const buttons = wrapper.findAll('button')
      expect(buttons.length).toBe(items.length)
    })
  })

  describe('v-model', () => {
    it('非選択 button をクリックすると update:modelValue が正しい value で emit される', async () => {
      const wrapper = mount(AppSegmentControl, {
        props: { items, modelValue: 'all', 'onUpdate:modelValue': () => {} },
      })
      // 最初の button は 'all' の次のアイテム（'published'）
      const firstButton = wrapper.find('button')
      await firstButton.trigger('click')
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted![0][0]).toBe('published')
    })

    it('未選択状態（modelValue=undefined）で button をクリックすると update:modelValue が emit される', async () => {
      const wrapper = mount(AppSegmentControl, {
        props: { items, modelValue: undefined, 'onUpdate:modelValue': () => {} },
      })
      const firstButton = wrapper.find('button')
      await firstButton.trigger('click')
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted![0][0]).toBe('all')
    })
  })
})
