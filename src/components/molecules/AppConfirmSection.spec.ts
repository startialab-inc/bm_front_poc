import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppConfirmSection from './AppConfirmSection.vue'

describe('AppConfirmSection', () => {
  describe('レンダリング', () => {
    it('items が空配列のとき、アイテム行が存在しない', () => {
      const wrapper = mount(AppConfirmSection, {
        props: { items: [] },
      })
      expect(wrapper.findAll('i')).toHaveLength(0)
    })

    it('items の件数分だけ行が描画される', () => {
      const wrapper = mount(AppConfirmSection, {
        props: { items: ['メッセージ1', 'メッセージ2', 'メッセージ3'] },
      })
      expect(wrapper.findAll('i')).toHaveLength(3)
    })
  })

  describe('props', () => {
    it('各 item テキストが描画される', () => {
      const wrapper = mount(AppConfirmSection, {
        props: {
          items: ['URLが正しくありません。', 'タイトルは必須項目です。'],
        },
      })
      expect(wrapper.text()).toContain('URLが正しくありません。')
      expect(wrapper.text()).toContain('タイトルは必須項目です。')
    })

    it('items の内容が変わると再描画される', async () => {
      const wrapper = mount(AppConfirmSection, {
        props: { items: ['1件目'] },
      })
      expect(wrapper.findAll('i')).toHaveLength(1)

      await wrapper.setProps({ items: ['1件目', '2件目'] })
      expect(wrapper.findAll('i')).toHaveLength(2)
    })
  })

  describe('type prop', () => {
    it('type を省略すると information がデフォルトになる', () => {
      const wrapper = mount(AppConfirmSection, {
        props: { items: ['テスト'] },
      })
      const html = wrapper.html()
      expect(html).toContain('fa-circle-info')
      expect(html).toContain('#eff6ff')
    })

    it('type="information" のとき fa-circle-info アイコンが使われる', () => {
      const wrapper = mount(AppConfirmSection, {
        props: { type: 'information', items: ['テスト'] },
      })
      const icon = wrapper.find('i')
      expect(icon.classes()).toContain('fa-circle-info')
    })

    it('type="caution" のとき fa-circle-exclamation アイコンが使われる', () => {
      const wrapper = mount(AppConfirmSection, {
        props: { type: 'caution', items: ['テスト'] },
      })
      const icon = wrapper.find('i')
      expect(icon.classes()).toContain('fa-circle-exclamation')
    })

    it('type="information" のとき背景色が #eff6ff になる', () => {
      const wrapper = mount(AppConfirmSection, {
        props: { type: 'information', items: ['テスト'] },
      })
      expect(wrapper.html()).toContain('#eff6ff')
    })

    it('type="caution" のとき背景色が #fef2f2 になる', () => {
      const wrapper = mount(AppConfirmSection, {
        props: { type: 'caution', items: ['テスト'] },
      })
      expect(wrapper.html()).toContain('#fef2f2')
    })

    it('type を caution → information に変更するとアイコンが切り替わる', async () => {
      const wrapper = mount(AppConfirmSection, {
        props: { type: 'caution', items: ['テスト'] },
      })
      expect(wrapper.find('i').classes()).toContain('fa-circle-exclamation')

      await wrapper.setProps({ type: 'information' })
      expect(wrapper.find('i').classes()).toContain('fa-circle-info')
    })
  })
})
