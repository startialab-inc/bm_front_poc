# bm_front_poc

Figma コンポーネント定義（`docs/figma-parts/*.json`）を元に Vue 3 SFC を生成し、
DOM 構造と計算済みスタイル値の比較で Figma との再現精度を計測する PoC プロジェクト。

## 技術スタック

- **ランタイム**: Node.js v24.15.0（`.node-version` で管理、`fnm` 推奨）+ TypeScript
- **フロントエンド**: Vue 3 (Composition API) + Tailwind CSS v4
- **多言語対応**: vue-i18n v11（`legacy: false`、Composition API モード）。メッセージは `src/locales/ja.ts`
- **アイコン**: FontAwesome（CDN 経由、`<i class="fa-solid fa-...">` 形式）
- **開発サーバー**: Vite v6（ポート 8300）

## コマンド

| コマンド | 用途 |
|---|---|
| `npm run dev` | 開発サーバー起動（http://localhost:8300） |
| `npm run build` | プロダクションビルド |
| `npm run storybook` | Storybook 起動（http://localhost:6006） |

## 行動原則

1. **タスクの粒度は小さく保ち、1 セッション分のタスクが完了したら `/session-wrapup` の実行を促すこと**。セッションをまたいで連続した作業を Claude Code の独断で行わないこと。
   - 理由：コンテキスト圧縮上限に達すると詳細情報が失われるリスクがあるため、1セッションで詰め込みすぎない。複数セッションに分けて完結する形で問題ない。
   - セッションをまたぐ引き継ぎ情報は `/session-wrapup` で memory に記録する。
2. **セッション開始時に `mcp__figma__whoami` で Figma MCP 接続を確認する**（接続できない場合は作業を開始しない）
3. **検証は `browser_evaluate` + `window.getComputedStyle()` を主とし、`browser_take_screenshot` を補助的に併用する**
4. **Figma データ取得は MCP 経由のみ**（REST API 直接呼び出し・`figma-developer-mcp` 不可）
5. **git コミットはユーザー側で実施する**（Claude Code は自動コミットしない）
6. **コンポーネント実装対象は `docs/session-plan.md` の実装状況テーブルに従う**（Design System 全コンポーネントをボトムアップで実装する）
7. **コンポーネント実装後は必ずデモページを作成する**（`src/pages/dev/{ComponentName}Demo.vue`）
8. **エラーや問題が発生したら必ず根本原因を調査し、再発を防ぐ対処を行う**（「再起動で誤魔化す」「無視して先に進む」「迂回策で先に進む」は原則禁止。どうしても迂回策が必要な場合は、迂回策であることを明示し根本原因の調査も行う）

## 参照ドキュメント

ドキュメント分類ルールと全索引 → [`docs/DOCUMENT_RULES.md`](docs/DOCUMENT_RULES.md)

| タイミング | 参照先 |
|---|---|
| ディレクトリ構造確認 | `docs/directory-structure.md` |
| セッション開始時（進捗・次タスク確認） | `docs/session-plan.md` |
| コンポーネント実装前（デザイントークン確認） | `docs/design-tokens.md` |
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
✅ **Phase B**: デザイントークンを収集し `docs/design-tokens.md` を作成する
✅ **Phase C（Atoms）**: #1〜#28 全 Atoms の Figma 情報を `docs/figma-parts/{nodeId}.json` に保存完了
✅ **Phase C.5**: Atoms の Vue.js コンポーネント構成をユーザーと相談・確定完了
🔄 **Phase D（Atoms）**: A-1〜A-17・A-21 完了。A-7b（Tooltip-top）は既存 placement prop で対応済みと確認。残りは A-18〜A-20（外部アセット依存）のみ
⬜ **Phase C（Molecules）**: Atoms Phase D 完了後に開始
⬜ **Phase D（Molecules）**: Molecules Phase C 完了後に開始
⬜ **Phase C・D（Organisms）**: Molecules 完了後

### 全体フローの方針（2026-05-21 更新）

- Atoms Phase D 残件：A-18〜A-20（AppLogo/AppLeftMenuIcon/AppContact）のみ。外部アセット準備セッションが先決
- Molecules は Atoms Phase D 完了後：Phase C → Phase D
- Organisms はさらに後続（O-1〜O-4 登録済み）

### Figma typo 一覧（Vue 実装時は正しい名称に読み替える）

- Checkbox の state 名: 'Selectd' → 正: 'Selected'
- Badge/SubStatus の state 名: 'Editting' → 正: 'Editing'
- PagerNubmer のコンポーネント名: 'PagerNubmer' → 正: 'PagerNumber'
- PagerNubmer の state 名: 'Acutive' → 正: 'Active'
- Snackbar の type 名: 'info' → 実装時は 'info'（小文字のまま）、他は 'success'/'warning'/'error'（小文字統一）

### 申し送り事項

- **進捗更新（必須）**: `/session-wrapup` 時は CLAUDE.md「次の作業」・`docs/session-plan.md` のコンポーネント一覧テーブル（Phase D 列）・Phase D タスクリスト・memory の4点をセットで更新する
- **詳細な実装ノート**: `docs/session-plan.md` の「Phase D 実施メモ」参照（Vite base 設定・テストパターン・CSS 注意点など）
- **デモページ更新予定**: `docs/session-plan.md` の「デモページ更新予定タスク」参照（Molecule 実装後の置き換え作業一覧）
- **画像アセット準備**: AppLogo / AppLeftMenuIcon / AppContact の実装前に別セッションでアセット準備が必要
- **A-7b 完了（2026-05-21）**: Tooltip-top（2615:90220）の figma-parts JSON 作成。AppTooltip.vue の既存 `placement='top'` が対応済みと確認（コード変更なし）。
- **A-21 完了（2026-05-21）**: AppSnackbar.vue 6 点セット実装。4 type（success/info/warning/error）対応。テスト 30 件 PASS。
- **vue-i18n 導入済み（2026-05-21）**: `AppPasswordStrength.vue`（A-16）実装に伴い vue-i18n v11 を導入。Storybook への適用は `globalThis.PLUGINS_SETUP_FUNCTIONS` 操作で実現（`setup` export 方式や `@storybook/vue3-vite` インポートは動作不可）。テストは `createI18n` を `{ global: { plugins: [i18n] } }` で mount に渡す。

詳細な全体計画 → `docs/session-plan.md`
