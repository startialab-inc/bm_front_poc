import { createI18n } from 'vue-i18n'
import ja from './ja'

// i18n インスタンスを生成してエクスポートする
// legacy: false で Composition API（useI18n）を使用可能にする
export default createI18n({
  legacy: false,
  locale: 'ja',
  messages: { ja },
})
