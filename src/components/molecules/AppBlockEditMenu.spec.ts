import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import ja from '@/locales/ja'
import AppBlockEditMenu from './AppBlockEditMenu.vue'

const i18n = createI18n({ legacy: false, locale: 'ja', messages: { ja } })

const mountWithI18n = (options = {}) =>
  mount(AppBlockEditMenu, { global: { plugins: [i18n] }, ...options })

describe('AppBlockEditMenu', () => {
  describe('レンダリング', () => {
    it('デフォルト（unselect）でコンテナ div がレンダリングされること', () => {
      const wrapper = mountWithI18n()
      expect(wrapper.find('div').exists()).toBe(true)
    })

    it('デフォルト（unselect）で幅 112px クラスが付与されること', () => {
      const wrapper = mountWithI18n()
      expect(wrapper.find('div').html()).toContain('w-[112px]')
    })

    it('デフォルト（unselect）で高さ 736px クラスが付与されること', () => {
      const wrapper = mountWithI18n()
      expect(wrapper.find('div').html()).toContain('h-[736px]')
    })

    it('デフォルト（unselect）で背景色クラスが付与されること', () => {
      const wrapper = mountWithI18n()
      expect(wrapper.find('div').html()).toContain('bg-[#1b4187]')
    })
  })

  describe('props: variant', () => {
    it('variant="unselect" のとき 4 + 1（フッター）= 5 つのボタンが描画されること', () => {
      const wrapper = mountWithI18n({ props: { variant: 'unselect' } })
      const buttons = wrapper.findAll('button')
      expect(buttons).toHaveLength(5)
    })

    it('variant="select" のとき 9 つのボタンが描画されること', () => {
      const wrapper = mountWithI18n({ props: { variant: 'select' } })
      const buttons = wrapper.findAll('button')
      expect(buttons).toHaveLength(9)
    })

    it('variant="select" のとき高さ 720px クラスが付与されること', () => {
      const wrapper = mountWithI18n({ props: { variant: 'select' } })
      expect(wrapper.find('div').html()).toContain('h-[720px]')
    })

    it('variant="unselect" のときフッターボタンが absolute クラスを持つこと', () => {
      const wrapper = mountWithI18n({ props: { variant: 'unselect' } })
      const buttons = wrapper.findAll('button')
      // フッターボタンは5番目（index 4）
      expect(buttons[4].html()).toContain('absolute')
    })

    it('variant="unselect" のときフッターボタンが bottom-[47px] クラスを持つこと', () => {
      const wrapper = mountWithI18n({ props: { variant: 'unselect' } })
      const buttons = wrapper.findAll('button')
      expect(buttons[4].html()).toContain('bottom-[47px]')
    })
  })

  describe('イベント', () => {
    it('unselect のとき最初のボタンをクリックすると clickItem emit が発火すること', async () => {
      const wrapper = mountWithI18n({ props: { variant: 'unselect' } })
      await wrapper.findAll('button')[0].trigger('click')
      const emitted = wrapper.emitted('clickItem')
      expect(emitted).toHaveLength(1)
    })

    it('select のとき任意のボタンをクリックすると clickItem emit が発火すること', async () => {
      const wrapper = mountWithI18n({ props: { variant: 'select' } })
      await wrapper.findAll('button')[3].trigger('click')
      const emitted = wrapper.emitted('clickItem')
      expect(emitted).toHaveLength(1)
    })

    it('clickItem emit の引数に icon と label が含まれること（改行なしラベル）', async () => {
      const wrapper = mountWithI18n({ props: { variant: 'unselect' } })
      await wrapper.findAll('button')[0].trigger('click')
      const emitted = wrapper.emitted('clickItem') as [string, string][]
      expect(emitted[0][0]).toBe('fa-solid fa-plus')
      expect(emitted[0][1]).toBe('ブロック追加')
    })

    it('clickItem emit の引数に <br/> 入りラベルが含まれること（改行ありラベル）', async () => {
      const wrapper = mountWithI18n({ props: { variant: 'unselect' } })
      await wrapper.findAll('button')[1].trigger('click')
      const emitted = wrapper.emitted('clickItem') as [string, string][]
      expect(emitted[0][0]).toBe('fa-solid fa-image')
      expect(emitted[0][1]).toBe('ファイル<br/>アップロード')
    })
  })
})
