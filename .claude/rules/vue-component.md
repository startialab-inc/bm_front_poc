---
description: Vue SFC コンポーネント実装規約
paths:
  - src/components/**/*.vue
  - src/pages/**/*.vue
---

## Vue SFC 実装規約

### スクリプト
- `<script setup lang="ts">` を必ず使用する
- v-model は `defineModel()` マクロで実装する（Vue 3.4+）

### 命名規則
- Atom コンポーネントのファイル名には `Base` プレフィックスを付ける
  - 例: `BaseButton.vue`、`BaseCheckbox.vue`、`BaseToggle.vue`
- Molecule・Organism・Page は機能名をそのまま使う

### スタイリング
- スタイルは Tailwind ユーティリティクラスを使用する（`<style>` ブロックは使わない）
- デザイントークン変数（`bg-brand`、`text-primary` 等）を優先し、変数がない場合は任意値（`bg-[#FF6464]`）を使う
- デザイントークンの一覧は `docs/design-tokens.md` を参照

### アイコン
<!-- TODO: プロジェクト固有のアイコンフォントがある場合はここに記述してください -->
<!-- 例: プロジェクト独自フォントの使い方・クラス名の確認方法・サイズ指定の注意点 -->
- **FontAwesome の使い方**: `<i class="fa-solid fa-...">` をテンプレート内に直接記述する
- **アイコンが見つからない場合**: 実装を進める前にユーザーに通知し、代替手段（別アイコン・テキスト等）を確認する
- **文字コードの確認**: アイコンの文字コードは Figma `get_screenshot` で目視確認する
  （MCP のテキスト出力ではアイコンが脱落するため）

### コメント
- コメントは日本語で記述する
- 変数名・関数名は英語の説明的な命名にする

### Figma との対応
- コンポーネントは Figma のノード構造に対応した HTML 要素で構成する
- コンポーネントの粒度はセッション開始時に Figma MCP でデザインデータを取得してから決定する

### デモページ
- コンポーネントを実装したら、必ず対応するデモページを `src/pages/dev/{ComponentName}Demo.vue` に作成する
- デモページには全 variant・全 size・全状態（disabled / current 等）を網羅する
- 作成後、`src/pages/dev/DevIndex.vue` の該当エントリを `done: true` に更新する
- ルーターにデモページのルートを追加する（`/dev/{component-kebab-case}` の形式）

### Phase D の1コンポーネント実装セット

Phase D（Vue SFC 実装フェーズ）では、1コンポーネントにつき以下の6点を必ずセットで実施する：

1. **Vue SFC**（`src/components/{layer}/{ComponentName}.vue`）
2. **Storybook Story**（`src/components/{layer}/{ComponentName}.stories.ts`）
3. **Vue Test Utils テスト**（`src/components/{layer}/{ComponentName}.spec.ts`）
   - `docs/testing.md` のチェックリストで必要なテストを洗い出す
   - レンダリング・props・emits（必要時）・slots（必要時）・v-model（必要時）を網羅する
   - 実行して全件 PASS を確認する
4. **デモページ**（`src/pages/dev/{ComponentName}Demo.vue`）
   - 全 variant・全 size・全状態（disabled 等）を網羅する
   - インタラクティブデモ（variant/size/disabled 等を動的切り替え）を末尾に追加する
5. **DevIndex 更新**（`src/pages/dev/DevIndex.vue` の該当エントリを `done: true` に）
6. **Router 追加**（`src/router/index.ts` に `/dev/{component-kebab-case}` ルートを追加）

この6点が揃って初めて1コンポーネントの実装完了とする。
