# Storybook 作業ガイド

<!-- このドキュメントは design_code_poc から移植したテンプレートです。プロジェクト固有の情報は適宜更新してください。 -->

このプロジェクトにおける Storybook の作業方針・Story ファイルの構造・動作確認手順をまとめたドキュメント。

## 概要

Storybook はコンポーネント実装後の動作確認・全バリアント表示・Figma との視覚的照合の場として使用する。
各 atoms コンポーネントに対応する Story ファイルを作成する。

**バージョン**: Storybook v10.3.5  
**フレームワーク**: `@storybook/vue3-vite`

---

## セットアップ情報

| 項目 | 内容 |
|---|---|
| 起動コマンド | `npm run storybook` |
| URL | http://localhost:6006 |
| Story ファイルのグロブ | `src/components/**/*.stories.ts` |
| グローバル CSS | `.storybook/preview.ts` で `src/assets/main.css` をインポート済み |
| Tailwind CSS | `.storybook/main.ts` の `viteFinal` で `@tailwindcss/vite` を追加済み |
| `@` エイリアス | `src/` を指すように `.storybook/main.ts` で設定済み |

### 導入済みアドオン

| アドオン | 用途 |
|---|---|
| `@storybook/addon-docs` | `autodocs` タグによる自動ドキュメント生成 |
| `@storybook/addon-vitest` | `play` 関数のインタラクションテスト |
| `@storybook/addon-a11y` | アクセシビリティチェック |
| `@storybook/addon-mcp` | Claude Code から Storybook を操作（Storybook 起動中のみ利用可能） |
| `@chromatic-com/storybook` | Chromatic ビジュアルテスト連携 |

### Storybook MCP

Storybook 起動中のみ利用できる MCP サーバーが `.mcp.json`（project スコープ）に設定済み。

```
URL: http://localhost:6006/mcp
```

---

## Story ファイルの作成方針

### 配置場所

```
src/components/atoms/{ComponentName}.stories.ts
```

コンポーネント本体（`BaseTag.vue`）と同じディレクトリに置く。

### フォーマット

**CSF3（Component Story Format 3）** を使用する。

### import

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseTag from './BaseTag.vue'
```

インタラクションテストを書く場合は以下も追加する:

```ts
import { expect, fn } from 'storybook/test'
```

---

## Story ファイルの構造

### meta 定義

```ts
const meta: Meta<typeof BaseTag> = {
  component: BaseTag,
  title: 'Atoms/BaseTag',          // サイドバーの表示パス
  tags: ['autodocs'],               // Docs タブを自動生成する
  parameters: {
    docs: {
      description: {
        component:
          'コンポーネントの概要説明文。\n\n`variant` で外観（...）を、`size` でサイズ（...）を切り替えられる。\n\n追加の特記事項があればここに記載する。',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'gray', 'color1', 'color2', 'before', 'after'],
    },
  },
  args: {
    variant: 'default',             // Controls パネルの初期値
  },
}

export default meta
type Story = StoryObj<typeof BaseTag>
```

> **必須**: `parameters.docs.description.component` は全 Story ファイルで必ず記述する。
> Storybook の Docs タブに表示されるコンポーネント説明文であり、`variant` / `size` の種類・デフォルト値・主要な使い方を 2〜4 文で記載する。

**`title` の命名規則**:

| 層 | 例 |
|---|---|
| Atoms | `'Atoms/BaseButton'` |
| Molecules | `'Molecules/FormField'` |
| Organisms | `'Organisms/DataTable'` |

### Story の記述パターン

**基本パターン（props + スロット）**:

```ts
export const Default: Story = {
  name: 'Default（白背景・グレーボーダー）',   // サイドバーに表示される名前
  args: { variant: 'default' },
  render: (args) => ({
    components: { BaseTag },
    setup: () => ({ args }),
    template: '<BaseTag v-bind="args">サンプル</BaseTag>',
  }),
}
```

**インタラクションテスト付きパターン（`play` 関数）**:

```ts
export const ClickInteraction: Story = {
  name: 'クリックイベントの発火確認',
  args: { variant: 'primary', size: 'medium' },
  render: (args) => ({
    components: { BaseButton },
    setup: () => ({ args, onClick: fn() }),
    template: '<BaseButton v-bind="args" @click="onClick">クリックする</BaseButton>',
  }),
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'クリックする' })
    await button.click()
    await expect(button).toBeInTheDocument()
  },
}
```

`play` 関数は `@storybook/addon-vitest` によって vitest テストとして実行される。

### バリアント網羅の指針

- コンポーネントの全 `variant` × 主要 `size` の組み合わせを Story として定義する
- disabled / current などの状態（state）も別 Story として定義する
- テキスト内容はそのバリアントの実際の用途を反映させる（「サンプル」より「コンタクト済み」「変更前」等）
- ラッパー要素が必要な場合（バッジが overflow するケース等）は `template` に `<div class="p-6">` 等を追加する

---

## 動作確認方法

### ブラウザ確認

```
http://localhost:6006/?path=/story/{title-kebab}--{story-kebab}
```

例: `Atoms/BaseTag` の `Default` Story を開く場合:

```
http://localhost:6006/?path=/story/atoms-basetag--default
```

**URL の変換規則**:
- `title` の `/` はそのまま、大文字はケバブケースに変換（`Atoms/BaseTag` → `atoms-basetag`）
- `name` ではなく **export 名**をケバブケースに変換（`Color1` → `color-1`、`LongText` → `long-text`）

### iframe 直接アクセス

Storybook の外殻（サイドバー・アドオンパネル）なしでコンポーネントのみを表示する URL。
Playwright MCP での数値検証に適している。

```
http://localhost:6006/iframe.html?id={title-kebab}--{story-kebab}&viewMode=story
```

例:

```
http://localhost:6006/iframe.html?id=atoms-basetag--gray&viewMode=story
```

---

## Playwright MCP による数値照合（Claude Code 側検証）

### 検証手順

1. Storybook を起動する（`npm run storybook`）
2. iframe URL に `browser_navigate` でアクセスする
3. `browser_evaluate` + `window.getComputedStyle()` でスタイル値を取得する
4. Figma 仕様値と照合する
5. `browser_take_screenshot` で目視確認する（補助）

### コンポーネント要素の特定

iframe 内には Storybook 外殻の `span` 等が混在する。コンポーネント固有の要素は
Tailwind クラス名で絞り込む。

**BaseTag の例（`inline-flex` クラスで特定）**:

```js
// Playwright MCP browser_evaluate の function として使用
() => {
  const tag = Array.from(document.querySelectorAll('span'))
    .find(el => el.className.includes('inline-flex'))
  if (!tag) return 'not found'
  const s = window.getComputedStyle(tag)
  return {
    height: s.height,
    borderRadius: s.borderRadius,
    fontSize: s.fontSize,
    backgroundColor: s.backgroundColor,
    borderColor: s.borderColor,
    color: s.color,
  }
}
```

**Storybook 外殻との混同を避けるポイント**:
- `/?path=/story/...` のメイン URL では、コンポーネントは `iframe#storybook-preview-iframe` の中にある
  - `document.querySelector('iframe#storybook-preview-iframe').contentDocument` でアクセスする
- `/iframe.html?id=...` の URL では `document` が直接コンポーネントのドキュメントになるため、そのまま操作できる
- **推奨**: `/iframe.html` URL を使う方がセレクタがシンプルになる

### 確認するスタイルプロパティ

| カテゴリ | プロパティ | Figma 仕様の取得元 |
|---|---|---|
| サイズ | `height`, `width` | Figma JSON の `absoluteBoundingBox` |
| 形状 | `borderRadius` | Figma JSON の `cornerRadius` |
| 文字 | `fontSize`, `color` | Figma JSON の `style.fontSize` / `fills` |
| 背景 | `backgroundColor` | Figma JSON の `fills` |
| 枠線 | `borderColor` | Figma JSON の `strokes` |
| 余白 | `paddingLeft/Right/Top/Bottom` | Figma JSON の `padding*` |

---

## vitest による Story テスト

`play` 関数を定義した Story は vitest でテストとして実行できる。

```bash
npx vitest --project=storybook
```

`@storybook/addon-vitest` が `vitest.config.ts` の `projects` に `storybook` として追加されている。
`play` 関数のない Story は自動的に「インタラクションなし」として扱われ、レンダリング確認のみ実施される。

---

## Story 作業フロー

1. `npm run storybook` で Storybook を起動する（http://localhost:6006）
2. 対象コンポーネントの `src/pages/dev/{Name}Demo.vue` を読んでバリアント一覧を把握する
3. `src/components/atoms/{ComponentName}.stories.ts` を作成する（CSF3 形式）
4. Playwright MCP の `browser_navigate` で `/iframe.html?id=...` にアクセスし、
   `browser_evaluate` + `getComputedStyle` で全バリアントのスタイル値を Figma 仕様と照合する
5. `browser_take_screenshot` でスクリーンショットを撮影し、目視で問題がないか確認する
6. `docs/session-plan.md` の対象コンポーネントの Story 列を `✅` に更新する

---

最終更新: 2026-04-20（design_code_poc から移植）
