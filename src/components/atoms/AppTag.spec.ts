import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTag from './AppTag.vue'

describe('AppTag', () => {
  describe('レンダリング', () => {
    it('デフォルト props でレンダリングされる', () => {
      const wrapper = mount(AppTag, {
        props: { label: 'テストタグ' },
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('label prop のテキストが表示される', () => {
      const wrapper = mount(AppTag, {
        props: { label: 'Vue 3' },
      })
      expect(wrapper.text()).toContain('Vue 3')
    })
  })

  describe('props', () => {
    it('deletable=false のとき、削除ボタンが表示されない', () => {
      const wrapper = mount(AppTag, {
        props: { label: 'タグ', deletable: false },
      })
      expect(wrapper.find('button').exists()).toBe(false)
    })

    it('deletable=true のとき、削除ボタンが表示される', () => {
      const wrapper = mount(AppTag, {
        props: { label: 'タグ', deletable: true },
      })
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('deletable=false のとき、border クラスが付与される', () => {
      const wrapper = mount(AppTag, {
        props: { label: 'タグ', deletable: false },
      })
      expect(wrapper.classes()).toContain('border')
      expect(wrapper.classes()).toContain('border-[#e5e5e5]')
    })

    it('deletable=true のとき、border クラスが付与されない', () => {
      const wrapper = mount(AppTag, {
        props: { label: 'タグ', deletable: true },
      })
      expect(wrapper.classes()).not.toContain('border')
    })

    it('deletable=true のとき、削除ボタンに fa-circle-xmark アイコンが表示される', () => {
      const wrapper = mount(AppTag, {
        props: { label: 'タグ', deletable: true },
      })
      const icon = wrapper.find('i')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('fa-circle-xmark')
    })
  })

  describe('emits', () => {
    it('削除ボタンクリックで delete イベントが emit される', async () => {
      const wrapper = mount(AppTag, {
        props: { label: 'タグ', deletable: true },
      })
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('delete')).toBeTruthy()
      expect(wrapper.emitted('delete')).toHaveLength(1)
    })

    it('deletable=false のとき、delete イベントは emit されない', async () => {
      const wrapper = mount(AppTag, {
        props: { label: 'タグ', deletable: false },
      })
      // ボタンが存在しないため emit されない
      expect(wrapper.find('button').exists()).toBe(false)
      expect(wrapper.emitted('delete')).toBeUndefined()
    })
  })
})
