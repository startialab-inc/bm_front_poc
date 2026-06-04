# Figma 情報収集

コンポーネントの Figma 情報を収集して JSON ファイルに保存するスキル。
トークン使用量を抑えるため、バッチ件数をユーザーが都度指定して分割処理する。

## 引数

- **引数なし**: 未収集の一覧を提示し、今回処理する件数をユーザーに確認してから処理（デフォルト: 3件）
- **数値あり**（例: `/figma-collect 5`）: 未収集の先頭から指定件数だけ処理
- **コンポーネント名あり**（例: `/figma-collect AppRadioButton`）: 指定1件のみ処理

## 手順

### 1. 設定を読み込む

`.claude/workflow-config.md` を Read ツールで読み込む。

ファイルが存在しない、または以下の項目が未記載の場合は**ユーザーに確認を取り**、確認した値を `.claude/workflow-config.md` に書き込む:

| 項目 | 説明 | 例 |
|------|------|----|
| `figma_file_key` | Figma ファイルキー | `VpMboz99gE6SKsEeHGcjmP` |
| `figma_target_node` | 対象ページの canvas node-id | `308:6190` |
| `figma_parts_dir` | 収集結果の保存先ディレクトリ | `docs/figma-parts/` |
| `component_list_file` | コンポーネント一覧ファイルのパス | `docs/session-plan.md` |

### 2. Figma MCP 接続を確認する

`mcp__figma__whoami` を実行して接続できることを確認する。
接続できない場合は作業を中断し、ユーザーに接続確認を依頼する。

### 3. 処理対象を特定する

**引数なしの場合**:
- `component_list_file` を Read ツールで読み込む
- Phase C 列が ⬜（未収集）のコンポーネントを抽出する
- 件数とコンポーネント名の一覧をユーザーに提示する
- 「今回は何件処理しますか？（デフォルト: 3件）」と確認する
- ユーザーの回答に基づいて未収集の先頭から N 件を処理対象とする

**数値ありの場合**:
- `component_list_file` を Read ツールで読み込む
- Phase C 列が ⬜（未収集）のコンポーネントを先頭から N 件抽出する
- 処理対象を表示してから処理を開始する（確認不要）

**コンポーネント名ありの場合**:
- 指定されたコンポーネントのみを対象とする（ユーザー確認不要）

### 4. 各コンポーネントを順番に処理する

各コンポーネントについて以下を実行する:

#### a. Figma データを取得する

`mcp__figma__get_design_context` で以下を取得する:
- バリアント一覧とプロパティ
- 各バリアントの寸法（width / height）
- 色・フォント・余白の計算済み値
- インタラクション状態（hover / active / disabled / focus 等）

node-id が不明な場合は、先に `mcp__figma__get_metadata` で対象ノードを検索する。

#### b. JSON ファイルに保存する

`{figma_parts_dir}/{node-id}.json` として保存する。
ファイル名のルール: node-id のコロン（`:`）はハイフン（`-`）に変換する（例: `308:6380` → `308-6380.json`）。

保存する情報の例:
```json
{
  "componentName": "AppRadioButton",
  "nodeId": "917:52673",
  "figmaName": "RadioButton",
  "variants": [...],
  "sizes": { "width": 20, "height": 20 },
  "colors": { "border": "#8b9ab0", "fill": "#2862cb" },
  "states": ["default", "checked", "disabled"]
}
```

#### c. 一覧ファイルを更新する

`component_list_file` の該当コンポーネントの Phase C 列を `✅` に更新する。

#### d. 進捗を報告する

処理が完了したら進捗をユーザーに報告する:
```
✅ AppRadioButton 完了（1/5）
  → docs/figma-parts/917-52673.json に保存
```

### 5. バッチ完了後にサマリーを表示する

今回処理した件数と残件数を表示し、続行を確認する:

```
── 今回のバッチ完了（3件処理）──
✅ 成功: 3 件
  - SegmentControl (520-13298.json)
  - Tab (849-2467.json)
  - Pagination (932-25039.json)

残り: 17 件
次のバッチを処理しますか？（Y/N）
```

- Y の場合: 「何件処理しますか？（デフォルト: 3件）」と確認し、次のバッチへ
- N の場合: 終了。残件数を案内して終わる
- 残件が 0 の場合: 「全件完了」と表示して終わる

---

## 参照ドキュメント

- 設定ファイル: `.claude/workflow-config.md`
- Figma データソース: `CLAUDE.md` の「Figma データソース」セクション
- 保存先: `docs/figma-parts/`（デフォルト）
