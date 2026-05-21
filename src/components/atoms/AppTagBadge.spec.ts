import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTagBadge from './AppTagBadge.vue'

describe('AppTagBadge', () => {
  // --- レンダリング ---
  describe('レンダリング', () => {
    it('label="タグ" でエラーなくマウントできる', () => {
      const wrapper = mount(AppTagBadge, { props: { label: 'タグ' } })
      expect(wrapper.exists()).toBe(true)
    })

    it('rounded-[2px] クラスが付与される', () => {
      const wrapper = mount(AppTagBadge, { props: { label: 'タグ' } })
      expect(wrapper.html()).toContain('rounded-[2px]')
    })

    it('border クラスが付与される', () => {
      const wrapper = mount(AppTagBadge, { props: { label: 'タグ' } })
      expect(wrapper.html()).toContain('border')
    })

    it('border-[#e5e5e5] クラスが付与される', () => {
      const wrapper = mount(AppTagBadge, { props: { label: 'タグ' } })
      expect(wrapper.html()).toContain('border-[#e5e5e5]')
    })

    it('bg-white クラスが付与される', () => {
      const wrapper = mount(AppTagBadge, { props: { label: 'タグ' } })
      expect(wrapper.html()).toContain('bg-white')
    })

    it('text-[10px] クラスが付与される', () => {
      const wrapper = mount(AppTagBadge, { props: { label: 'タグ' } })
      expect(wrapper.html()).toContain('text-[10px]')
    })

    it('font-normal クラスが付与される', () => {
      const wrapper = mount(AppTagBadge, { props: { label: 'タグ' } })
      expect(wrapper.html()).toContain('font-normal')
    })

    it('text-[#171717] クラスが付与される', () => {
      const wrapper = mount(AppTagBadge, { props: { label: 'タグ' } })
      expect(wrapper.html()).toContain('text-[#171717]')
    })
  })

  // --- props: label ---
  describe('props - label', () => {
    it('label="タグ" のとき、"タグ" が表示される', () => {
      const wrapper = mount(AppTagBadge, { props: { label: 'タグ' } })
      expect(wrapper.text()).toBe('タグ')
    })

    it('label="テスト" のとき、"テスト" が表示される', () => {
      const wrapper = mount(AppTagBadge, { props: { label: 'テスト' } })
      expect(wrapper.text()).toBe('テスト')
    })

    it('label="カテゴリ" のとき、"カテゴリ" が表示される', () => {
      const wrapper = mount(AppTagBadge, { props: { label: 'カテゴリ' } })
      expect(wrapper.text()).toBe('カテゴリ')
    })

    it('長いラベルテキストが全文表示される', () => {
      const longLabel = 'とても長いタグ名のサンプルテキスト'
      const wrapper = mount(AppTagBadge, { props: { label: longLabel } })
      expect(wrapper.text()).toBe(longLabel)
    })
  })
})
