import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseRadioInput from './BaseRadioInput.vue'

describe('BaseRadioInput', () => {
  describe('レンダリング', () => {
    it('input[type="radio"] が描画される', () => {
      const wrapper = mount(BaseRadioInput, {
        props: { value: 'option1', name: 'test' },
      })
      const input = wrapper.find('input[type="radio"]')
      expect(input.exists()).toBe(true)
    })

    it('ルート要素が input タグである', () => {
      const wrapper = mount(BaseRadioInput, {
        props: { value: 'option1', name: 'test' },
      })
      expect(wrapper.element.tagName).toBe('INPUT')
    })

    it('appearance-none クラスが付与される', () => {
      const wrapper = mount(BaseRadioInput, {
        props: { value: 'option1', name: 'test' },
      })
      expect(wrapper.classes()).toContain('appearance-none')
    })

    it('w-4 クラスが付与される', () => {
      const wrapper = mount(BaseRadioInput, {
        props: { value: 'option1', name: 'test' },
      })
      expect(wrapper.classes()).toContain('w-4')
    })

    it('h-4 クラスが付与される', () => {
      const wrapper = mount(BaseRadioInput, {
        props: { value: 'option1', name: 'test' },
      })
      expect(wrapper.classes()).toContain('h-4')
    })

    it('rounded-full クラスが付与される', () => {
      const wrapper = mount(BaseRadioInput, {
        props: { value: 'option1', name: 'test' },
      })
      expect(wrapper.classes()).toContain('rounded-full')
    })
  })

  describe('props/name', () => {
    it('name 属性が正しく設定される', () => {
      const wrapper = mount(BaseRadioInput, {
        props: { value: 'option1', name: 'my-group' },
      })
      expect(wrapper.attributes('name')).toBe('my-group')
    })

    it('異なる name 値も正しく設定される', () => {
      const wrapper = mount(BaseRadioInput, {
        props: { value: 'option1', name: 'another-group' },
      })
      expect(wrapper.attributes('name')).toBe('another-group')
    })
  })

  describe('props/value', () => {
    it('文字列 value が input の value 属性に設定される', () => {
      const wrapper = mount(BaseRadioInput, {
        props: { value: 'option1', name: 'test' },
      })
      expect((wrapper.element as HTMLInputElement).value).toBe('option1')
    })

    it('数値 value が文字列として input の value 属性に設定される', () => {
      const wrapper = mount(BaseRadioInput, {
        props: { value: 42, name: 'test' },
      })
      expect((wrapper.element as HTMLInputElement).value).toBe('42')
    })
  })

  describe('props/disabled', () => {
    it('disabled=true のとき disabled 属性が付与される', () => {
      const wrapper = mount(BaseRadioInput, {
        props: { value: 'option1', name: 'test', disabled: true },
      })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('disabled=false のとき disabled 属性が付与されない', () => {
      const wrapper = mount(BaseRadioInput, {
        props: { value: 'option1', name: 'test', disabled: false },
      })
      expect(wrapper.attributes('disabled')).toBeUndefined()
    })

    it('disabled のデフォルト値は false である', () => {
      const wrapper = mount(BaseRadioInput, {
        props: { value: 'option1', name: 'test' },
      })
      expect(wrapper.attributes('disabled')).toBeUndefined()
    })
  })

  describe('v-model', () => {
    it('modelValue と value が一致するとき checked になる', () => {
      const wrapper = mount(BaseRadioInput, {
        props: { modelValue: 'option1', value: 'option1', name: 'test' },
      })
      expect((wrapper.element as HTMLInputElement).checked).toBe(true)
    })

    it('modelValue と value が異なるとき checked にならない', () => {
      const wrapper = mount(BaseRadioInput, {
        props: { modelValue: 'option2', value: 'option1', name: 'test' },
      })
      expect((wrapper.element as HTMLInputElement).checked).toBe(false)
    })

    it('modelValue が空のとき checked にならない', () => {
      const wrapper = mount(BaseRadioInput, {
        props: { modelValue: '', value: 'option1', name: 'test' },
      })
      expect((wrapper.element as HTMLInputElement).checked).toBe(false)
    })

    it('変更時に update:modelValue が発火する', async () => {
      const wrapper = mount(BaseRadioInput, {
        props: { modelValue: 'option2', value: 'option1', name: 'test' },
      })
      const input = wrapper.find('input')
      // チェック状態を設定してから change イベントを発火
      ;(input.element as HTMLInputElement).checked = true
      await input.trigger('change')
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted![0][0]).toBe('option1')
    })
  })
})
