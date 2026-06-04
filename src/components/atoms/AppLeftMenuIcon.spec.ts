import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppLeftMenuIcon from './AppLeftMenuIcon.vue'

describe('AppLeftMenuIcon', () => {
  // --- レンダリング ---
  describe('レンダリング', () => {
    it('status="close" でエラーなくマウントできる', () => {
      const wrapper = mount(AppLeftMenuIcon, { props: { status: 'close' } })
      expect(wrapper.exists()).toBe(true)
    })

    it('status="open" でエラーなくマウントできる', () => {
      const wrapper = mount(AppLeftMenuIcon, { props: { status: 'open' } })
      expect(wrapper.exists()).toBe(true)
    })

    it('button 要素としてレンダリングされる', () => {
      const wrapper = mount(AppLeftMenuIcon)
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('type="button" 属性が付与されている', () => {
      const wrapper = mount(AppLeftMenuIcon)
      expect(wrapper.find('button').attributes('type')).toBe('button')
    })

    it('アイコン用 span 要素が内包されている', () => {
      const wrapper = mount(AppLeftMenuIcon)
      expect(wrapper.find('span[aria-hidden="true"]').exists()).toBe(true)
    })
  })

  // --- props: status によるアイコン切り替え ---
  // JSDOM では mask-image CSS が style 属性に反映されないため、
  // aria-label の切り替え（src・ariaLabel は同じ status に依存）で状態を間接確認する
  describe('props - status', () => {
    it('デフォルト status は close（aria-label がサイドバーを閉じる）', () => {
      const wrapper = mount(AppLeftMenuIcon)
      expect(wrapper.find('button').attributes('aria-label')).toBe('サイドバーを閉じる')
    })

    it('status="close" のとき aria-label が「サイドバーを閉じる」', () => {
      const wrapper = mount(AppLeftMenuIcon, { props: { status: 'close' } })
      expect(wrapper.find('button').attributes('aria-label')).toBe('サイドバーを閉じる')
    })

    it('status="open" のとき aria-label が「サイドバーを開く」', () => {
      const wrapper = mount(AppLeftMenuIcon, { props: { status: 'open' } })
      expect(wrapper.find('button').attributes('aria-label')).toBe('サイドバーを開く')
    })

    it('status="close" のとき aria-label が「サイドバーを開く」にならない', () => {
      const wrapper = mount(AppLeftMenuIcon, { props: { status: 'close' } })
      expect(wrapper.find('button').attributes('aria-label')).not.toBe('サイドバーを開く')
    })
  })

  // --- aria-label ---
  describe('aria-label', () => {
    it('status="close" のとき aria-label が設定されている', () => {
      const wrapper = mount(AppLeftMenuIcon, { props: { status: 'close' } })
      expect(wrapper.find('button').attributes('aria-label')).toBeTruthy()
    })

    it('status="open" のとき aria-label が設定されている', () => {
      const wrapper = mount(AppLeftMenuIcon, { props: { status: 'open' } })
      expect(wrapper.find('button').attributes('aria-label')).toBeTruthy()
    })
  })

  // --- イベント ---
  describe('イベント', () => {
    it('クリック時に toggle emit が発火する', async () => {
      const wrapper = mount(AppLeftMenuIcon)
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('toggle')).toHaveLength(1)
    })

    it('複数回クリックするとその回数だけ toggle が発火する', async () => {
      const wrapper = mount(AppLeftMenuIcon)
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('toggle')).toHaveLength(2)
    })

    it('クリックしても status prop が変化しない（制御されたコンポーネント）', async () => {
      const wrapper = mount(AppLeftMenuIcon, { props: { status: 'close' } })
      await wrapper.find('button').trigger('click')
      // close のまま aria-label が変化しないことで制御コンポーネントの動作を確認
      expect(wrapper.find('button').attributes('aria-label')).toBe('サイドバーを閉じる')
    })
  })
})
