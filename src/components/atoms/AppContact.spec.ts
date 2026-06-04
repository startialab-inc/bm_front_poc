import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppContact from './AppContact.vue'

describe('AppContact', () => {
  // --- レンダリング ---
  describe('レンダリング', () => {
    it('エラーなくマウントできる', () => {
      const wrapper = mount(AppContact)
      expect(wrapper.exists()).toBe(true)
    })

    it('ルート要素が div タグである', () => {
      const wrapper = mount(AppContact)
      expect(wrapper.find('div').exists()).toBe(true)
    })

    it('img 要素が存在する', () => {
      const wrapper = mount(AppContact)
      expect(wrapper.find('img').exists()).toBe(true)
    })
  })

  // --- アセットパス ---
  describe('アセットパス', () => {
    it('img の src に contact.svg が含まれる', () => {
      const wrapper = mount(AppContact)
      expect(wrapper.find('img').attributes('src')).toContain('contact.svg')
    })
  })

  // --- alt 属性 ---
  describe('alt 属性', () => {
    it('img に alt 属性が設定されている', () => {
      const wrapper = mount(AppContact)
      const alt = wrapper.find('img').attributes('alt')
      expect(alt).toBeTruthy()
    })
  })

  // --- クラス・スタイル ---
  describe('クラス', () => {
    it('ルート div が rounded-full クラスを持つ', () => {
      const wrapper = mount(AppContact)
      expect(wrapper.html()).toContain('rounded-full')
    })

    it('ルート div が w-16 クラスを持つ（64px）', () => {
      const wrapper = mount(AppContact)
      expect(wrapper.html()).toContain('w-16')
    })

    it('ルート div が h-16 クラスを持つ（64px）', () => {
      const wrapper = mount(AppContact)
      expect(wrapper.html()).toContain('h-16')
    })

    it('ルート div が背景色クラス（bg-[#2862cb]）を持つ', () => {
      const wrapper = mount(AppContact)
      expect(wrapper.html()).toContain('bg-[#2862cb]')
    })
  })
})
