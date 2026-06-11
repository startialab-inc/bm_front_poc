import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSwitchLabel from './AppSwitchLabel.vue'

describe('AppSwitchLabel', () => {
  describe('レンダリング', () => {
    it('div 要素として描画される', () => {
      const wrapper = mount(AppSwitchLabel)
      expect(wrapper.find('div').exists()).toBe(true)
    })

    it('AppSwitch（button[role="switch"]）が内包される', () => {
      const wrapper = mount(AppSwitchLabel)
      expect(wrapper.find('button[role="switch"]').exists()).toBe(true)
    })

    it('ラベルなしのとき可視テキストが表示されない', () => {
      const wrapper = mount(AppSwitchLabel)
      // AppSwitch の span は aria-hidden なのでテキストに含まれない
      expect(wrapper.text()).toBe('')
    })
  })

  describe('props/leftLabel', () => {
    it('leftLabel あり: ラベルテキストが表示される', () => {
      const wrapper = mount(AppSwitchLabel, {
        props: { leftLabel: '左ラベル' },
      })
      expect(wrapper.text()).toContain('左ラベル')
    })

    it('leftLabel は button の左側（前）に配置される', () => {
      const wrapper = mount(AppSwitchLabel, {
        props: { leftLabel: '左ラベル' },
      })
      const html = wrapper.html()
      const labelPos = html.indexOf('左ラベル')
      const buttonPos = html.indexOf('<button')
      expect(labelPos).toBeLessThan(buttonPos)
    })

    it('leftLabel なし: leftLabel 用 span が表示されない', () => {
      const wrapper = mount(AppSwitchLabel, {
        props: { rightLabel: '右ラベル' },
      })
      // 右ラベルのみ → 1つの span テキスト = 右ラベルのみ
      expect(wrapper.text()).not.toContain('左ラベル')
    })
  })

  describe('props/rightLabel', () => {
    it('rightLabel あり: ラベルテキストが表示される', () => {
      const wrapper = mount(AppSwitchLabel, {
        props: { rightLabel: '右ラベル' },
      })
      expect(wrapper.text()).toContain('右ラベル')
    })

    it('rightLabel は button の右側（後）に配置される', () => {
      const wrapper = mount(AppSwitchLabel, {
        props: { rightLabel: '右ラベル' },
      })
      const html = wrapper.html()
      const labelPos = html.indexOf('右ラベル')
      const buttonPos = html.indexOf('<button')
      expect(labelPos).toBeGreaterThan(buttonPos)
    })
  })

  describe('props/disabled', () => {
    it('disabled=true のとき cursor-not-allowed クラスが付く', () => {
      const wrapper = mount(AppSwitchLabel, {
        props: { disabled: true },
      })
      expect(wrapper.html()).toContain('cursor-not-allowed')
    })

    it('disabled=true のとき opacity-50 クラスが付く', () => {
      const wrapper = mount(AppSwitchLabel, {
        props: { disabled: true },
      })
      expect(wrapper.html()).toContain('opacity-50')
    })

    it('disabled のデフォルト値は false（cursor-pointer クラスが付く）', () => {
      const wrapper = mount(AppSwitchLabel)
      expect(wrapper.html()).toContain('cursor-pointer')
    })
  })

  describe('v-model', () => {
    it('クリックで update:modelValue ハンドラーが呼ばれる', async () => {
      const handler = vi.fn()
      const wrapper = mount(AppSwitchLabel, {
        props: {
          modelValue: false,
          'onUpdate:modelValue': handler,
        },
      })
      await wrapper.find('div').trigger('click')
      expect(handler).toHaveBeenCalled()
    })

    it('modelValue=false のとき クリックで true を渡して emit する', async () => {
      const handler = vi.fn()
      const wrapper = mount(AppSwitchLabel, {
        props: {
          modelValue: false,
          'onUpdate:modelValue': handler,
        },
      })
      await wrapper.find('div').trigger('click')
      expect(handler).toHaveBeenCalledWith(true)
    })

    it('modelValue=true のとき クリックで false を渡して emit する', async () => {
      const handler = vi.fn()
      const wrapper = mount(AppSwitchLabel, {
        props: {
          modelValue: true,
          'onUpdate:modelValue': handler,
        },
      })
      await wrapper.find('div').trigger('click')
      expect(handler).toHaveBeenCalledWith(false)
    })

    it('disabled=true のときクリックしても ハンドラーが呼ばれない', async () => {
      const handler = vi.fn()
      const wrapper = mount(AppSwitchLabel, {
        props: {
          disabled: true,
          modelValue: false,
          'onUpdate:modelValue': handler,
        },
      })
      await wrapper.find('div').trigger('click')
      expect(handler).not.toHaveBeenCalled()
    })
  })
})
