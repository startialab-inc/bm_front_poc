import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppBlockEditMenuCell from './AppBlockEditMenuCell.vue'

describe('AppBlockEditMenuCell', () => {
  describe('レンダリング', () => {
    it('デフォルト状態でボタン要素がレンダリングされること', () => {
      const wrapper = mount(AppBlockEditMenuCell)
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('icon・label 未指定のとき <i> と <span> が描画されないこと', () => {
      const wrapper = mount(AppBlockEditMenuCell)
      expect(wrapper.find('i').exists()).toBe(false)
      expect(wrapper.find('span').exists()).toBe(false)
    })
  })

  describe('props', () => {
    it('icon prop を渡すとアイコンクラスが付与された <i> が描画されること', () => {
      const wrapper = mount(AppBlockEditMenuCell, {
        props: { icon: 'fa-solid fa-plus' },
      })
      const icon = wrapper.find('i')
      expect(icon.exists()).toBe(true)
      expect(icon.html()).toContain('fa-plus')
    })

    it('icon prop が空のとき <i> が描画されないこと', () => {
      const wrapper = mount(AppBlockEditMenuCell, {
        props: { icon: '' },
      })
      expect(wrapper.find('i').exists()).toBe(false)
    })

    it('label prop を渡すと <span> にテキストが表示されること', () => {
      const wrapper = mount(AppBlockEditMenuCell, {
        props: { label: 'ブロック追加' },
      })
      const span = wrapper.find('span')
      expect(span.exists()).toBe(true)
      expect(span.html()).toContain('ブロック追加')
    })

    it('label prop に <br/> を含む HTML を渡すと改行されること', () => {
      const wrapper = mount(AppBlockEditMenuCell, {
        props: { label: 'ブロック<br/>追加' },
      })
      const span = wrapper.find('span')
      expect(span.exists()).toBe(true)
      expect(span.html()).toContain('<br>')
    })

    it('label prop が空のとき <span> が描画されないこと', () => {
      const wrapper = mount(AppBlockEditMenuCell, {
        props: { label: '' },
      })
      expect(wrapper.find('span').exists()).toBe(false)
    })

    it('デフォルト背景色クラスが付与されること', () => {
      const wrapper = mount(AppBlockEditMenuCell)
      expect(wrapper.find('button').html()).toContain('bg-[#1b4187]')
    })
  })

  describe('イベント', () => {
    it('クリックで click emit が発火すること', async () => {
      const wrapper = mount(AppBlockEditMenuCell)
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })
  })
})
