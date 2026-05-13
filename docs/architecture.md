# アーキテクチャ・システム構成

## プロジェクト概要

AI技術を活用した Vue.js コンポーネントの自動生成とレビューシステムの PoC（概念実証）プロジェクト。

**目的**:
- Figma コンポーネント定義（`docs/figma-parts/*.json`）を元に Vue 3 SFC を生成する
- 生成したコンポーネントが Figma のデザインに対してどの程度忠実に再現されているかを、DOM 構造と計算済みスタイル値の比較によって客観的に計測する

## システム構成

```
データ取得層  → MCPサーバー経由で Figma からデータを取得
生成層       → Claude Code による Vue SFC コード生成
レビュー層   → DOM 構造・計算済みスタイル値の比較による定量評価
出力層       → 最終的な Vue コンポーネント群の出力
```

## 登録済み MCP サーバー

| 名称 | 登録方法 | 種別 | 備考 |
|------|---------|------|------|
| `claude.ai Figma` | プラグイン（`figma@claude-plugins-official`） | HTTP 型 | Figma API、OAuth 認証 |
| `playwright` | `~/.claude.json` mcpServers | stdio 型 | E2E テスト |
| `chrome-devtools` | `~/.claude.json` mcpServers | stdio 型 | Chrome DevTools |

## Figma 接続情報

### MCP 接続（コード生成で使用）

- **接続方法**: 公式プラグイン（`claude plugin install figma@claude-plugins-official`）で管理
- `~/.claude.json` の `mcpServers` への手動登録は不要・不可
- `figma-developer-mcp`（非公式 npm パッケージ）は**絶対に使わない**

### ツール使い分けの注意点

- `get_metadata("0:1")` → Style Guide ページのみ返る（Component ページは取得不可）
- Component ページの canvas ID 特定には `use_figma` + `figma.root.children` の列挙が必要
- Component ページの canvas ID: `308:6190`

### REST API（画像ダウンロード等でのみ使用）

- **アクセストークン**: `.env` の `FIGMA_ACCESS_TOKEN`
- **期限**: （次セッションで設定）
- **取得先**: https://www.figma.com/settings（必要スコープ: `File content`・`File metadata` の Read only）

### ファイル情報

| ファイル | キー | URL |
|---|---|---|
| Design System（コンポーネント定義） | （次セッションで設定） | （次セッションで設定） |
| アプリケーションファイル（ページ実装で使用） | （次セッションで設定） | （次セッションで設定） |

## セキュリティ

- API キーとアクセストークンは `.env` で管理し、`.gitignore` に追加済み
- 絶対に git にコミットしない

## ディレクトリ構造

```
bm_front_poc/
├── index.html             # Vite エントリー HTML（プロジェクトルート）
├── vite.config.ts         # Vite 設定（Vue + Tailwind、ポート 8300）
├── src/
│   ├── main.ts            # Vue アプリエントリー
│   ├── App.vue            # ルートコンポーネント
│   ├── router/index.ts    # Vue Router（Hash モード）
│   ├── components/
│   │   ├── layouts/       # AppHeader.vue / AppSidebar.vue
│   │   ├── atoms/         # Figma Atoms 対応（Base プレフィックス）
│   │   ├── molecules/     # Figma Molecules 対応
│   │   └── organisms/     # Figma Organisms 対応
│   ├── pages/
│   │   ├── dev/           # コンポーネントデモページ
│   │   └── {target-page}/ # 実装対象ページ
│   └── assets/main.css    # Tailwind + Figma デザイントークン（@theme）
└── docs/
    ├── figma-parts/       # UIパーツ解析結果 JSON
    └── review/            # レビュー結果
```
