# ディレクトリ構造

```
src/
  components/
    atoms/      ← Base プレフィックスのコンポーネント
    molecules/  ← Molecules
    organisms/  ← Organisms
    layouts/    ← AppHeader.vue / AppSidebar.vue
  pages/
    dev/        ← コンポーネントデモページ（DevIndex.vue + {Name}Demo.vue）
    {target-page}/ ← 実装対象ページ（TODO: プロジェクト固有のページ名に変更）
  assets/
    main.css          ← Tailwind + デザイントークン（@theme）
  vite-env.d.ts     ← Vue SFC 型宣言（.vue モジュール解決）
docs/
  figma-parts/      ← UIパーツ解析 JSON
  session-plan.md   ← 実装計画・進捗状況テーブル
  design-tokens.md  ← デザイントークン一覧
  architecture.md   ← アーキテクチャ・MCP・接続情報
  DOCUMENT_RULES.md ← 文書分類ルール
.claude/rules/
  vue-component.md  ← Vue SFC 実装規約 + デモページ規約（paths 連動）
  verification.md   ← DOM/スタイル検証規約（paths 連動）
  testing.md        ← テスト記述規約（paths 連動）
```
