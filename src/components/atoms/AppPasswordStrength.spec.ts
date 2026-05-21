import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import ja from '@/locales/ja'
import AppPasswordStrength from './AppPasswordStrength.vue'

// テスト用 i18n プラグイン
const i18n = createI18n({ locale: 'ja', legacy: false, messages: { ja } })

/** テスト用マウントヘルパー */
const mountComponent = (type: 'short' | 'weak' | 'normal' | 'strong') =>
  mount(AppPasswordStrength, {
    props: { type },
    global: { plugins: [i18n] },
  })

describe('AppPasswordStrength', () => {
  // --- レンダリング ---
  describe('レンダリング', () => {
    it('エラーなくマウントできる', () => {
      const wrapper = mountComponent('weak')
      expect(wrapper.exists()).toBe(true)
    })

    it('p 要素が存在する', () => {
      const wrapper = mountComponent('weak')
      expect(wrapper.find('p').exists()).toBe(true)
    })
  })

  // --- props: type / ラベルテキスト ---
  describe('props - type / ラベルテキスト', () => {
    it('type="short" のとき "パスワードが短すぎます" が表示される', () => {
      const wrapper = mountComponent('short')
      expect(wrapper.text()).toContain('パスワードが短すぎます')
    })

    it('type="weak" のとき "弱い" が表示される', () => {
      const wrapper = mountComponent('weak')
      expect(wrapper.text()).toContain('弱い')
    })

    it('type="normal" のとき "普通" が表示される', () => {
      const wrapper = mountComponent('normal')
      expect(wrapper.text()).toContain('普通')
    })

    it('type="strong" のとき "強い" が表示される', () => {
      const wrapper = mountComponent('strong')
      expect(wrapper.text()).toContain('強い')
    })
  })

  // --- props: type / 背景色クラス ---
  describe('props - type / 背景色クラス', () => {
    it('type="short" のとき bg-red-500 クラスが付与される', () => {
      const wrapper = mountComponent('short')
      expect(wrapper.html()).toContain('bg-red-500')
    })

    it('type="weak" のとき bg-orange-500 クラスが付与される', () => {
      const wrapper = mountComponent('weak')
      expect(wrapper.html()).toContain('bg-orange-500')
    })

    it('type="normal" のとき bg-[#713f12] クラスが付与される', () => {
      const wrapper = mountComponent('normal')
      expect(wrapper.html()).toContain('bg-[#713f12]')
    })

    it('type="strong" のとき bg-green-500 クラスが付与される', () => {
      const wrapper = mountComponent('strong')
      expect(wrapper.html()).toContain('bg-green-500')
    })

    it('type="weak" のとき bg-red-500 クラスが付与されない', () => {
      const wrapper = mountComponent('weak')
      expect(wrapper.html()).not.toContain('bg-red-500')
    })
  })

  // --- props: type / 幅クラス ---
  describe('props - type / 幅クラス', () => {
    it('type="short" のとき w-[180px] クラスが付与されない（幅 auto）', () => {
      const wrapper = mountComponent('short')
      expect(wrapper.html()).not.toContain('w-[180px]')
    })

    it('type="weak" のとき w-[180px] クラスが付与される', () => {
      const wrapper = mountComponent('weak')
      expect(wrapper.html()).toContain('w-[180px]')
    })

    it('type="normal" のとき w-[180px] クラスが付与される', () => {
      const wrapper = mountComponent('normal')
      expect(wrapper.html()).toContain('w-[180px]')
    })

    it('type="strong" のとき w-[180px] クラスが付与される', () => {
      const wrapper = mountComponent('strong')
      expect(wrapper.html()).toContain('w-[180px]')
    })
  })
})
