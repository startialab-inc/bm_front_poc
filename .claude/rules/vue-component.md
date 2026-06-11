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

### Atomic Design 階層構造

#### 階層定義と配置先

| 層 | ディレクトリ | 役割 |
|---|---|---|
| Atoms | `src/components/atoms/` | UI の最小単位。単体で意味を持つ基本要素（ボタン・入力欄・ラベル等） |
| Molecules | `src/components/molecules/` | Atoms を組み合わせた、1つの機能単位を持つ部品 |
| Organisms | `src/components/organisms/` | Molecules・Atoms を組み合わせた、画面の区画を構成する複合部品 |
| Pages | `src/pages/` | Organisms・Molecules を組み合わせた実際の画面 |

#### 依存方向のルール（最重要）

```
Pages → Organisms → Molecules → Atoms
```

- **上位層は下位層を import してよい**（例: Molecules → Atoms ✅）
- **下位層が上位層を import してはいけない**（例: Atoms → Molecules ❌）
- **下位層から上位層の import は禁止**（例: Atoms → Molecules ❌）
- **同一層間の import は原則禁止**（例: Molecules → Molecules ❌）
  - 例外1: 汎用 Base コンポーネントを同一 Atoms 層の別 Atom が使うケース（`BaseControlLabel` 等）は許容する
  - 例外2: 既に実装済みの Molecule を別の Molecule 内で使うケースは許容する。ただし循環参照（A → B → A）は禁止。
    実装前に `mcp__storybook__get_documentation` で対象 Molecule の仕様を確認すること

#### 実装時の注意点

- **Molecules 実装時**: 既存 Atoms で代替できる部分は必ず Atoms を再利用する。同等の HTML を直書きしない。
  実装前に `mcp__storybook__get_documentation` で使用予定の Atom の props・slots・型定義を確認すること
- **Organisms 実装時**: 既存 Molecules・Atoms を優先して再利用する。
  実装前に `mcp__storybook__list_all_documentation` で利用可能なコンポーネント一覧を確認し、`mcp__storybook__get_documentation` で個別の仕様を把握すること
- **新 Atom を切り出すタイミング**: Molecule/Organism 内で「他でも再利用できそうな最小単位」が見えた場合は Atom として切り出す

### スタイリング
- スタイルは Tailwind ユーティリティクラスを使用する（`<style>` ブロックは使わない）
- デザイントークン変数（`bg-brand`、`text-primary` 等）を優先し、変数がない場合は任意値（`bg-[#FF6464]`）を使う
- デザイントークンの一覧は `DESIGN.md` を参照

#### `position: absolute` の位置計算
`position: absolute` の子要素の `left` / `right` / `top` / `bottom` は、**最近傍の `position: relative` 祖先要素の padding box 内端（border の内側）** を基準とする。親の `padding` の値は absolute 子要素の座標原点に影響しない。

```
┌─── border ───────────────────────────────┐
│  padding │     content area     │ padding  │
│          ↑ left: 0 はここが原点（padding box 内端）
└──────────────────────────────────────────┘
```

計算例（幅 36px・border-2・padding なし・子 16px のスイッチ）：
- 内側幅 = 36 − 2 × 2 = 32px
- 子を左端に: `left: 0`
- 子を右端に: `left: 32 − 16 = 16px`（right: 0 でも同じ）

**誤り**: 「Figma の padding: 2px → left: 2px にする」（padding は absolute 子の座標には影響しない）

### アイコン
<!-- TODO: プロジェクト固有のアイコンフォントがある場合はここに記述してください -->
<!-- 例: プロジェクト独自フォントの使い方・クラス名の確認方法・サイズ指定の注意点 -->
- **FontAwesome の使い方**: `<i class="fa-solid fa-...">` をテンプレート内に直接記述する
- **アイコンが見つからない場合**: 実装を進める前にユーザーに通知し、代替手段（別アイコン・テキスト等）を確認する
- **文字コードの確認**: アイコンの文字コードは Figma `get_screenshot` で目視確認する
  （MCP のテキスト出力ではアイコンが脱落するため）

### 多言語対応（i18n）
- コンポーネント内で使用する**固定テキストは必ず `useI18n()` の `t()` 関数を使う**（テンプレートへの直書き禁止）
  - ❌ `<span>入力タイプ</span>`
  - ✅ `<span>{{ t('components.MyComponent.labelTitle') }}</span>`
  - ❌ `placeholder="例: 2024-01-01"`
  - ✅ `:placeholder="t('components.MyComponent.placeholder')"`
- メッセージは `src/locales/ja.ts` の `components.{ComponentName}` 以下に追加する
  ```typescript
  // src/locales/ja.ts
  components: {
    MyComponent: {
      labelTitle: 'ラベル',
    }
  }
  ```
- テストでは `createI18n` を `global: { plugins: [i18n] }` に渡してマウントする
  ```typescript
  const i18n = createI18n({ legacy: false, locale: 'ja', messages: { ja } })
  mount(MyComponent, { global: { plugins: [i18n] } })
  ```

### コメント
- コメントは日本語で記述する
- 変数名・関数名は英語の説明的な命名にする
- **テンプレート内の HTML コメント（`<!-- ... -->`）はルート直下に置かない**
  Vue 3 はルート直下のコメントノードを独立したノードとして扱うため、コメント + 要素の組み合わせがフラグメント（複数ルートノード）と解釈される。
  その結果 `wrapper.element.tagName` や `wrapper.classes()` が正しく動作しなくなる。
  実装の意図を残したいときは `<script>` ブロック内の JS コメントに記述すること。

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
