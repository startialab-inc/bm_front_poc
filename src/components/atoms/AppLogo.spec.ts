import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppLogo from './AppLogo.vue'

describe('AppLogo', () => {
  // --- レンダリング ---
  describe('レンダリング', () => {
    it('variant="landscape" でエラーなくマウントできる', () => {
      const wrapper = mount(AppLogo, { props: { variant: 'landscape' } })
      expect(wrapper.exists()).toBe(true)
    })

    it('variant="portrait" でエラーなくマウントできる', () => {
      const wrapper = mount(AppLogo, { props: { variant: 'portrait' } })
      expect(wrapper.exists()).toBe(true)
    })

    it('variant="square" でエラーなくマウントできる', () => {
      const wrapper = mount(AppLogo, { props: { variant: 'square' } })
      expect(wrapper.exists()).toBe(true)
    })

    it('img 要素としてレンダリングされる', () => {
      const wrapper = mount(AppLogo)
      expect(wrapper.element.tagName).toBe('IMG')
    })

    it('デフォルト variant は landscape', () => {
      const wrapper = mount(AppLogo)
      expect(wrapper.html()).toContain('logo-landscape.svg')
    })
  })

  // --- props: variant による src の切り替え ---
  describe('props - variant', () => {
    it('variant="landscape" のとき logo-landscape.svg を src に含む', () => {
      const wrapper = mount(AppLogo, { props: { variant: 'landscape' } })
      expect(wrapper.html()).toContain('logo-landscape.svg')
    })

    it('variant="portrait" のとき logo-portrait.svg を src に含む', () => {
      const wrapper = mount(AppLogo, { props: { variant: 'portrait' } })
      expect(wrapper.html()).toContain('logo-portrait.svg')
    })

    it('variant="square" のとき logo-square.svg を src に含む', () => {
      const wrapper = mount(AppLogo, { props: { variant: 'square' } })
      expect(wrapper.html()).toContain('logo-square.svg')
    })
  })

  // --- 寸法 ---
  describe('寸法', () => {
    it('variant="landscape" のとき width="160" height="48"', () => {
      const wrapper = mount(AppLogo, { props: { variant: 'landscape' } })
      expect(wrapper.attributes('width')).toBe('160')
      expect(wrapper.attributes('height')).toBe('48')
    })

    it('variant="portrait" のとき width="160" height="170"', () => {
      const wrapper = mount(AppLogo, { props: { variant: 'portrait' } })
      expect(wrapper.attributes('width')).toBe('160')
      expect(wrapper.attributes('height')).toBe('170')
    })

    it('variant="square" のとき width="40" height="40"', () => {
      const wrapper = mount(AppLogo, { props: { variant: 'square' } })
      expect(wrapper.attributes('width')).toBe('40')
      expect(wrapper.attributes('height')).toBe('40')
    })
  })

  // --- alt 属性 ---
  describe('alt 属性', () => {
    it('alt 属性が設定されている', () => {
      const wrapper = mount(AppLogo)
      expect(wrapper.attributes('alt')).toBeTruthy()
    })
  })
})
