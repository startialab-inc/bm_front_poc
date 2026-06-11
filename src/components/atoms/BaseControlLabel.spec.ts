import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseControlLabel from './BaseControlLabel.vue'

describe('BaseControlLabel', () => {
  describe('レンダリング', () => {
    it('デフォルト props でレンダリングされる', () => {
      const wrapper = mount(BaseControlLabel, {
        props: { label: 'テストラベル' },
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('label prop のテキストが表示される', () => {
      const wrapper = mount(BaseControlLabel, {
        props: { label: 'ラジオボタンのラベル' },
      })
      expect(wrapper.text()).toBe('ラジオボタンのラベル')
    })

    it('span 要素でレンダリングされる', () => {
      const wrapper = mount(BaseControlLabel, {
        props: { label: 'テスト' },
      })
      expect(wrapper.element.tagName).toBe('SPAN')
    })
  })

  describe('props / weight', () => {
    it('weight 未指定のとき font-normal クラスが付与される', () => {
      const wrapper = mount(BaseControlLabel, {
        props: { label: 'テスト' },
      })
      expect(wrapper.classes()).toContain('font-normal')
      expect(wrapper.classes()).not.toContain('font-medium')
    })

    it('weight="normal" のとき font-normal クラスが付与される', () => {
      const wrapper = mount(BaseControlLabel, {
        props: { label: 'テスト', weight: 'normal' },
      })
      expect(wrapper.classes()).toContain('font-normal')
      expect(wrapper.classes()).not.toContain('font-medium')
    })

    it('weight="medium" のとき font-medium クラスが付与される', () => {
      const wrapper = mount(BaseControlLabel, {
        props: { label: 'テスト', weight: 'medium' },
      })
      expect(wrapper.classes()).toContain('font-medium')
      expect(wrapper.classes()).not.toContain('font-normal')
    })

    it('共通クラス（text-sm / text-text-primary / leading-none）が付与される', () => {
      const wrapper = mount(BaseControlLabel, {
        props: { label: 'テスト' },
      })
      expect(wrapper.classes()).toContain('text-sm')
      expect(wrapper.classes()).toContain('text-text-primary')
      expect(wrapper.classes()).toContain('leading-none')
    })
  })
})
