---
name: component-impl
description: Figma 仕様に基づいて Vue SFC + 周辺ファイル一式を実装する。Phase C ✅・Phase D ⬜ の先頭コンポーネントを1件処理。コンポーネント名を引数で指定すると、そのコンポーネントのみ処理。
disable-model-invocation: true
argument-hint: "[ComponentName]"
---

# コンポーネント実装

Figma 仕様に基づいてコンポーネントを実装するスキル（Vue SFC + 周辺ファイル一式）。
トークン使用量と安全性を考慮し、1回の実行で1件のみ処理する。

## 引数

`$ARGUMENTS` に指定した内容が以下のように解釈される:

- **引数なし**: Phase C ✅・Phase D ⬜ のコンポーネントを先頭から **1件のみ** 処理（確認不要）
- **コンポーネント名あり**（例: `/component-impl AppRadioButton`）: 指定1件のみ処理

## 手順

### 1. 設定を読み込む

`.claude/workflow-config.md` を Read ツールで読み込む。

ファイルが存在しない、または以下の項目が未記載の場合は**ユーザーに確認を取り**、確認した値を `.claude/workflow-config.md` に書き込む:

| 項目 | 説明 | 例 |
|------|------|----|
| `component_base_dir` | コンポーネント配置先ディレクトリ | `src/components/atoms/` |
| `demo_dir` | デモページ配置先（不要なら空欄） | `src/pages/dev/` |
| `index_page` | 索引ページのパス（不要なら空欄） | `src/pages/dev/DevIndex.vue` |
| `router_file` | ルーター定義のパス（不要なら空欄） | `src/router/index.ts` |
| `design_tokens_file` | デザイントークン定義のパス | `DESIGN.md` |
| `figma_parts_dir` | Figma JSON の参照先 | `docs/figma-parts/` |
| `component_list_file` | コンポーネント一覧ファイルのパス | `docs/session-plan.md` |

Story ファイルとテストファイルはコンポーネント SFC と同じディレクトリに配置する（設定不要）。

### 2. 処理対象を特定する

**引数なしの場合**:
- `component_list_file` を Read ツールで読み込む
- Phase C が ✅ かつ Phase D が ⬜（未実装）のコンポーネントを先頭から1件特定する
- 対象コンポーネント名を表示してから処理を開始する（ユーザー確認不要）

**コンポーネント名ありの場合**:
- 指定されたコンポーネントのみを対象とする（ユーザー確認不要）

### 3. 各コンポーネントを順番に処理する

各コンポーネントについて以下を実行する。1コンポーネントごとに完了を確認してから次へ進む。

#### a. 前提情報を読み込む

以下を Read ツールで読み込む:
- `{figma_parts_dir}/{node-id}.json`（Figma 仕様）
- `{design_tokens_file}`（デザイントークン）
- `.claude/rules/vue-component.md`（あれば。実装規約）

**Molecules・Organisms の場合は追加で以下を実行する:**

1. `mcp__storybook__preview_stories` で Storybook MCP への接続を確認する
   - 失敗した場合はユーザーに `pnpm storybook` の実行を依頼し、起動後に続行する
2. `mcp__storybook__list_all_documentation` で既存コンポーネント一覧を取得する
3. 実装対象で使用する予定の Atoms/Molecules を `mcp__storybook__get_documentation` で個別に確認し、
   props・slots・型定義・emits を把握してから実装を開始する

#### b. Vue SFC を実装する

`.claude/rules/vue-component.md` がある場合はその規約に従う。
ない場合は以下のデフォルト方針で実装する:
- `<script setup lang="ts">` を使用
- v-model は `defineModel()` マクロ（Vue 3.4+）
- スタイリングは Tailwind CSS ユーティリティを使用（`<style>` ブロックは原則不使用）
- デザイントークンの CSS カスタムプロパティを優先使用

#### c. Storybook Story を作成する

- ファイル名: `{ComponentName}.stories.ts`
- 全バリアント・全状態（default / hover / disabled / active 等）をカバーする
- Controls でリアルタイムに props を変更できるよう Story を設定する

#### d. テストを作成・実行する

`.claude/rules/testing.md` がある場合はその規約に従う。
ない場合は以下をカバーするテストを作成する:
- **レンダリング**: デフォルト状態で正しく描画されること
- **props**: 各 prop が表示・クラス・属性に反映されること
- **emits**: イベントが正しく発火すること（v-model / click 等）
- **slots**: スロットが描画されること（スロットがある場合）

テスト作成後、`/component-test $ARGUMENTS` を実行して全件 PASS を確認する。

#### e. デモページを作成する（`demo_dir` が設定されている場合）

- ファイル名: `{ComponentName}Demo.vue`
- 全バリアント・全状態を並べて一覧できるページを作成する

#### f. 索引ページを更新する（`index_page` が設定されている場合）

- 索引ページにコンポーネントへのリンクを追加する

#### g. ルーターを更新する（`router_file` が設定されている場合）

- デモページへのルートを追加する
- パスは `/dev/{component-name}` 形式を標準とする

#### h. 検証を完了する（3段階）

実装完了の判定は以下の **3段階すべてをクリア** してから行う:

**段階1: テスト実行（必須）**
- `pnpm run test:run` を実行し、全件 PASS を確認する
- 失敗した場合は原因を特定して修正する

**段階2: Figma 照合検証（必須）**

検証前に開発サーバーの起動状態を確認し、未起動であれば自動で起動する:

```
# 起動確認（HTTP ステータスが 200 なら起動済み）
curl -s -o /dev/null -w "%{http_code}" {dev_url}
```

- **200 が返った場合**: そのまま検証へ進む
- **それ以外（接続拒否・タイムアウト等）の場合**: Bash ツールでバックグラウンド起動し、起動を待つ

  ```bash
  # バックグラウンドで起動（workflow-config.md の dev_command を使用）
  pnpm dev &
  # 起動完了を待つ（最大 30 秒、2 秒おきにポーリング）
  for i in $(seq 1 15); do
    sleep 2
    code=$(curl -s -o /dev/null -w "%{http_code}" {dev_url})
    [ "$code" = "200" ] && break
  done
  ```

起動を確認したら以下を実行する:

1. `browser_evaluate` で `window.getComputedStyle()` を使い、CSS プロパティの値を取得する
2. `docs/figma-parts/{node-id}.json` の数値と照合する
3. 許容差: 1px 以内（font-size・line-height は完全一致）
4. 差異がある場合は原因を特定して修正する

**段階3: 目視確認（補助）**
- `browser_take_screenshot` でデモページを撮影し、表示上の問題がないか確認する

#### i. 一覧ファイルを更新する

`component_list_file` の該当コンポーネントの Phase D 列を `✅` に更新する。

#### j. 完了を報告し、範囲状況を確認する

実装完了後、以下の順で報告する:

**1. 実装完了メッセージ**

```
── AppSegmentControl 完了 ──
✅ src/components/molecules/AppSegmentControl.vue
  テスト: N 件 PASS
  Figma 照合: OK
```

**2. 範囲状況の確認と報告**

`component_list_file` を再読み込みし、実装したコンポーネントが属する範囲（Atoms / Molecules / Organisms 等）の Phase D 列をカウントする:

```
【範囲状況】Molecules Phase D: 1/9 完了（残り 8 件）
```

その範囲の全件が ✅ になっていれば、追加で完了メッセージを表示する:

```
🎉 Molecules Phase D 全完了！（M-1〜M-9 すべて実装済み）
次フェーズ（Organisms）に進む場合は /figma-collect または /component-impl を実行してください。
```

**3. 次のアクション案内**

```
次のコンポーネントに進む場合は /component-impl を再実行してください。
```

---

## 参照ドキュメント

- 設定ファイル: `.claude/workflow-config.md`
- 実装規約: `.claude/rules/vue-component.md`（あれば）
- テスト規約: `.claude/rules/testing.md`（あれば）
- 検証規約: `.claude/rules/verification.md`（あれば）
- デザイントークン: `DESIGN.md`（デフォルト）
