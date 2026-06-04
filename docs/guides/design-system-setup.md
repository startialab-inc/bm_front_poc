# デザインシステム セットアップ手順

Figma から デザイントークンとコンポーネント仕様を収集し、プロジェクトに組み込む手順書。

> **このプロジェクトでの設定例** として bm_front_poc の値を随所に記載している。
> 別プロジェクトに適用する場合は `{YOUR_*}` と表記した箇所を置き換えること。

---

## 前提条件

- Figma MCP プラグイン（`figma@claude-plugins-official`）が Claude Code に登録済み
- Figma にアクセスできるアカウントでプラグインが認証済み

---

## Step 1: Figma MCP 接続確認

Claude Code で以下を実行:

```
mcp__figma__whoami
```

接続できている場合: ユーザー情報（名前・メールアドレス）が返る。
接続できない場合: Claude Code の MCP 設定を確認し、プラグインを再認証する。

---

## Step 2: Figma ファイルキーとページ ID の特定

### 2-1. ファイルキーの確認

Figma のブラウザ URL から取得:

```
https://www.figma.com/design/{FILE_KEY}/{FILE_NAME}?...
```

> このプロジェクトでの値: `VpMboz99gE6SKsEeHGcjmP`

### 2-2. 対象ページの node-id 確認

```
mcp__figma__get_metadata(fileKey: "{YOUR_FILE_KEY}", nodeId: "0:1")
```

返ってきたページ一覧から対象ページの `id` を確認する。

> このプロジェクトでの値: Component ページ = `308:6190`

### 2-3. `.claude/workflow-config.md` に記録する

```yaml
figma_file_key: {YOUR_FILE_KEY}
figma_target_node: "{YOUR_PAGE_NODE_ID}"
```

---

## Step 3: デザイントークン抽出

### 3-1. 変数コレクションを取得する

```
mcp__figma__get_variable_defs(fileKey: "{YOUR_FILE_KEY}")
```

以下の情報を確認:
- プリミティブカラー（ブランドカラーパレット）
- セマンティックカラー（用途別の色定義）
- タイポグラフィ変数
- スペーシング変数

### 3-2. ライブラリ情報を取得する

```
mcp__figma__get_libraries(fileKey: "{YOUR_FILE_KEY}")
```

外部ライブラリ（共有スタイル等）が参照されている場合はここで確認する。

### 3-3. `docs/design-tokens.md` を作成する

取得したトークンを以下のフォーマットで整理して保存する:

```markdown
# デザイントークン

## プリミティブカラー（ブランドカラー）

| トークン名 | 値 | 用途 |
|------------|----|----|
| brand/blue/50 | #ddeaff | 背景・ホバー薄い |
| brand/blue/500 | #2862cb | メインボタン・ブランドカラー |
| ...         |    |    |

## セマンティックカラー

| トークン名 | 値 | 用途 |
|------------|----|----|
| text-primary | brand/blue/900 | メインテキスト |
| ...         |    |    |
```

---

## Step 4: CSS カスタムプロパティへの変換

`src/assets/main.css` の `@theme` ブロックにトークンを定義する。

```css
@import "tailwindcss";

@theme {
  /* プリミティブカラー */
  --color-brand-blue-50: #ddeaff;
  --color-brand-blue-500: #2862cb;
  --color-brand-blue-900: #0d2144;

  /* セマンティックカラー */
  --color-text-primary: var(--color-brand-blue-900);
  --color-text-brand: var(--color-brand-blue-500);
  --color-ic-primary: var(--color-brand-blue-800);
}
```

Tailwind クラスとして使用:

```html
<p class="text-text-primary">テキスト</p>
<button class="bg-brand-blue-500">ボタン</button>
```

---

## Step 5: コンポーネント棚卸し（Phase B）

### 5-1. Component ページを探索する

```
mcp__figma__get_design_context(fileKey: "{YOUR_FILE_KEY}", nodeId: "{YOUR_PAGE_NODE_ID}")
```

返ってきたコンポーネント一覧から以下を分類する:
- **Atoms**: 単体で完結する最小コンポーネント（Button, Tag, Badge 等）
- **Molecules**: 複数 Atom を組み合わせたコンポーネント（RadioButton, Checkbox 等）
- **Organisms**: ページ内の大きなセクション（Sidebar, Modal 等）

### 5-2. 各コンポーネントの情報を確認する

各コンポーネントについて以下を記録する:
- コンポーネント名（Figma 上の名前）
- node-id
- バリアント数と主なプロパティ
- 他コンポーネントへの依存関係

> **Figma 表記ゆれの注意**: Figma 上のタイポ（誤記）は Vue 実装時に正しい名前に読み替える。
> 既知の表記ゆれは `CLAUDE.md` の「Figma typo 一覧」に記録しておくこと。

### 5-3. `docs/session-plan.md` を作成する

以下の構造で実装計画を作成する:

```markdown
# 実装計画

## Atoms

| # | Vue コンポーネント | Figma node-id | Phase C | Phase D |
|---|-----------------|---------------|---------|---------|
| A-1 | AppButton.vue | 520:14190 | ⬜ | ⬜ |
| ...  |                |               |         |         |

## Molecules

| # | Vue コンポーネント | Figma node-id | Phase C | Phase D |
|---|-----------------|---------------|---------|---------|
| M-1 | AppRadioButton.vue | 917:52673 | ⬜ | ⬜ |
| ...  |                   |            |         |         |

## Organisms

| # | Vue コンポーネント | Figma node-id | Phase C | Phase D |
|---|-----------------|---------------|---------|---------|
| O-1 | AppSidebar.vue | 308:6191 | ⬜ | ⬜ |
| ...  |                |          |         |         |
```

---

## Step 6: `docs/figma-parts/` の初期化

```bash
mkdir -p docs/figma-parts
```

各コンポーネントの Figma 情報は `/figma-collect` スキルが自動的にここへ保存する。

ファイル名のルール: `{node-id（コロンをハイフンに変換）}.json`
例: node-id `308:6380` → `308-6380.json`

---

## Step 7: `.claude/workflow-config.md` を完成させる

Step 2・5 で確認した値を記入する:

```yaml
figma_file_key: {YOUR_FILE_KEY}
figma_target_node: "{YOUR_PAGE_NODE_ID}"
figma_parts_dir: docs/figma-parts/
component_list_file: docs/session-plan.md
```

---

## チェックリスト

- [ ] `mcp__figma__whoami` で接続確認できる
- [ ] `docs/design-tokens.md` にトークン一覧が記録されている
- [ ] `src/assets/main.css` にトークンが CSS 変数として定義されている
- [ ] `docs/session-plan.md` に全コンポーネントが登録されている
- [ ] `.claude/workflow-config.md` に `figma_file_key` と `figma_target_node` が記入されている
- [ ] `/figma-collect` を実行して正常に動作することを確認できる
