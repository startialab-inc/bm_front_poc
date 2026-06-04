# bm_front_poc

Figma コンポーネント定義を元に Vue 3 SFC を生成し、DOM 構造と計算済みスタイル値の比較で Figma との再現精度を計測する PoC プロジェクト。

## スキル一覧（Claude Code `/` コマンド）

Claude Code から `/コマンド名` で呼び出せるスキルの一覧。

| コマンド | 目的 | 使い方 |
|----------|------|--------|
| `/figma-collect` | Figma からコンポーネント情報を収集して `docs/figma-parts/*.json` に保存 | 引数なし: 未収集の全件を自動ループ処理<br>`/figma-collect AppRadioButton`: 指定1件のみ |
| `/component-impl` | Figma 仕様に基づいて Vue SFC + Story + テスト + デモページを一括実装 | **【計画段階で実装内容の精査が必要なので Plan mode での使用を強く推奨】**<br>引数なし: 未実装の全件を自動ループ処理<br>`/component-impl AppRadioButton`: 指定1件のみ |
| `/component-test` | コンポーネントのテストを実行して結果を報告 | 引数なし: 全件<br>`/component-test AppButton`: 指定1件のみ |
| `/session-wrapup` | セッション締め作業（CLAUDE.md・進捗ファイル・memory の更新） | 引数なし |

## 作業指示書（初回セットアップ）

プロジェクト初回立ち上げ時や新環境構築時に参照する手順書。

| ドキュメント | 内容 | 参照タイミング |
|-------------|------|----------------|
| [`docs/guides/project-setup.md`](docs/guides/project-setup.md) | Vite + Vue 3 + Tailwind CSS v4 + pnpm + Storybook の初期化手順 | プロジェクト新規作成時 |
| [`docs/guides/design-system-setup.md`](docs/guides/design-system-setup.md) | Figma MCP 接続・デザイントークン抽出・コンポーネント棚卸の手順 | デザインシステムの初回セットアップ時 |

## 設計ドキュメント（作業中に参照）

| ドキュメント | 内容 |
|-------------|------|
| [`docs/session-plan.md`](docs/session-plan.md) | 実装計画・進捗テーブル（セッション開始時に確認） |
| [`docs/design-tokens.md`](docs/design-tokens.md) | デザイントークン一覧（コンポーネント実装前に確認） |
| [`docs/architecture.md`](docs/architecture.md) | アーキテクチャ・MCP 接続情報 |
| [`docs/figma-parts/`](docs/figma-parts/) | Figma コンポーネント情報 JSON（`/figma-collect` が生成） |

## 標準的な作業フロー

```
セッション開始
  ↓
/figma-collect          # Figma から情報収集（Phase C）
  ↓
/component-impl         # Vue SFC 実装（Phase D）
  ↓
/session-wrapup         # セッション締め
```

## 別プロジェクトへの適用方法

このプロジェクトの `.claude/` ディレクトリをコピーして利用できる。

### コピーが必要なファイル

```
.claude/
  commands/
    figma-collect.md      ← Figma 情報収集スキル
    component-impl.md     ← コンポーネント実装スキル
    component-test.md     ← テスト実行スキル
    session-wrapup.md     ← セッション締めスキル
  rules/
    vue-component.md      ← Vue SFC 実装規約
    testing.md            ← テスト記述規約
    verification.md       ← スタイル検証規約
    documentation-policy.md ← ドキュメント管理方針
docs/guides/
    project-setup.md      ← 初期化手順書
    design-system-setup.md ← デザインシステム構築手順書
```

### 変更が必要な設定値

`.claude/workflow-config.md` を新プロジェクト用に書き換える:

| 項目 | 変更内容 |
|------|---------|
| `figma_file_key` | 新プロジェクトの Figma ファイルキーに変更 |
| `figma_target_node` | 対象ページの canvas node-id に変更 |
| `figma_parts_dir` | 保存先ディレクトリが異なれば変更 |
| `component_list_file` | 進捗管理ファイルのパスに変更 |
| `component_base_dir` | コンポーネント配置先に変更 |
| `demo_dir` / `index_page` / `router_file` | デモページ構成が異なれば変更（不要なら空欄） |
| `dev_command` / `dev_url` | 開発サーバーの起動コマンドと URL に変更 |

> 設定ファイルが存在しない状態でスキルを実行すると、初回のみ確認プロンプトが表示され、
> 回答した内容が `.claude/workflow-config.md` に自動保存される。

## 開発コマンド

| コマンド | 用途 |
|----------|------|
| `pnpm dev` | 開発サーバー起動（http://localhost:8300） |
| `pnpm storybook` | Storybook 起動（http://localhost:6006） |
| `pnpm test:run` | テスト一括実行 |
| `pnpm build` | プロダクションビルド |
