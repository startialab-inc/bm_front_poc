import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppBadgeStatus from './AppBadgeStatus.vue'

describe('AppBadgeStatus', () => {
  // --- レンダリング ---
  describe('レンダリング', () => {
    it('variant="open" でエラーなくマウントできる', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'open' } })
      expect(wrapper.exists()).toBe(true)
    })

    it('variant="close" でエラーなくマウントできる', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'close' } })
      expect(wrapper.exists()).toBe(true)
    })

    it('variant="rebuilding" でエラーなくマウントできる', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'rebuilding' } })
      expect(wrapper.exists()).toBe(true)
    })

    it('variant="editing" でエラーなくマウントできる', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'editing' } })
      expect(wrapper.exists()).toBe(true)
    })

    it('variant="approved" でエラーなくマウントできる', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'approved' } })
      expect(wrapper.exists()).toBe(true)
    })
  })

  // --- props: variant（背景色クラス） ---
  describe('props - 背景色クラス', () => {
    it('open: bg-[#10b981] クラスが付与される', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'open' } })
      expect(wrapper.classes()).toContain('bg-[#10b981]')
    })

    it('close: bg-[#e2e8f0] クラスが付与される', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'close' } })
      expect(wrapper.classes()).toContain('bg-[#e2e8f0]')
    })

    it('rebuilding: bg-[#ea580c] クラスが付与される', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'rebuilding' } })
      expect(wrapper.classes()).toContain('bg-[#ea580c]')
    })

    it('editing: bg-[#e2e8f0] クラスが付与される', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'editing' } })
      expect(wrapper.classes()).toContain('bg-[#e2e8f0]')
    })

    it('approved: bg-[#fff7ed] クラスが付与される', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'approved' } })
      expect(wrapper.classes()).toContain('bg-[#fff7ed]')
    })
  })

  // --- props: variant（テキスト色クラス） ---
  describe('props - テキスト色クラス', () => {
    it('open: text-[#fafafa] クラスが付与される', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'open' } })
      expect(wrapper.classes()).toContain('text-[#fafafa]')
    })

    it('close: text-[#0d2144] クラスが付与される', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'close' } })
      expect(wrapper.classes()).toContain('text-[#0d2144]')
    })

    it('approved: text-[#ea580c] クラスが付与される', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'approved' } })
      expect(wrapper.classes()).toContain('text-[#ea580c]')
    })
  })

  // --- props: variant（ボーダークラス） ---
  describe('props - ボーダークラス', () => {
    it('open: border クラスが付与される', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'open' } })
      expect(wrapper.classes()).toContain('border')
    })

    it('close: border クラスが付与される', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'close' } })
      expect(wrapper.classes()).toContain('border')
    })

    it('approved: border クラスが付与される', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'approved' } })
      expect(wrapper.classes()).toContain('border')
    })

    it('rebuilding: border クラスが付与されない', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'rebuilding' } })
      expect(wrapper.classes()).not.toContain('border')
    })

    it('editing: border クラスが付与されない', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'editing' } })
      expect(wrapper.classes()).not.toContain('border')
    })
  })

  // --- props: variant（ラベルテキスト） ---
  describe('props - ラベルテキスト', () => {
    it('open: 「公開中」が表示される', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'open' } })
      expect(wrapper.text()).toContain('公開中')
    })

    it('close: 「非公開」が表示される', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'close' } })
      expect(wrapper.text()).toContain('非公開')
    })

    it('rebuilding（datetime あり）: 「再構築予約：2026/05/20 10:00」が表示される', () => {
      const wrapper = mount(AppBadgeStatus, {
        props: { variant: 'rebuilding', datetime: '2026/05/20 10:00' },
      })
      expect(wrapper.text()).toContain('再構築予約：2026/05/20 10:00')
    })

    it('rebuilding（datetime なし）: 「再構築予約」のみ表示される', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'rebuilding' } })
      expect(wrapper.text()).toContain('再構築予約')
      expect(wrapper.text()).not.toContain('再構築予約：')
    })

    it('editing: 「編集中」が表示される', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'editing' } })
      expect(wrapper.text()).toContain('編集中')
    })

    it('approved: 「承認済」が表示される', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'approved' } })
      expect(wrapper.text()).toContain('承認済')
    })

    it('datetime を rebuilding 以外に渡してもラベルに影響しない', () => {
      const wrapper = mount(AppBadgeStatus, {
        props: { variant: 'open', datetime: '2026/05/20 10:00' },
      })
      expect(wrapper.text()).toBe('公開中')
    })
  })

  // --- props: アイコン ---
  describe('props - アイコン', () => {
    it('rebuilding: fa-clock アイコン（<i>要素）が存在する', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'rebuilding' } })
      const icon = wrapper.find('i')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('fa-clock')
    })

    it('open: アイコンが存在しない', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'open' } })
      expect(wrapper.find('i').exists()).toBe(false)
    })

    it('close: アイコンが存在しない', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'close' } })
      expect(wrapper.find('i').exists()).toBe(false)
    })

    it('editing: アイコンが存在しない', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'editing' } })
      expect(wrapper.find('i').exists()).toBe(false)
    })

    it('approved: アイコンが存在しない', () => {
      const wrapper = mount(AppBadgeStatus, { props: { variant: 'approved' } })
      expect(wrapper.find('i').exists()).toBe(false)
    })
  })
})
