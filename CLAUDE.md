# bm_front_poc

Figma コンポーネント定義（`docs/figma-parts/*.json`）を元に Vue 3 SFC を生成し、
DOM 構造と計算済みスタイル値の比較で Figma との再現精度を計測する PoC プロジェクト。

## 技術スタック

- **ランタイム**: Node.js v24.15.0（`.node-version` で管理、`fnm` 推奨）+ TypeScript
- **フロントエンド**: Vue 3 (Composition API) + Tailwind CSS v4
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
🔄 **Phase D（Atoms）**: Vue SFC + Storybook Story + テスト を実装中（A-1・A-2・A-3・A-4・A-5 完了、A-6 着手前）
⬜ **Phase C（Molecules）**: Atoms Phase D 完了後に開始
⬜ **Phase D（Molecules）**: Molecules Phase C 完了後に開始
⬜ **Phase C・D（Organisms）**: Molecules 完了後

### 全体フローの方針（2026-04-27 更新）

- Atoms を優先：Phase C（Atoms）→ Phase C.5 ✅ → Phase D（Atoms）🔄（A-1〜A-5 完了、A-6 着手前）
- Molecules は Atoms Phase D 完了後：Phase C → Phase D
- Organisms はさらに後続（AppSidebar.vue を O-1 として追加済み）

### Figma typo 一覧（Vue 実装時は正しい名称に読み替える）

- Checkbox の state 名: 'Selectd' → 正: 'Selected'
- Badge/SubStatus の state 名: 'Editting' → 正: 'Editing'
- PagerNubmer のコンポーネント名: 'PagerNubmer' → 正: 'PagerNumber'
- PagerNubmer の state 名: 'Acutive' → 正: 'Active'

### 申し送り事項（2026-05-13）

- **進捗更新のルール（必須）**: `/session-wrapup` 時に CLAUDE.md の「次の作業」を更新する際は、`docs/session-plan.md` の**コンポーネント一覧テーブル**（Phase D 列）と **Phase D タスクリスト**の両方を必ずセットで更新する
- **次のタスク**: A-6 `AppSwitch.vue` の実装（Figma node-id: 849:2931）
  - 6点セット：Vue SFC + Story + Spec + Demo + DevIndex 更新 + Router 追加
  - `docs/figma-parts/849-2931.json` が存在するか確認し、なければ Phase C から開始する
- **A-5 完了済み（2026-05-13）**:
  - `AppTag.vue`（Vue SFC）・`AppTag.stories.ts`・`AppTag.spec.ts`（9件 PASS）
  - `AppTagDemo.vue`・`DevIndex.vue` 更新（done: true）・`router/index.ts` ルート追加
  - `getComputedStyle()` 検証済み（全 12 項目 Figma 一致）
- **A-5 実装仕様**: `deletable` prop で Deleteable（削除ボタンあり）/ Undelete（ボーダーあり）を切り替え。削除時は `delete` emit。
- **Story ファイルの必須事項**: `parameters.docs.description.component` を必ず記述する（`docs/storybook.md` 参照）
- **1コンポーネント実装セット（6点）**: Vue SFC + Story + テスト（spec.ts）+ デモページ + DevIndex 更新 + Router 追加（`.claude/rules/vue-component.md` / `docs/testing.md` 参照）
- **ファイル命名規則**: `docs/figma-parts/` は全てハイフン区切り（`619-13664.json`）に統一済み
- **画像アセット**: AppLogo / AppLeftMenuIcon / AppContact の Phase D 実装前にアセット準備セッションが必要（詳細は memory 参照）
- **コンポーネント構成**: `docs/session-plan.md` の Phase C.5 セクション参照
- **Figma typo**: 上記一覧の通り（JSON の `figmaStateName` / `figmaNameNote` に記録済み）

詳細な全体計画 → `docs/session-plan.md`
