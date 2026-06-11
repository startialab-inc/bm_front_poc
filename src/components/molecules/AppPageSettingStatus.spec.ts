import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import ja from '@/locales/ja'
import AppPageSettingStatus from './AppPageSettingStatus.vue'

const i18n = createI18n({ legacy: false, locale: 'ja', messages: { ja } })

describe('AppPageSettingStatus', () => {
  describe('レンダリング', () => {
    it('ON 状態で正しく描画される', () => {
      const wrapper = mount(AppPageSettingStatus, {
        props: { status: 'on' },
        global: { plugins: [i18n] },
      })
      expect(wrapper.html()).toContain('ON')
    })

    it('OFF 状態で正しく描画される', () => {
      const wrapper = mount(AppPageSettingStatus, {
        props: { status: 'off' },
        global: { plugins: [i18n] },
      })
      expect(wrapper.html()).toContain('OFF')
    })

    it('デフォルト（status 未指定）は OFF を表示する', () => {
      const wrapper = mount(AppPageSettingStatus, {
        global: { plugins: [i18n] },
      })
      expect(wrapper.html()).toContain('OFF')
    })
  })

  describe('props', () => {
    it('status="on" のとき緑のドットが表示される', () => {
      const wrapper = mount(AppPageSettingStatus, {
        props: { status: 'on' },
        global: { plugins: [i18n] },
      })
      const dot = wrapper.find('div > div')
      expect(dot.html()).toContain('bg-[#22c55e]')
    })

    it('status="off" のときグレーのドットが表示される', () => {
      const wrapper = mount(AppPageSettingStatus, {
        props: { status: 'off' },
        global: { plugins: [i18n] },
      })
      const dot = wrapper.find('div > div')
      expect(dot.html()).toContain('bg-[#cbd5e1]')
    })

    it('status="on" のときテキストに ON 色クラスが付く', () => {
      const wrapper = mount(AppPageSettingStatus, {
        props: { status: 'on' },
        global: { plugins: [i18n] },
      })
      const span = wrapper.find('span')
      expect(span.html()).toContain('text-[#0d2144]')
    })

    it('status="off" のときテキストに OFF 色クラスが付く', () => {
      const wrapper = mount(AppPageSettingStatus, {
        props: { status: 'off' },
        global: { plugins: [i18n] },
      })
      const span = wrapper.find('span')
      expect(span.html()).toContain('text-[#64748b]')
    })
  })
})
