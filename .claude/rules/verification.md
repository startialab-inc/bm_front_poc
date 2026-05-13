---
description: DOM/スタイル検証規約（コンポーネント実装後の検証手順）
paths:
  - src/**/*.vue
---

## DOM/スタイル検証規約

### 検証方針

**主検証**: `getComputedStyle` による数値照合（必須）  
**補助確認**: `browser_take_screenshot` による目視確認（任意・推奨）

スタイル値の数値照合を主とし、スクリーンショットで「矢印が見えているか」「レイアウトが崩れていないか」等、数値では検知しにくい表示上の問題を補助的に確認する。

### 検証手順

1. `npm run dev` で開発サーバーを起動（http://localhost:8300）
2. `browser_evaluate` で `window.getComputedStyle()` と `offsetWidth/offsetHeight` を取得する
3. `docs/figma-parts/*.json` の設計値と**数値で**比較する
4. `browser_take_screenshot` でスクリーンショットを撮影し、目視で表示上の問題がないか確認する

**「表示されている」「見た目が近い」は確認ではない。**
Figma JSON に記載された各数値（サイズ・色・余白・フォントサイズ等）を `getComputedStyle` の返り値と照合して初めて検証完了とする。スクリーンショットはあくまで補助であり、数値照合の代替にはならない。

### 比較する CSS プロパティ

| カテゴリ | プロパティ | 期待値の取得元 |
|---|---|---|
| 色 | background-color, color, border-color | Figma JSON の fills / strokes |
| サイズ | font-size, width, height | Figma JSON の fontSize / absoluteBoundingBox |
| 余白 | padding, margin, gap | Figma JSON の padding / itemSpacing |
| 形状 | border-radius | Figma JSON の cornerRadius |
| フォント | font-family, font-weight, line-height | Figma JSON の style |

### Playwright の使い方

- `browser_evaluate` で `getComputedStyle` による数値照合（主検証）
- `browser_snapshot`（アクセシビリティツリー）で DOM 構造確認
- `browser_take_screenshot` で目視確認（補助）

### 検証結果の保存

- 保存先: `docs/review/{component-name}-review.md`
- フォーマット: `docs/review/REVIEW_FORMAT.md` を参照（Phase 5 で作成予定）
