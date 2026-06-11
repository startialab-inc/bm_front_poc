import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppFormHeading from './AppFormHeading.vue'

describe('AppFormHeading', () => {
  describe('レンダリング', () => {
    it('タイトルが表示される', () => {
      const wrapper = mount(AppFormHeading, {
        props: { title: '基本設定' },
      })
      expect(wrapper.text()).toContain('基本設定')
    })

    it('description を渡さない場合、説明文の p 要素が存在しない', () => {
      const wrapper = mount(AppFormHeading, {
        props: { title: '基本設定' },
      })
      const paragraphs = wrapper.findAll('p')
      expect(paragraphs).toHaveLength(1)
    })
  })

  describe('props', () => {
    it('title の内容が最初の p 要素に反映される', () => {
      const wrapper = mount(AppFormHeading, {
        props: { title: 'ページ公開設定' },
      })
      const titleEl = wrapper.find('p')
      expect(titleEl.text()).toBe('ページ公開設定')
    })

    it('description を渡すと説明文が表示される', () => {
      const wrapper = mount(AppFormHeading, {
        props: { title: '基本設定', description: '説明文が入ります' },
      })
      expect(wrapper.text()).toContain('説明文が入ります')
    })

    it('description を渡すと p 要素が 2 つ描画される', () => {
      const wrapper = mount(AppFormHeading, {
        props: { title: '基本設定', description: '説明文が入ります' },
      })
      expect(wrapper.findAll('p')).toHaveLength(2)
    })

    it('description の内容が 2 番目の p 要素に反映される', () => {
      const wrapper = mount(AppFormHeading, {
        props: { title: '基本設定', description: '詳細説明テキスト' },
      })
      const paragraphs = wrapper.findAll('p')
      expect(paragraphs[1].text()).toBe('詳細説明テキスト')
    })

    it('description に HTML タグを含む文字列を渡すと HTML として描画される', () => {
      const wrapper = mount(AppFormHeading, {
        props: { title: '基本設定', description: '詳細は<a href="#">こちら</a>を参照' },
      })
      const descEl = wrapper.findAll('p')[1]
      expect(descEl.find('a').exists()).toBe(true)
      expect(descEl.find('a').text()).toBe('こちら')
    })
  })
})
