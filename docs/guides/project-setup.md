# プロジェクト初期化手順

Vite + Vue 3 + TypeScript + Tailwind CSS v4 + pnpm + Storybook を組み合わせた
コンポーネント開発 PoC プロジェクトの初期化手順書。

> **このプロジェクトでの設定例** として bm_front_poc の値を随所に記載している。
> 別プロジェクトに適用する場合は `{YOUR_*}` と表記した箇所を置き換えること。

---

## Step 1: Vite + Vue 3 + TypeScript プロジェクト作成

```bash
pnpm create vite@latest {YOUR_PROJECT_NAME} --template vue-ts
cd {YOUR_PROJECT_NAME}
```

> このプロジェクトの例: `pnpm create vite@latest bm_front_poc --template vue-ts`

---

## Step 2: pnpm 設定

### 2-1. `.npmrc` を作成する

```ini
use-node-version=24.15.0   # Node.js バージョンを固定（fnm が自動切り替え）
```

> Node.js バージョンは `.node-version` または `.nvmrc` でも管理できる。
> `use-node-version` は fnm 固有の設定。

### 2-2. `package.json` に `packageManager` フィールドを追加する

```json
{
  "packageManager": "pnpm@10.33.0"
}
```

### 2-3. 依存関係をインストールする

```bash
pnpm install
```

---

## Step 3: Tailwind CSS v4 統合

```bash
pnpm add -D tailwindcss@4 @tailwindcss/vite
```

`vite.config.ts` にプラグインを追加:

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

`src/assets/main.css` を作成:

```css
@import "tailwindcss";

/* デザイントークン（CSS カスタムプロパティ） */
@theme {
  --color-brand: oklch(/* ... */);
  /* ... */
}
```

`src/main.ts` で `main.css` をインポート:

```ts
import './assets/main.css'
```

---

## Step 4: vite.config.ts 設定

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    port: 8300,   // {YOUR_PORT}
  },
  base: '/',     // GitHub Pages 等にデプロイする場合はリポジトリ名を指定
})
```

> このプロジェクトでは `base: '/bm_front_poc/'` のような設定になっている場合、
> アセットパスは `/assets/...` ではなく `import.meta.env.BASE_URL + 'assets/...'` を使うこと。

---

## Step 5: Vitest 設定

```bash
pnpm add -D vitest @vue/test-utils happy-dom @vitest/coverage-v8
```

`vitest.config.ts` を作成（**重要**: `server` / `preview` 設定を除外する）:

```ts
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

// server/preview 設定を除外しないとポート競合でテストが失敗する
const { server: _server, preview: _preview, ...restViteConfig } = viteConfig

export default mergeConfig(restViteConfig, defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
  },
}))
```

`package.json` に scripts を追加:

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

---

## Step 6: Storybook 設定

```bash
pnpm dlx storybook@latest init
```

インタラクティブな質問には以下を選択:
- フレームワーク: `Vue 3 (Vite)`
- アドオン: `Essentials`（デフォルト）

`.storybook/preview.ts` に Tailwind CSS を読み込む:

```ts
import '../src/assets/main.css'
import type { Preview } from '@storybook/vue3-vite'

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i } },
  },
}
export default preview
```

`package.json` に scripts を追加:

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

---

## Step 7: vue-i18n 導入（多言語対応が必要な場合のみ）

```bash
pnpm add vue-i18n@11
```

`src/locales/ja.ts` を作成してメッセージを定義:

```ts
export default {
  passwordStrength: { weak: '弱い', medium: '普通', strong: '強い' },
}
```

`src/main.ts` で設定:

```ts
import { createI18n } from 'vue-i18n'
import ja from './locales/ja'

const i18n = createI18n({ legacy: false, locale: 'ja', messages: { ja } })
app.use(i18n)
```

Storybook でも使用する場合は `.storybook/preview.ts` でプラグインを登録する（`setup` export は非推奨）:

```ts
// globalThis.PLUGINS_SETUP_FUNCTIONS を操作して登録する方法が確実
```

---

## Step 8: Vue Router 設定

```bash
pnpm add vue-router@4
```

`src/router/index.ts` を作成（Hash モード推奨）:

```ts
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('../pages/Home.vue') },
    // デモページ
    { path: '/dev', component: () => import('../pages/dev/DevIndex.vue') },
  ],
})
export default router
```

---

## Step 9: FontAwesome CDN 設定

アイコンを CDN 経由で使用する場合、`index.html` の `<head>` に追加:

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.x.x/css/all.min.css"
/>
```

使用方法（Vue テンプレート内）:

```html
<i class="fa-solid fa-check"></i>
```

---

## Step 10: Claude Code 設定

### 10-1. `.claude/rules/` ルールファイルを作成する

ファイル編集時に自動注入されるコーディング規約:

| ファイル | 適用対象 |
|---------|---------|
| `vue-component.md` | `src/**/*.vue` |
| `testing.md` | `src/**/*.spec.ts` |
| `verification.md` | `src/**/*.vue` |
| `documentation-policy.md` | 全ファイル |

ルールファイルのフォーマット:

```markdown
---
description: ルールの説明
paths:
  - src/components/**/*.vue
---

（ルール本文）
```

### 10-2. `.claude/commands/` スキルをコピーする

このプロジェクトの `.claude/commands/` から必要なスキルファイルをコピーして、
`.claude/workflow-config.md` を新プロジェクト用に書き換える。

### 10-3. `.claude/settings.json` を設定する

許可する Bash コマンドを設定する:

```json
{
  "permissions": {
    "allow": [
      "Bash(pnpm:*)",
      "Bash(rtk git:*)",
      "mcp__playwright__browser_*",
      "mcp__figma__*"
    ]
  }
}
```

---

## チェックリスト

- [ ] `pnpm dev`（http://localhost:{YOUR_PORT}）でブラウザが表示される
- [ ] `pnpm test:run` でテストが実行される（初期状態は 0 件で OK）
- [ ] `pnpm storybook`（http://localhost:6006）で Storybook が表示される
- [ ] `pnpm build` でビルドエラーが出ない
- [ ] Claude Code から `mcp__figma__whoami` が実行できる
