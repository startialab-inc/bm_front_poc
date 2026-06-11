# bm_front_poc

Figma コンポーネント定義（`docs/figma-parts/*.json`）を元に Vue 3 SFC を生成し、
DOM 構造と計算済みスタイル値の比較で Figma との再現精度を計測する PoC プロジェクト。

## 技術スタック

- **ランタイム**: Node.js v24.15.0（`.node-version` で管理、`fnm` 推奨）+ TypeScript
- **パッケージマネージャー**: pnpm 10.33.0（`packageManager` フィールドで固定、`use-node-version=24.15.0` を `.npmrc` に設定済み）
- **フロントエンド**: Vue 3 (Composition API) + Tailwind CSS v4
- **多言語対応**: vue-i18n v11（`legacy: false`、Composition API モード）。メッセージは `src/locales/ja.ts`
- **アイコン**: FontAwesome（CDN 経由、`<i class="fa-solid fa-...">` 形式）
- **開発サーバー**: Vite v6（ポート 8300）

## コマンド

| コマンド | 用途 |
|---|---|
| `pnpm dev` | 開発サーバー起動（http://localhost:8300） |
| `pnpm build` | プロダクションビルド |
| `pnpm storybook` | Storybook 起動（http://localhost:6006） |

## 行動原則

1. **タスクの粒度は小さく保ち、1 セッション分のタスクが完了したら `/session-wrapup` の実行を促すこと**。セッションをまたいで連続した作業を Claude Code の独断で行わないこと。
   - 理由：コンテキスト圧縮上限に達すると詳細情報が失われるリスクがあるため、1セッションで詰め込みすぎない。複数セッションに分けて完結する形で問題ない。
   - セッションをまたぐ引き継ぎ情報は `/session-wrapup` で memory に記録する。
2. **セッション開始時に `mcp__figma__whoami` で Figma MCP 接続を確認する**（接続できない場合は作業を開始しない）
3. **Molecules/Organisms コンポーネント実装前に Storybook MCP 接続を確認する**
   - `mcp__storybook__preview_stories` で接続確認する（Storybook MCP: `http://localhost:6006/mcp`）
   - 未起動の場合はユーザーに `pnpm storybook` の実行を依頼してから実装を開始する
   - 接続後は `mcp__storybook__list_all_documentation` / `mcp__storybook__get_documentation` で既存コンポーネントの props・slots・型定義を参照する
4. **検証は `browser_evaluate` + `window.getComputedStyle()` を主とし、`browser_take_screenshot` を補助的に併用する**
5. **Figma データ取得は MCP 経由のみ**（REST API 直接呼び出し・`figma-developer-mcp` 不可）
6. **git コミットはユーザー側で実施する**（Claude Code は自動コミットしない）
7. **コンポーネント実装対象は `docs/session-plan.md` の実装状況テーブルに従う**（Design System 全コンポーネントをボトムアップで実装する）
8. **コンポーネント実装後は必ずデモページを作成する**（`src/pages/dev/{ComponentName}Demo.vue`）
9. **Phase D でコンポーネントを実装したら `docs/figma-vue-map.md` を更新する**（未実装セクションの行を実装済みテーブルに移動し、使用例を記入する）
9. **エラーや問題が発生したら必ず根本原因を調査し、再発を防ぐ対処を行う**（「再起動で誤魔化す」「無視して先に進む」「迂回策で先に進む」は原則禁止。どうしても迂回策が必要な場合は、迂回策であることを明示し根本原因の調査も行う）

## 参照ドキュメント

ドキュメント分類ルールと全索引 → [`docs/DOCUMENT_RULES.md`](docs/DOCUMENT_RULES.md)

| タイミング | 参照先 |
|---|---|
| ディレクトリ構造確認 | `docs/directory-structure.md` |
| セッション開始時（進捗・次タスク確認） | `docs/session-plan.md` |
| コンポーネント実装前（デザイントークン確認） | `DESIGN.md` |
| **ページ生成時（Figma 名 → Vue コンポーネント特定）** | **`docs/figma-vue-map.md`** |
| Figma パーツ詳細確認 | `docs/figma-parts/{node-id}.json` |
| 対象画面・遷移確認 | `docs/screens.md` |
| アーキテクチャ・MCP 接続確認 | `docs/architecture.md` |
| コンポーネントテスト実装時 | `docs/testing.md` |

`.claude/rules/` のルールは Vue ファイル編集時に自動注入される（明示的な参照不要）。

## Figma データソース

| 項目 | 値 |
|---|---|
| ファイルキー | `VpMboz99gE6SKsEeHGcjmP` |
| 対象ページ | Component（canvas ID: `308:6190`） |
| 接続方法 | 公式 Figma MCP プラグイン（`mcp__figma__*` ツール経由） |

## 次の作業

✅ **Phase B**: Component ページの全コンポーネントを探索・分類し `docs/session-plan.md` を作成する
✅ **Phase B**: デザイントークンを収集し `DESIGN.md` を作成する
✅ **Phase C（Atoms）**: #1〜#28 全 Atoms の Figma 情報を `docs/figma-parts/{nodeId}.json` に保存完了
✅ **Phase C.5**: Atoms の Vue.js コンポーネント構成をユーザーと相談・確定完了
✅ **Phase D（Atoms）**: 全 Atoms 完了（A-1〜A-22、BaseControlLabel 含む）。2026-06-05 完了
✅ **Phase C（Molecules）**: 全件完了（22件）。2026-06-04 完了
✅ **Phase D（Molecules）**: #45 ModalFooter 完了（2026-06-11）。残り #43 ScrollArea・#35 CalendarTime はペンディング（ライブラリ未確定）
✅ **Figma 再精査（2026-06-11）**: 新規・変更コンポーネントの洗い出しと情報収集完了（高・中・低優先度、計 30 件超）
🔄 **Phase C（Organisms/Templates）**: 進行中。O-1 sidebar・ブロック編集系10件・CurationTable系7件・Templates5件 収集済み。未収集は Title/* / InlineMenu/* / ContactItem系 等。**まず全件収集を完了させる。**
⬜ **テスト実装**: Organisms コンポーネント化なしで単体ページを直接実装してみる（プロジェクトチームからの要請）
⬜ **Phase D（Organisms）**: テスト実装の結果により着手判断（結果良好 → ページ実装継続 / 思わしくなければ Organisms を先に実装）

### 全体フローの方針（2026-06-11 更新）

- Atoms Phase D 完了（2026-06-05）
- Molecules Phase D 実質完了（#35 CalendarTime・#43 ScrollArea はライブラリ未確定でペンディング継続）
- **次のステップ①**: Organisms Phase C の残り全件収集（`/figma-collect 3` で Title/* / InlineMenu/* 等）
- **次のステップ②**: 単体ページのテスト実装（Organisms コンポーネント化なし）→ 結果評価
- Phase D（Organisms）は上記テスト実装の評価結果によって着手を判断

### Figma typo 一覧（Vue 実装時は正しい名称に読み替える）

- Checkbox の state 名: 'Selectd' → 正: 'Selected'
- Badge/SubStatus の state 名: 'Editting' → 正: 'Editing'
- PagerNubmer のコンポーネント名: 'PagerNubmer' → 正: 'PagerNumber'
- PagerNubmer の state 名: 'Acutive' → 正: 'Active'
- Snackbar の type 名: 'info' → 実装時は 'info'（小文字のまま）、他は 'success'/'warning'/'error'（小文字統一）

### 申し送り事項

- **pnpm 移行完了（2026-05-22）**: npm → pnpm 移行済み。`package-lock.json` 削除・`pnpm-lock.yaml` 生成済み。`.npmrc` に `use-node-version=24.15.0` 設定済み。
- **進捗更新（必須）**: `/session-wrapup` 時は CLAUDE.md「次の作業」・`docs/session-plan.md` のコンポーネント一覧テーブル（Phase C/D 列）・Phase D タスクリスト・memory の4点をセットで更新する
- **詳細な実装ノート**: `docs/session-plan.md` の「Phase D 実施メモ」参照（Vite base 設定・テストパターン・CSS 注意点など）
- **デモページ更新予定**: `docs/session-plan.md` の「デモページ更新予定タスク」参照（Molecule 実装後の置き換え作業一覧）
- **SVG アセット取得方針（2026-05-22 確定）**: Figma MCP では SVG を直接取得できない。SVG が必要な場合はユーザーに手動エクスポートを依頼する。PNG の場合は必ず 2x スケール（scale=2）で取得する。
- **vue-i18n 導入済み（2026-05-21）**: Storybook への適用は `globalThis.PLUGINS_SETUP_FUNCTIONS` 操作で実現。テストは `createI18n` を `{ global: { plugins: [i18n] } }` で mount に渡す。
- **CalendarTime・ScrollArea はペンディング継続**: #35 CalendarTime（カレンダーライブラリ未確定）・#43 ScrollArea（ライブラリ未確定）はライブラリ確定まで着手しない。
- **Figma 再精査完了（2026-06-11）**: 新規 30 件超の JSON を `docs/figma-parts/` に保存済み。ListSelectableArea（`4068:140723` / `4068:141982`）は他デザイナーが ScrollArea 代替として作業中のため収集スキップ。完了後に改めて収集する。
- **新方針（プロジェクトチームからの要請、2026-06-11）**: Organisms を個別コンポーネントとして実装する前に、まず単体ページを直接実装してテストを行う。結果が良好であればページ実装を継続、思わしくなければ Organisms をコンポーネントとして先に実装する。
- **次のフェーズ**: Organisms Phase C の残り全件収集（`/figma-collect 3` で Title/* / InlineMenu/* 等）→ テスト実装。

詳細な全体計画 → `docs/session-plan.md`
