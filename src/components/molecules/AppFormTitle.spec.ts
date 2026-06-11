import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppFormTitle from './AppFormTitle.vue'

describe('AppFormTitle', () => {
  describe('レンダリング', () => {
    it('タイトルが表示される', () => {
      const wrapper = mount(AppFormTitle, {
        props: { title: 'ページ名' },
      })
      expect(wrapper.text()).toContain('ページ名')
    })

    it('variant="default" のとき縦線 div が存在する', () => {
      const wrapper = mount(AppFormTitle, {
        props: { title: 'ページ名', variant: 'default' },
      })
      // div が 2 つ（コンテナ + 縦線）存在することを確認
      const divs = wrapper.findAll('div')
      expect(divs.length).toBeGreaterThanOrEqual(2)
    })

    it('variant="login" のとき縦線 div が存在しない', () => {
      const wrapper = mount(AppFormTitle, {
        props: { title: 'ログインID', variant: 'login' },
      })
      // div はコンテナ 1 つのみ
      const divs = wrapper.findAll('div')
      expect(divs).toHaveLength(1)
    })
  })

  describe('props', () => {
    it('title の内容が p 要素に反映される', () => {
      const wrapper = mount(AppFormTitle, {
        props: { title: 'フォーム項目名' },
      })
      expect(wrapper.find('p').text()).toBe('フォーム項目名')
    })

    it('variant を省略すると縦線が表示される（デフォルトは default）', () => {
      const wrapper = mount(AppFormTitle, {
        props: { title: 'ページ名' },
      })
      const divs = wrapper.findAll('div')
      expect(divs.length).toBeGreaterThanOrEqual(2)
    })

    it('variant="login" に変更すると縦線が消える', async () => {
      const wrapper = mount(AppFormTitle, {
        props: { title: 'ログインID', variant: 'default' },
      })
      expect(wrapper.findAll('div').length).toBeGreaterThanOrEqual(2)

      await wrapper.setProps({ variant: 'login' })
      expect(wrapper.findAll('div')).toHaveLength(1)
    })
  })
})
