# デザイントークン

Figma ファイル（`VpMboz99gE6SKsEeHGcjmP`）から抽出したデザイントークン一覧。
Figma 変数コレクション3種類を収録: Primitive Color / Tailwind CSS / Semantic Color

---

## 色（Color）

### Primitive Color — brand/blue monkey パレット

| トークン名 | 値 | 用途メモ |
|-----------|-----|---------|
| brand/blue monkey/50 | `#ddeaff` | 背景・ホバー（薄い）|
| brand/blue monkey/100 | `#b7cbee` | |
| brand/blue monkey/200 | `#94b1e5` | |
| brand/blue monkey/300 | `#7096dc` | |
| brand/blue monkey/400 | `#4c7cd4` | |
| brand/blue monkey/500 | `#2862cb` | ブランドカラー（メインボタン等） |
| brand/blue monkey/600 | `#2152aa` | |
| brand/blue monkey/700 | `#1b4187` | サイドバー、エディターbg |
| brand/blue monkey/800 | `#143166` | アイコン primary、ボタン secondary |
| brand/blue monkey/900 | `#0d2144` | テキスト primary |

### Semantic Color — セマンティックカラー

#### Iconitify（アイコン色）

| CSS 変数 | 値 | 参照 |
|---------|-----|------|
| `--iconitify/ic-primary` | `#143166` | brand/blue monkey/800 |
| `--iconitify/ic-secondary` | `#64748b` | slate/500 |
| `--iconitify/ic-tertiary` | `#ffffff` | base/white |
| `--iconitify/ic-disable` | `#cbd5e1` | slate/300 |
| `--iconitify/ic-notice` | `#dc2626` | red/600 |

#### Text（テキスト色）

| CSS 変数 | 値 | 参照 |
|---------|-----|------|
| `--text/text-primary` | `#0d2144` | brand/blue monkey/900 |
| `--text/text-secondary` | `#64748b` | slate/500 |
| `--text/text-tertiary` | `#ffffff` | base/white |
| `--text/text-brand` | `#2862cb` | brand/blue monkey/500 |
| `--text/text-disable` | `#cbd5e1` | slate/300 |
| `--text/text-notice` | `#dc2626` | red/600 |

#### Divider（区切り線色）

| CSS 変数 | 値 | 参照 |
|---------|-----|------|
| `--divider/divider-primary` | `#e5e5e5` | neutral/200 |
| `--divider/divider-secondary` | `#a3a3a3` | neutral/400 |
| `--divider/divider-tertiary` | `#ffffff` | base/white |
| `--divider/divider-brand` | `#2862cb` | brand/blue monkey/500 |
| `--divider/divider-disable` | `#cbd5e1` | slate/300 |
| `--divider/divider-editor` | `#ea580c` | orange/600 |

#### Background — Surface（背景色）

| CSS 変数 | 値 | 参照 |
|---------|-----|------|
| `--background/surface/bg-sf-primary` | `#ffffff` | base/white |
| `--background/surface/bg-sf-selected` | `#eff6ff` | blue/50 |
| `--background/surface/bg-sf-secondary` | `#f8fafc` | slate/50 |
| `--background/surface/bg-sf-tertiary` | `#e2e8f0` | slate/200 |
| `--background/surface/bg-sf-editor` | `#1b4187` | brand/blue monkey/700 |

#### Background — Button（ボタン背景色）

| CSS 変数 | 値 | 参照 |
|---------|-----|------|
| `--background/button/bg-btn-primary` | `#2862cb` | brand/blue monkey/500 |
| `--background/button/bg-btn-secondary` | `#143166` | brand/blue monkey/800 |
| `--background/button/bg-btn-submit` | `#ea580c` | orange/600 |
| `--background/button/bg-btn-destructive` | `#dc2626` | red/600 |
| `--background/button/bg-btn-disable` | `#d1d5db` | gray/300 |

#### Background — Notice / Caution / Success / Safe

| CSS 変数 | 値 | 参照 |
|---------|-----|------|
| `--background/notice/bg-notice-light` | `#fef2f2` | red/50 |
| `--background/notice/bg-notice-dark` | `#f87171` | red/400 |
| `--background/notice/bg-notice-foreground` | `#dc2626` | red/600 |
| `--background/caution/bg-caution-light` | `#fff7ed` | orange/50 |
| `--background/caution/bg-caution-dark` | `#fb923c` | orange/400 |
| `--background/caution/bg-caution-foreground` | `#ea580c` | orange/600 |
| `--background/success/bg-success-light` | `#ecfdf5` | emerald/50 |
| `--background/success/bg-success-dark` | `#34d399` | emerald/400 |
| `--background/success/bg-success-foreground` | `#059669` | emerald/600 |
| `--background/safe/bg-safe-light` | `#f0f9ff` | sky/50 |
| `--background/safe/bg-safe-dark` | `#38bdf8` | sky/400 |
| `--background/safe/bg-safe-foreground` | `#0ea5e9` | sky/500 |

#### Sidebar（サイドバー色）

| CSS 変数 | 値 | 参照 |
|---------|-----|------|
| `--sidebar/sidebar-primary` | `#ffffff` | base/white |
| `--sidebar/sidebar-secondary` | `#2862cb` | brand/blue monkey/500 |
| `--sidebar/sidebar-tertiary` | `#1b4187` | brand/blue monkey/700 |

### ステータス種別色（Status Type Colors）

`info / success / warning / danger` の4種類。`AppProgressBar`・`AppSidebarMenuItem` の通知バッジなど、ステータスを色で表現するコンポーネント共通の配色。

| 種別 | Tailwind クラス | 色 |
|------|----------------|-----|
| `info` | `bg-cyan-500` | `#06b6d4` |
| `success` | `bg-green-500` | `#22c55e` |
| `warning` | `bg-yellow-500` | `#eab308` |
| `danger` | `bg-red-500` | `#ef4444` |

### Tailwind CSS — 基本色（参考）

| 変数名 | 値 |
|--------|-----|
| tailwind colors/base/white | `#ffffff` |
| tailwind colors/base/transparent | `rgba(255,255,255,0)` |
| tailwind colors/slate/50 | `#f8fafc` |
| tailwind colors/slate/200 | `#e2e8f0` |
| tailwind colors/slate/300 | `#cbd5e1` |
| tailwind colors/slate/500 | `#64748b` |
| tailwind colors/gray/300 | `#d1d5db` |
| tailwind colors/neutral/200 | `#e5e5e5` |
| tailwind colors/neutral/400 | `#a3a3a3` |
| tailwind colors/blue/50 | `#eff6ff` |
| tailwind colors/red/50 | `#fef2f2` |
| tailwind colors/red/400 | `#f87171` |
| tailwind colors/red/600 | `#dc2626` |
| tailwind colors/orange/50 | `#fff7ed` |
| tailwind colors/orange/400 | `#fb923c` |
| tailwind colors/orange/600 | `#ea580c` |
| tailwind colors/emerald/50 | `#ecfdf5` |
| tailwind colors/emerald/400 | `#34d399` |
| tailwind colors/emerald/600 | `#059669` |
| tailwind colors/sky/50 | `#f0f9ff` |
| tailwind colors/sky/400 | `#38bdf8` |
| tailwind colors/sky/500 | `#0ea5e9` |

---

## 間隔（Spacing）

Tailwind CSS 準拠の spacing トークン（GAP スコープ）。

| トークン名 | 値（px） | Tailwind クラス相当 |
|-----------|--------|-------------------|
| spacing/0 | 0 | `gap-0` |
| spacing/px | 1 | `gap-px` |
| spacing/0-5 | 2 | `gap-0.5` |
| spacing/1 | 4 | `gap-1` |
| spacing/1-5 | 6 | `gap-1.5` |
| spacing/2 | 8 | `gap-2` |
| spacing/2-5 | 10 | `gap-2.5` |
| spacing/3 | 12 | `gap-3` |
| spacing/3-5 | 14 | `gap-3.5` |
| spacing/4 | 16 | `gap-4` |
| spacing/5 | 20 | `gap-5` |
| spacing/6 | 24 | `gap-6` |
| spacing/7 | 28 | `gap-7` |
| spacing/8 | 32 | `gap-8` |
| spacing/9 | 36 | `gap-9` |
| spacing/10 | 40 | `gap-10` |
| spacing/11 | 44 | `gap-11` |
| spacing/12 | 48 | `gap-12` |
| spacing/14 | 56 | `gap-14` |
| spacing/16 | 64 | `gap-16` |

---

## 高さ（Height）

| トークン名 | 値（px） | Tailwind クラス相当 |
|-----------|--------|-------------------|
| height/h-1 | 4 | `h-1` |
| height/h-2 | 8 | `h-2` |
| height/h-3 | 12 | `h-3` |
| height/h-4 | 16 | `h-4` |
| height/h-5 | 20 | `h-5` |
| height/h-6 | 24 | `h-6` |
| height/h-7 | 28 | `h-7` |
| height/h-8 | **32** | `h-8` ← Button/text の高さ |
| height/h-9 | 36 | `h-9` |
| height/h-10 | 40 | `h-10` |
| height/h-11 | 44 | `h-11` |
| height/h-12 | 48 | `h-12` |
| height/h-14 | 56 | `h-14` |
| height/h-16 | 64 | `h-16` |

---

## タイポグラフィ（Typography）

Button/text コンポーネント（`520:14190`）の get_design_context から抽出。

| スタイル名 | フォントファミリー | サイズ | ウェイト | 行高 |
|-----------|---------------|-------|--------|-----|
| text-sm/leading-none/regular | Noto Sans JP | `--text/sm/font-size` (14px) | Regular (400) | 1 (none) |
| text-sm/leading-none/bold | Noto Sans JP | `--text/sm/font-size` (14px) | Bold (700) | 1 (none) |

> 補足: アイコンは FontAwesome 7 Free (Solid) を CDN 経由で使用。`font-["Font_Awesome_7_Free:Solid",sans-serif]` / `text-[15px]`

---

## 角丸（Border Radius）

| CSS 変数 | 値 | Tailwind クラス相当 |
|---------|-----|-------------------|
| `--border-radius/rounded-md` | 8px | `rounded-md` |

---

## Tailwind CSS v4 `@theme` 設定案

```css
/* src/assets/main.css の @theme ブロックに追記する案 */
@theme {
  /* Brand Colors */
  --color-brand-50: #ddeaff;
  --color-brand-100: #b7cbee;
  --color-brand-200: #94b1e5;
  --color-brand-300: #7096dc;
  --color-brand-400: #4c7cd4;
  --color-brand-500: #2862cb;
  --color-brand-600: #2152aa;
  --color-brand-700: #1b4187;
  --color-brand-800: #143166;
  --color-brand-900: #0d2144;

  /* Semantic: Text */
  --color-text-primary: #0d2144;
  --color-text-secondary: #64748b;
  --color-text-brand: #2862cb;
  --color-text-disable: #cbd5e1;
  --color-text-notice: #dc2626;

  /* Semantic: Icon */
  --color-icon-primary: #143166;
  --color-icon-secondary: #64748b;
  --color-icon-disable: #cbd5e1;
  --color-icon-notice: #dc2626;

  /* Semantic: Button Background */
  --color-btn-primary: #2862cb;
  --color-btn-secondary: #143166;
  --color-btn-submit: #ea580c;
  --color-btn-destructive: #dc2626;
  --color-btn-disable: #d1d5db;

  /* Semantic: Surface Background */
  --color-surface-primary: #ffffff;
  --color-surface-selected: #eff6ff;
  --color-surface-secondary: #f8fafc;
  --color-surface-tertiary: #e2e8f0;

  /* Semantic: Status */
  --color-notice-light: #fef2f2;
  --color-notice-dark: #f87171;
  --color-notice-fg: #dc2626;
  --color-caution-light: #fff7ed;
  --color-caution-dark: #fb923c;
  --color-caution-fg: #ea580c;
  --color-success-light: #ecfdf5;
  --color-success-dark: #34d399;
  --color-success-fg: #059669;
  --color-safe-light: #f0f9ff;
  --color-safe-dark: #38bdf8;
  --color-safe-fg: #0ea5e9;
}
```

> 注意: 実際に `@theme` ブロックに追記する前にユーザーと相談して確定すること（Phase C.5）。

---

---

## アニメーション（Animation）

UI インタラクション全体でアニメーション速度を統一するためのトークン。

| トークン名 | 値 | 用途 |
|---|---|---|
| `duration-interaction` | **200ms** | ボタン・スイッチ・アイコンなど、即時フィードバックが求められるインタラクション |
| `duration-expand` | **300ms** | パネル・メニューの展開/閉じ込みなど、高さ変化を伴う動き |
| `easing-standard` | **ease-in-out** | 全アニメーションの標準イージング |

### コンポーネント別の適用先

| コンポーネント | アニメーション種別 | 使用トークン |
|---|---|---|
| AppSwitch | 背景色・つまみ位置遷移（`transition-colors`, `transition-[left]`） | `duration-interaction` (200ms) + `ease-in-out` |
| AppSidebarMenuItem | chevron アイコン回転 | `duration-interaction` (200ms) + `ease-in-out` |
| AppSidebarMenuItem | sub-menu スライドダウン/アップ | `duration-expand` (300ms) + `ease-in-out` |

---

最終更新: 2026-06-08
