# Vue コンポーネントテスト作業ガイド

このプロジェクトにおける Vue コンポーネントテストの作業方針・テストファイルの構造・実行手順をまとめたドキュメント。

## 概要

- **目的**: コンポーネントの props・クラス付与・イベント・スロット・v-model が仕様通りに動作することを自動テストで担保する
- **位置づけ**: Phase D の「6点セット」の1つ。Storybook Story と役割が異なり、ロジック・クラス付与の単体確認が主目的
- **バージョン**: vitest v4.1.4 + @vue/test-utils v2.4.6

---

## セットアップ情報

| 項目 | 内容 |
|---|---|
| テスト実行環境 | `happy-dom`（jsdom より軽量・Vue との相性良好） |
| テストファイルのグロブ | `src/**/*.spec.ts` |
| カバレッジ出力先 | `dist/coverage/` |
| カバレッジ対象 | `src/components/**/*.vue` |
| 設定ファイル | `vitest.config.ts`（`vite.config.ts` の設定を継承） |

---

## テストファイルの作成方針

### 配置場所

コンポーネントと**同じディレクトリ**に置く（co-located）。

```
src/components/atoms/
  AppButton.vue
  AppButton.spec.ts   ← 同階層に配置
  AppButton.stories.ts
```

### 命名規則

| 対象 | 規則 |
|---|---|
| ファイル名 | `{ComponentName}.spec.ts` |
| トップの `describe` | コンポーネント名（例: `'AppButton'`） |
| 機能区分の `describe` | `'レンダリング'` / `'props'` / `'emits'` / `'slots'` / `'v-model'` |
| `it` 名 | **「〜のとき、〜である」** 形式で日本語記述 |

**`it` 名の例**:

```
'デフォルト props でレンダリングされる'
'variant="primary" のとき、bg-btn-primary クラスが付与される'
'disabled=true のとき、disabled 属性が付与される'
'disabled=true のとき、クリックイベントが発火しない'
'label prop が指定されたとき、テキストが表示される'
```

---

## テストファイルのひな形

以下をコピーして作成する。不要なブロックは削除する。

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ComponentName from './ComponentName.vue'

describe('ComponentName', () => {
  describe('レンダリング', () => {
    it('デフォルト props でレンダリングされる', () => {
      const wrapper = mount(ComponentName, {
        props: { /* 必須 props */ },
      })
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('props', () => {
    // variant / size / その他 props のテスト
  })

  describe('emits', () => {
    // クリック・変更イベントのテスト（インタラクション系コンポーネントのみ）
  })

  describe('slots', () => {
    // slot のレンダリングテスト（コンテンツ系コンポーネントのみ）
  })

  describe('v-model', () => {
    // defineModel() による双方向バインディングのテスト（フォーム系コンポーネントのみ）
  })
})
```

---

## テスト必須チェックリスト

コンポーネント実装時に「どのテストが必要か」を確認する。

| コンポーネントの特性 | 必須テスト |
|---|---|
| `variant` prop がある | 全 variant でそれぞれ期待クラスが付与されること |
| `size` prop がある | 全 size でそれぞれ期待クラスが付与されること |
| `disabled` prop がある | `disabled` 属性が付与されること・クリックイベントが発火しないこと |
| `label` / テキスト表示がある | テキスト内容がレンダリングされること |
| アイコン表示がある | アイコン要素（`<i>`）の存在・非存在 |
| `@click` など `$emit` がある | `wrapper.emitted()` でイベント発火を確認 |
| slot がある | 任意コンテンツが描画されること |
| `v-model`（`defineModel()`）がある | 値変更が親に伝播すること |

---

## テストパターン集

### 1. Tailwind クラス検証

ルート要素のクラスを確認する場合:

```ts
it('variant="primary" のとき、bg-btn-primary クラスが付与される', () => {
  const wrapper = mount(AppButton, {
    props: { variant: 'primary' },
  })
  expect(wrapper.classes()).toContain('bg-btn-primary')
})
```

子要素のクラスを確認する場合:

```ts
it('variant="primary" のとき、アイコンに text-icon-white クラスが付与される', () => {
  const wrapper = mount(AppButton, {
    props: { variant: 'primary', iconLeft: 'star' },
  })
  expect(wrapper.find('i').classes()).toContain('text-icon-white')
})
```

### 2. HTML 要素の存在確認

```ts
it('iconLeft が指定されたとき、左アイコン要素が存在する', () => {
  const wrapper = mount(AppButton, {
    props: { variant: 'ghost', iconLeft: 'star' },
  })
  expect(wrapper.find('i').exists()).toBe(true)
})

it('iconLeft が未指定のとき、アイコン要素が存在しない', () => {
  const wrapper = mount(AppButton, {
    props: { variant: 'ghost' },
  })
  expect(wrapper.find('i').exists()).toBe(false)
})
```

### 3. テキスト内容確認

```ts
it('label prop が指定されたとき、テキストが表示される', () => {
  const wrapper = mount(AppButton, {
    props: { variant: 'primary', label: '保存する' },
  })
  expect(wrapper.text()).toContain('保存する')
})
```

### 4. 属性確認

```ts
it('disabled=true のとき、disabled 属性が付与される', () => {
  const wrapper = mount(AppButton, {
    props: { variant: 'primary', disabled: true },
  })
  expect(wrapper.attributes('disabled')).toBeDefined()
})
```

### 5. disabled 時のクリックイベント非発火

```ts
it('disabled=true のとき、クリックイベントが発火しない', async () => {
  const wrapper = mount(AppButton, {
    props: { variant: 'primary', disabled: true },
  })
  await wrapper.trigger('click')
  expect(wrapper.emitted('click')).toBeUndefined()
})
```

### 6. emits 発火確認

```ts
it('クリックで click イベントが発火する', async () => {
  const wrapper = mount(AppButton, {
    props: { variant: 'primary' },
  })
  await wrapper.trigger('click')
  expect(wrapper.emitted('click')).toHaveLength(1)
})
```

### 7. slot レンダリング

```ts
it('デフォルト slot にテキストが描画される', () => {
  const wrapper = mount(AppCard, {
    slots: { default: '<p>カード本文</p>' },
  })
  expect(wrapper.html()).toContain('カード本文')
})
```

### 8. v-model 双方向バインディング（`defineModel()`）

```ts
it('入力値が update:modelValue イベントとして発火する', async () => {
  const wrapper = mount(AppInput, {
    props: { modelValue: '' },
  })
  const input = wrapper.find('input')
  await input.setValue('新しい値')
  const emitted = wrapper.emitted('update:modelValue')
  expect(emitted).toBeTruthy()
  expect(emitted![0]).toEqual(['新しい値'])
})
```

---

## 実行コマンド

| コマンド | 用途 |
|---|---|
| `npm run test` | ウォッチモードで実行（開発中） |
| `npm run test:run` | 一度だけ実行（CI / セッション完了確認） |
| `npm run test:coverage` | カバレッジレポート生成（`dist/coverage/` に出力） |
| `npx vitest run src/components/atoms/AppButton.spec.ts` | 特定ファイルのみ実行 |
| `/component-test` | スキル：全コンポーネントテストを実行 |
| `/component-test AppButton` | スキル：指定コンポーネントのテストのみ実行 |

---

## テスト作業フロー（Phase D の6点セット内の位置づけ）

Phase D では以下の6点を必ずセットで実施する。テストは SFC 実装完了後に作成する。

1. Vue SFC（`src/components/{layer}/{ComponentName}.vue`）
2. Storybook Story（`src/components/{layer}/{ComponentName}.stories.ts`）
3. **Vue Test Utils テスト**（`src/components/{layer}/{ComponentName}.spec.ts`）← 本ドキュメント
4. デモページ（`src/pages/dev/{ComponentName}Demo.vue`）
5. DevIndex 更新（`src/pages/dev/DevIndex.vue`）
6. Router 追加（`src/router/index.ts`）

**テスト作成の手順**:

1. SFC の実装内容（props・computed・template）を読み、テスト必須チェックリストで必要なテストを洗い出す
2. `ComponentName.spec.ts` を作成し、チェックリストの項目を網羅する
3. `npx vitest run src/components/.../ComponentName.spec.ts` でテストを実行し、全件 PASS を確認する
4. `/component-test ComponentName` スキルで同じ結果が出ることを確認する
5. `docs/session-plan.md` の対象行のテスト列を `✅` に更新する

---

## Storybook play 関数との使い分け

| 観点 | `.spec.ts`（Vue Test Utils） | Story の `play` 関数 |
|---|---|---|
| **目的** | ロジック・クラス付与・イベントの**単体確認** | ユーザー操作シナリオの**統合確認** |
| **実行環境** | happy-dom（軽量・高速） | 実ブラウザ（Chromium） |
| **必須か** | **必須**（全コンポーネント） | 任意（インタラクション Story のみ） |
| **適した確認内容** | クラスの付与・属性・emits・v-model | ホバー・フォーカス・ドラッグ等の視覚確認 |
| **実行コマンド** | `npm run test:run` | `npx vitest --project=storybook` |

---

最終更新: 2026-04-28
