import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppFavoriteBlock from './AppFavoriteBlock.vue'

describe('AppFavoriteBlock', () => {
  describe('レンダリング', () => {
    it('デフォルト状態でレンダリングされること', () => {
      const wrapper = mount(AppFavoriteBlock)
      expect(wrapper.html()).toContain('ブロックタイトル')
    })

    it('編集・削除ボタンが描画されること', () => {
      const wrapper = mount(AppFavoriteBlock)
      const buttons = wrapper.findAll('button')
      expect(buttons).toHaveLength(2)
    })

    it('fa-pen アイコンが描画されること', () => {
      const wrapper = mount(AppFavoriteBlock)
      expect(wrapper.html()).toContain('fa-pen')
    })

    it('fa-trash アイコンが描画されること', () => {
      const wrapper = mount(AppFavoriteBlock)
      expect(wrapper.html()).toContain('fa-trash')
    })

    it('fa-circle-check アイコンが描画されること', () => {
      const wrapper = mount(AppFavoriteBlock)
      expect(wrapper.html()).toContain('fa-circle-check')
    })
  })

  describe('props', () => {
    it('title prop がタイトル要素に反映されること', () => {
      const wrapper = mount(AppFavoriteBlock, {
        props: { title: 'カスタムブロック' },
      })
      expect(wrapper.find('p').text()).toBe('カスタムブロック')
    })

    it('selected=false のとき Default スタイルが適用されること', () => {
      const wrapper = mount(AppFavoriteBlock, {
        props: { selected: false },
      })
      // ブロックエリアの div（2番目の子）を取得
      const blockArea = wrapper.findAll('div').find(d => d.html().includes('fa-circle-check'))
      expect(blockArea?.html()).toContain('bg-[#f8fafc]')
      expect(blockArea?.html()).not.toContain('border-2')
    })

    it('selected=true のとき Selected スタイルが適用されること', () => {
      const wrapper = mount(AppFavoriteBlock, {
        props: { selected: true },
      })
      const blockArea = wrapper.findAll('div').find(d => d.html().includes('fa-circle-check'))
      expect(blockArea?.html()).toContain('bg-[#eff6ff]')
      expect(blockArea?.html()).toContain('border-2')
      expect(blockArea?.html()).toContain('border-[#2862cb]')
    })
  })

  describe('イベント', () => {
    it('ブロックエリアクリックで click emit が発火すること', async () => {
      const wrapper = mount(AppFavoriteBlock)
      // ブロックエリア（fa-circle-check を含む div）をクリック
      const blockArea = wrapper.findAll('div').find(d =>
        d.classes().includes('cursor-pointer')
      )
      await blockArea?.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('編集ボタンクリックで edit emit が発火すること', async () => {
      const wrapper = mount(AppFavoriteBlock)
      const buttons = wrapper.findAll('button')
      await buttons[0].trigger('click')
      expect(wrapper.emitted('edit')).toHaveLength(1)
    })

    it('削除ボタンクリックで delete emit が発火すること', async () => {
      const wrapper = mount(AppFavoriteBlock)
      const buttons = wrapper.findAll('button')
      await buttons[1].trigger('click')
      expect(wrapper.emitted('delete')).toHaveLength(1)
    })
  })
})
