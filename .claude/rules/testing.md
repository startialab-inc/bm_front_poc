---
description: Vue コンポーネントのテスト記述規約
paths:
  - src/components/**/*.spec.ts
  - src/pages/**/*.spec.ts
---

## テスト記述規約

### 基本方針

- テストファイルはコンポーネントと同じディレクトリに配置する（co-located）
  ```
  src/components/atoms/
    BaseButton.vue
    BaseButton.spec.ts   ← 同階層に配置
  ```
- テストは `vitest` + `@vue/test-utils` で記述する
- `describe` / `it` / `expect` は `vitest` から明示的にインポートする（globals は使わない）
- `mount` は `@vue/test-utils` からインポートする

### テストの構成

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ComponentName from './ComponentName.vue'

describe('ComponentName', () => {
  describe('レンダリング', () => {
    // props に応じた CSS クラス・HTML 構造の確認
  })

  describe('props', () => {
    // デフォルト値・各バリアントの確認
  })

  describe('イベント', () => {
    // emits の発火確認（インタラクティブ系コンポーネントのみ）
  })

  describe('スロット', () => {
    // slot のレンダリング確認（コンテンツ系コンポーネントのみ）
  })

  describe('v-model', () => {
    // defineModel() による双方向バインディング（フォーム系コンポーネントのみ）
  })
})
```

### テスト種別と対象

| テスト種別 | 対象コンポーネント | 確認内容 |
|---|---|---|
| レンダリング | 全コンポーネント | props に応じた CSS クラス・HTML 構造 |
| props | 全コンポーネント | デフォルト値、各バリアントで期待するクラスが付与されるか |
| emits | クリック・変更が発生するコンポーネント | click / change イベントが正しく発火するか |
| slots | ラベル・コンテンツを受け取るコンポーネント | デフォルト slot・named slot が描画されるか |
| v-model | BaseInput / BaseCheckbox / BaseSelect 等 | 値の変更が親に伝播するか |

### クラス検証の書き方

Tailwind クラスで実装しているため、props のバリアントに応じて `classes()` が適切なクラスを返すかをテストする。

```typescript
it('variant="primary" のとき bg-primary クラスが付与される', () => {
  const wrapper = mount(BaseButton, {
    props: { variant: 'primary' },
  })
  expect(wrapper.classes()).toContain('bg-primary')
})
```

### disabled 状態のテスト

```typescript
it('disabled=true のとき disabled 属性が付与される', () => {
  const wrapper = mount(BaseButton, {
    props: { disabled: true },
  })
  expect(wrapper.attributes('disabled')).toBeDefined()
})

it('disabled 時はクリックイベントが発火しない', async () => {
  const wrapper = mount(BaseButton, {
    props: { disabled: true },
  })
  await wrapper.trigger('click')
  expect(wrapper.emitted('click')).toBeUndefined()
})
```

### emits のテスト

```typescript
it('クリックで click イベントが発火する', async () => {
  const wrapper = mount(BaseButton)
  await wrapper.trigger('click')
  expect(wrapper.emitted('click')).toHaveLength(1)
})
```

### slot のテスト

```typescript
it('デフォルト slot にテキストが描画される', () => {
  const wrapper = mount(BaseButton, {
    slots: { default: '送信する' },
  })
  expect(wrapper.text()).toBe('送信する')
})
```

### 実行コマンド

| コマンド | 用途 |
|---|---|
| `npm run test` | ウォッチモードで実行（開発中） |
| `npm run test:run` | 一度だけ実行（CI / セッション完了確認） |
| `npm run test:coverage` | カバレッジレポート生成（`dist/coverage/` に出力） |
