import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppCheckbox from './AppCheckbox.vue'

describe('AppCheckbox', () => {
  describe('レンダリング', () => {
    it('label 要素として描画される', () => {
      const wrapper = mount(AppCheckbox, {
        props: { label: 'テストラベル' },
      })
      expect(wrapper.find('label').exists()).toBe(true)
    })

    it('ラベルテキストが表示される', () => {
      const wrapper = mount(AppCheckbox, {
        props: { label: 'このページのアクセス URL を変更する' },
      })
      expect(wrapper.text()).toContain('このページのアクセス URL を変更する')
    })

    it('BaseCheckboxInput（input[type="checkbox"]）が内包される', () => {
      const wrapper = mount(AppCheckbox, {
        props: { label: 'テストラベル' },
      })
      expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    })

    it('デフォルト状態では label に cursor-not-allowed が付かない', () => {
      const wrapper = mount(AppCheckbox, {
        props: { label: 'テストラベル' },
      })
      // label 要素の class 属性のみを確認（input の disabled:cursor-not-allowed は対象外）
      const labelClass = wrapper.find('label').attributes('class') ?? ''
      expect(labelClass).not.toContain('cursor-not-allowed')
    })
  })

  describe('props/label', () => {
    it('label が span 要素内に表示される', () => {
      const wrapper = mount(AppCheckbox, {
        props: { label: 'ラベルテキスト' },
      })
      expect(wrapper.find('span').text()).toBe('ラベルテキスト')
    })

    it('span に text-text-primary クラスが付与される', () => {
      const wrapper = mount(AppCheckbox, {
        props: { label: 'ラベルテキスト' },
      })
      expect(wrapper.find('span').html()).toContain('text-text-primary')
    })
  })

  describe('props/disabled', () => {
    it('disabled=true のとき cursor-not-allowed クラスが付く', () => {
      const wrapper = mount(AppCheckbox, {
        props: { label: 'テストラベル', disabled: true },
      })
      expect(wrapper.html()).toContain('cursor-not-allowed')
    })

    it('disabled=true のとき opacity-50 クラスが付く', () => {
      const wrapper = mount(AppCheckbox, {
        props: { label: 'テストラベル', disabled: true },
      })
      expect(wrapper.html()).toContain('opacity-50')
    })

    it('disabled=true のとき BaseCheckboxInput に disabled が伝わる', () => {
      const wrapper = mount(AppCheckbox, {
        props: { label: 'テストラベル', disabled: true },
      })
      expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(true)
    })

    it('disabled のデフォルト値は false（input は disabled でない）', () => {
      const wrapper = mount(AppCheckbox, {
        props: { label: 'テストラベル' },
      })
      expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(false)
    })
  })

  describe('v-model / 選択状態', () => {
    it('modelValue と value が一致するとき input は checked', () => {
      const wrapper = mount(AppCheckbox, {
        props: {
          label: 'テストラベル',
          value: 'option1',
          modelValue: 'option1',
          'onUpdate:modelValue': () => {},
        },
      })
      expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(true)
    })

    it('modelValue と value が異なるとき input は未チェック', () => {
      const wrapper = mount(AppCheckbox, {
        props: {
          label: 'テストラベル',
          value: 'option1',
          modelValue: 'option2',
          'onUpdate:modelValue': () => {},
        },
      })
      expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(false)
    })

    it('boolean モード: modelValue=true のとき input は checked', () => {
      const wrapper = mount(AppCheckbox, {
        props: {
          label: 'テストラベル',
          modelValue: true,
          'onUpdate:modelValue': () => {},
        },
      })
      expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(true)
    })

    it('boolean モード: modelValue=undefined のとき input は未チェック', () => {
      const wrapper = mount(AppCheckbox, {
        props: {
          label: 'テストラベル',
          modelValue: undefined,
          'onUpdate:modelValue': () => {},
        },
      })
      expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(false)
    })

    it('input の change で update:modelValue が発行される', async () => {
      const wrapper = mount(AppCheckbox, {
        props: {
          label: 'テストラベル',
          value: 'option1',
          modelValue: undefined,
          'onUpdate:modelValue': () => {},
        },
      })
      const input = wrapper.find('input')
      ;(input.element as HTMLInputElement).checked = true
      await input.trigger('change')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })
  })
})
