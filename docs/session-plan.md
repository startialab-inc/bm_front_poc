# コンポーネント実装計画

Figma Component ページ（`308:6190`）の全コンポーネントを対象に、
Phase C（Figma情報収集）→ Phase D（Vue SFC 実装）をボトムアップで進める。

## コンポーネント一覧・実装状況

凡例: Phase C = Figma詳細収集 / Phase D = Vue SFC 実装
⬜ 未着手 / 🔄 作業中 / ✅ 完了

### Atoms

| # | node-id | パーツ名 | Phase C | Phase D |
|---|---------|----------|---------|---------|
| 1 | 520:14190 | Button/text | ✅ | ✅ AppButton.vue（A-1）|
| 2 | 523:14502 | Button/Primary | ✅ | ✅ AppButton.vue（A-1）|
| 3 | 523:14538 | Button/Submit | ✅ | ✅ AppButton.vue（A-1）|
| 4 | 523:14567 | Button/Destructive | ✅ | ✅ AppButton.vue（A-1）|
| 5 | 523:14596 | Button/Secondary | ✅ | ✅ AppButton.vue（A-1）|
| 6 | 632:8058 | Button/Icon | ✅ | ✅ AppButtonIcon.vue（A-2）|
| 7 | 910:42970 | Button/Sort ※node-id入替 | ✅ | ✅ AppButton.vue（A-1）|
| 8 | 910:42969 | Button/Filter ※node-id入替 | ✅ | ✅ AppButton.vue（A-1）|
| 9 | 911:50285 | Tag | ✅ | ✅ AppTag.vue（A-5）|
| 10 | 849:2931 | Switch | ✅ | ✅ AppSwitch.vue（A-6）|
| 11 | 917:52673 | RadioButton/Text | ✅ | → Molecule（M-1 AppRadioButton.vue）|
| 12 | 917:53007 | RadioButton/Box | ✅ | → Molecule（M-1 AppRadioButton.vue）|
| 13 | 917:53263 | Checkbox | ✅ | → Molecule（M-2 AppCheckbox.vue）|
| 14 | 619:13590, 2615:90220 | Tooltip（Tooltip-under / Tooltip-top） | ✅ | ✅ AppTooltip.vue（A-7/A-7b）|
| 15 | 538:11930 | Badge/PageSettingIcon | ✅ | ✅ AppBadgeIcon.vue（A-9）|
| 16 | 619:13589 | Badge/PageStatus | ✅ | ✅ AppBadgeStatus.vue（A-8）|
| 17 | 621:17779 | Badge/Tag | ✅ | ✅ AppTagBadge.vue（A-11）|
| 18 | 864:40386 | Badge/SubStatus | ✅ | ✅ AppBadgeStatus.vue（A-8）|
| 19 | 619:13664 | PageCountBadge | ✅ | ✅ AppCountBadge.vue（A-10）|
| 20 | 520:13248 | SegmentControlChild | ✅ | ✅ AppSegmentControlItem.vue（A-12）|
| 21 | 849:2330 | TabChild | ✅ | ✅ AppTabItem.vue（A-13）|
| 22 | 932:25025 | PagerNubmer | ✅ | ✅ AppPagerNumber.vue（A-14）|
| 23 | 955:48818 | ProgressBar | ✅ | ✅ AppProgressBar.vue（A-15）|
| 24 | 1000:53908 | PasswordStrength | ✅ | ✅ AppPasswordStrength.vue（A-16）|
| 25 | 308:6380 | side-bar/menu-icon | ✅ | ✅ AppMenuIcon.vue（A-17）|
| 26 | 308:6387 | logo | ✅ | ⬜ |
| 27 | 411:7357 | Icon/LeftMenu | ✅ | ⬜ |
| 28 | 520:12941 | Contact | ✅ | ⬜ |　
| 29 | 2051:66855 | Snackbar | ✅ | ✅ AppSnackbar.vue（A-21）|

### Molecules

※ Figma 上の Atoms（#11・#12・#13）を Vue では Molecule に格上げしたもの、および新設コンポーネントを含む。

| # | node-id | パーツ名 / Vue コンポーネント | Phase C | Phase D |
|---|---------|-------------------------------|---------|---------|
| — | 917:52673, 917:53007 | RadioButton/Text+Box → **AppRadioButton.vue** (M-1) | ✅（Atoms #11・#12 として収集済み） | ⬜ |
| — | 917:53263 | Checkbox → **AppCheckbox.vue** (M-2) | ✅（Atoms #13 として収集済み） | ⬜ |
| — | （新設） | AppSwitch ラッパー → **AppSwitchLabel.vue** (M-3) | —（Figma 対応なし） | ⬜ |
| 29 | 520:13298 | SegmentControl | ⬜ | ⬜ |
| 30 | 849:2467 | Tab | ⬜ | ⬜ |
| 31 | 932:25039 | Pagination | ⬜ | ⬜ |
| 32 | 801:16732 | FormHeading | ⬜ | ⬜ |
| 33 | 801:16744 | FormTitle | ⬜ | ⬜ |
| 34 | 806:17001 | ConfirmSection | ⬜ | ⬜ |
| 35 | 849:3283 | Calendar+Time | ⬜ | ⬜ |
| 36 | 621:12561 | PageSettingStatus | ⬜ | ⬜ |
| 37 | 932:24445 | FavoriteBlock | ⬜ | ⬜ |
| 38 | 643:13340 | BlockEditMenuCell | ⬜ | ⬜ |
| 39 | 308:6450 | side-bar/menu-open → `AppSidebarMenuItem.vue`（#25 menu-icon と統合） | ⬜ | ⬜ |
| 40 | 308:6469 | side-bar/menu-open/sub-menu → `AppSidebarSubMenu.vue`（#41 と統合） | ⬜ | ⬜ |
| 41 | 520:6437 | side-bar/menu-icon/sub-menu → ※ #40 と同一コンポーネント（`AppSidebarSubMenu.vue`） | ⬜ | ⬜ |
| 42 | 417:8671 | side-bar/sub-menu → `AppSidebarSubMenuItem.vue`（open/icon only 共通） | ⬜ | ⬜ |
| 43 | 950:43861 | ScrollArea | ⬜ | ⬜ |
| 44 | 797:9870 | BlockEditMenu | ⬜ | ⬜ |
| 45 | 871:50191 | ModalFooter | ⬜ | ⬜ |　
| — | 2051:66897 | ImageSelector → **AppImageSelector.vue** (M-7) | ⬜ | ⬜ |
| — | 1793:71658 | ContactItemType → **AppContactItemType.vue** (M-8) | ⬜ | ⬜ |
| — | 2051:67078 | ContactItemTypeSelectMenu → **AppContactItemTypeSelectMenu.vue** (M-9) | ⬜ | ⬜ |

### Organisms

| # | node-id | パーツ名 | Phase C | Phase D |
|---|---------|----------|---------|---------|
| 46 | 308:6191 | sidebar | ⬜ | ⬜ |
| 47 | 520:6480 | Header | ⬜ | ⬜ |
| 48 | 643:13397 | Title | ⬜ | ⬜ |
| 49 | 520:11934 | Title/Pages | ⬜ | ⬜ |
| 50 | 632:7983 | Title/PageDetail | ⬜ | ⬜ |
| 51 | 938:50708 | Title/NewArticle | ⬜ | ⬜ |
| 52 | 799:16654 | Title/PageSetting | ⬜ | ⬜ |
| 53 | 849:6145 | Title/UserDirectorySetting | ⬜ | ⬜ |
| 54 | 849:3837 | Title/ModalBasic | ⬜ | ⬜ |
| 55 | 621:13684 | TableHeaderLeft/Pages | ⬜ | ⬜ |
| 56 〜 64 | — | TableHeaderRight/* (9種) | ⬜ | ⬜ |
| 65 | 621:13867 | TableRowLeft/Pages | ⬜ | ⬜ |
| 66 〜 72 | — | TableRowLeft/* (7種) | ⬜ | ⬜ |
| 73 | 621:14049 | TableRowRight/Pages | ⬜ | ⬜ |
| 74 〜 81 | — | TableRowRight/* (8種) | ⬜ | ⬜ |
| 82 〜 90 | — | InlineMenu/* (9種) | ⬜ | ⬜ |
| 91 〜 98 | — | Table/* / ChangeHistory / FileUpload (8種) | ⬜ | ⬜ |
| — | 1793:71220 | ContactItemCell → **AppContactItemCell.vue** | ⬜ | ⬜ |
| — | 1793:71219 | ContactItemAdd → **AppContactItemAdd.vue** | ⬜ | ⬜ |
| — | 1793:74592 | ContactItemErrorModal → **AppContactItemErrorModal.vue** | ⬜ | ⬜ |

### Templates

| # | node-id | パーツ名 | Phase C | Phase D |
|---|---------|----------|---------|---------|
| 99 〜 111 | — | ModalLayer / Dashboard / ArticleEditor 等 (13種) | ⬜ | ⬜ |

---

## Phase C の実施順序（ボトムアップ）

1. **Atoms のボタン群**（Phase D の最初のターゲット）
   - Button/text → Button/Primary → Button/Secondary → Button/Submit → Button/Destructive → Button/Icon
2. **Atoms のフォームコントロール**
   - Checkbox → RadioButton/Text → RadioButton/Box → Switch → Tag
3. **Atoms のバッジ・インジケーター**
   - Badge/* → PageCountBadge → ProgressBar → PasswordStrength
4. **Atoms の子コンポーネント**
   - SegmentControlChild → TabChild → PagerNubmer
5. **Atoms のナビ部品**
   - logo → side-bar/menu-icon → Icon/LeftMenu → Tooltip → Contact
6. **Molecules**（Atoms が揃ってから）
7. **Organisms**（Molecules が揃ってから）

## Phase C.5（Phase C と D の間）✅ 完了（2026-04-27）

Figma Atoms #1〜#28 の収集完了後、ユーザーと Vue コンポーネント構成を相談・確定した。

### 確定した Vue コンポーネント構成

#### Atoms（20 コンポーネント）

| Vue コンポーネント | 対応 Figma Atoms | 主な Props |
|---|---|---|
| `AppButton.vue` | #1 Button/text, #2 Primary, #3 Submit, #4 Destructive, #5 Secondary, #7 Sort, #8 Filter | `variant`, `label`, `size`, `icon?`, `disabled` |
| `AppButtonIcon.vue` | #6 Button/Icon | `icon`, `disabled` |
| `BaseRadioInput.vue` | 新設 Atom（Figma 対応なし） | `modelValue`, `value`, `name`, `disabled` |
| `BaseCheckboxInput.vue` | 新設 Atom（Figma 対応なし） | `modelValue`, `value`, `disabled` |
| `AppTag.vue` | #9 Tag | TBD |
| `AppSwitch.vue` | #10 Switch | TBD |
| `AppTooltip.vue` | #14 Tooltip | TBD |
| `AppBadgeStatus.vue` | #16 Badge/PageStatus, #18 Badge/SubStatus | `variant: "pageStatus" \| "subStatus"`, `state` |
| `AppBadgeIcon.vue` | #15 Badge/PageSettingIcon | `type`（7種類）, `active: boolean` |
| `AppCountBadge.vue` | #19 PageCountBadge | `count: number` |
| `AppTagBadge.vue` | #17 Badge/Tag | `label: string` |
| `AppSegmentControlItem.vue` | #20 SegmentControlChild | `label`, `count`, `selected` |
| `AppTabItem.vue` | #21 TabChild | `label`, `selected` |
| `AppPagerNumber.vue` | #22 PagerNumber（Figma typo: PagerNubmer） | `page`, `active` |
| `AppProgressBar.vue` | #23 ProgressBar | TBD |
| `AppPasswordStrength.vue` | #24 PasswordStrength | TBD |
| `AppMenuIcon.vue` | #25 side-bar/menu-icon | TBD |
| `AppLogo.vue` | #26 logo | 画像アセット必要（後述） |
| `AppLeftMenuIcon.vue` | #27 Icon/LeftMenu | アイコンフォント必要（後述） |
| `AppContact.vue` | #28 Contact | アイコンフォント必要（後述） |
| `AppSnackbar.vue` | #29 Snackbar | `type: "success" \| "info" \| "warning" \| "error"`, `title: string`, `description?: string` |

※ AppTag (#9 フォーム要素) と AppTagBadge (#17 バッジ表示) は別物

#### Molecules（Figma Atoms から格上げ・新設 計 3 コンポーネント）

| Vue コンポーネント | 対応 Figma | 主な Props | 備考 |
|---|---|---|---|
| `AppRadioButton.vue` | #11 RadioButton/Text, #12 RadioButton/Box | `variant: "text" \| "box"`, `label`, v-model | Figma Atoms を Molecule に格上げ |
| `AppCheckbox.vue` | #13 Checkbox | `label`, v-model | Figma Atoms を Molecule に格上げ |
| `AppSwitchLabel.vue` | Figma 対応なし・新設 | `leftLabel?`, `rightLabel?`, v-model, `disabled` | AppSwitch のラッパー。`<label>` タグ全体で toggle |

#### AppButton.vue サイズ設計

| variant | デフォルト size | 高さ |
|---|---|---|
| ghost（Button/text, Sort, Filter に対応） | sm | 32px |
| primary / submit / destructive / secondary | md | 40px |

#### AppRadioButton.vue 幅設計

- デフォルト: `w-auto`（内容に応じた幅）
- 親コンテナ側で `w-full` などを指定可能

#### 画像アセット準備方針（Phase D 実装前の前提条件）

| コンポーネント | 対応 Figma | 準備方針 |
|---|---|---|
| `AppLogo.vue` | #26 logo | Figma MCP から 2x サイズで画像を取得し `public/` または `src/assets/` に配置 |
| `AppLeftMenuIcon.vue` | #27 Icon/LeftMenu | Figma MCP から SVG を取得 → fantasticon でアイコンフォント化 |
| `AppContact.vue` | #28 Contact | ユーザーが別途 SVG を提供 → fantasticon でアイコンフォント化に含める |

FontAwesome（CDN）では補えないカスタムアイコンフォントを fantasticon で生成する。

## Phase D の実装タスクリスト

Phase D は `AppButton.vue` から開始する。実装順序は以下の通り（同時並行不可、依存関係に従う）。

### Atoms Phase D

| # | Vue コンポーネント | 対応 Figma node-id | Phase D |
|---|---|---|---|
| A-1 | `AppButton.vue` | 520:14190, 523:14502, 523:14538, 523:14567, 523:14596, 910:42970, 910:42969 | ✅ |
| A-2 | `AppButtonIcon.vue` | 632:8058 | ✅ |
| A-3 | `BaseRadioInput.vue` | （新設） | ✅ |
| A-4 | `BaseCheckboxInput.vue` | （新設） | ✅ |
| A-5 | `AppTag.vue` | 911:50285 | ✅ |
| A-6 | `AppSwitch.vue` | 849:2931 | ✅ |
| A-7 | `AppTooltip.vue` | 619:13590 | ✅ |
| A-7b | `AppTooltip.vue`（Tooltip-top 対応） | 2615:90220 | ✅（既存 placement='top' が対応済みと確認）|
| A-8 | `AppBadgeStatus.vue` | 619:13589, 864:40386 | ✅ |
| A-9 | `AppBadgeIcon.vue` | 538:11930 | ✅ |
| A-10 | `AppCountBadge.vue` | 619:13664 | ✅ |
| A-11 | `AppTagBadge.vue` | 621:17779 | ✅ |
| A-12 | `AppSegmentControlItem.vue` | 520:13248 | ✅ |
| A-13 | `AppTabItem.vue` | 849:2330 | ✅ |
| A-14 | `AppPagerNumber.vue` | 932:25025 | ✅ |
| A-15 | `AppProgressBar.vue` | 955:48818 | ✅ |
| A-16 | `AppPasswordStrength.vue` | 1000:53908 | ✅ |
| A-17 | `AppMenuIcon.vue` | 308:6380 | ✅ |
| A-18 | `AppLogo.vue` | 308:6387 | ⬜（画像アセット準備後） |
| A-19 | `AppLeftMenuIcon.vue` | 411:7357 | ⬜（fantasticon 準備後） |
| A-20 | `AppContact.vue` | 520:12941 | ⬜（fantasticon 準備後） |
| A-21 | `AppSnackbar.vue` | 2051:66855 | ✅ |

### Molecules Phase D（Atoms 完了後）

| # | Vue コンポーネント | 対応 Figma node-id | Phase D |
|---|---|---|---|
| M-1 | `AppRadioButton.vue` | 917:52673, 917:53007 | ⬜（BaseRadioInput 完了後） |
| M-2 | `AppCheckbox.vue` | 917:53263 | ⬜（BaseCheckboxInput 完了後） |
| M-3 | `AppSwitchLabel.vue` | （新設） | ⬜（AppSwitch 完了後） |
| M-4 | `AppSidebarMenuItem.vue` | 308:6380（#25）, 308:6450（#39） | ⬜（AppMenuIcon 完了後） |
| M-5 | `AppSidebarSubMenu.vue` | 308:6469（#40）, 520:6437（#41） | ⬜（#40・#41 は同一コンポーネント。AppSidebarMenuItem 完了後） |
| M-6 | `AppSidebarSubMenuItem.vue` | 417:8671（#42） | ⬜（AppSidebarSubMenu 完了後） |
| M-7 | `AppImageSelector.vue` | 2051:66897 | ⬜ |
| M-8 | `AppContactItemType.vue` | 1793:71658 | ⬜ |
| M-9 | `AppContactItemTypeSelectMenu.vue` | 2051:67078 | ⬜（M-8 完了後） |

### Organisms Phase D（Molecules 完了後）

| # | Vue コンポーネント | 対応 Figma node-id | Phase D |
|---|---|---|---|
| O-1 | `AppSidebar.vue` | 308:6191（#46） | ⬜（AppLogo, AppMenuIcon, AppButton, AppSidebarMenuItem, AppSidebarSubMenu, AppSidebarSubMenuItem 完了後） |
| O-2 | `AppContactItemCell.vue` | 1793:71220 | ⬜（M-8, M-9 完了後） |
| O-3 | `AppContactItemAdd.vue` | 1793:71219 | ⬜ |
| O-4 | `AppContactItemErrorModal.vue` | 1793:74592 | ⬜ |

---

最終更新: 2026-05-21（A-1〜A-17・A-21 完了。A-7b は既存実装で対応済み確認。次は A-18〜A-20（アセット準備後）。vue-i18n v11 導入済み）

## Phase C 実施メモ

- Phase C (#1〜#8) を 2026-04-27 に実施。Button 群 8 種の JSON を `docs/figma-parts/` に保存済み。
- **node-id 入替**: session-plan.md の `910:42970` (Button/Filter) と `910:42969` (Button/Sort) は Figma 実データと逆だった。
  - 910:42970 = Button/Sort（正）
  - 910:42969 = Button/Filter（正）
- Button/Sort・Button/Filter は単一状態（バリアントなし）。
- Button/text は 4 状態（Default/Hover/Focus/Disabled）でアイコン＋テキスト。
- Button/Primary・Submit・Destructive・Secondary は 4 状態でテキストのみ、高さ 40px。
- Button/Icon は 4 状態でアイコンのみ、32×32px 丸型。
- Phase C (#9〜#18) を 2026-04-27 に実施。フォームコントロール・バッジ群 10 種の JSON を保存済み。
  - 当初コロン区切り（例: `911:50285.json`）で保存していたが、2026-04-27 にハイフン区切りに統一リネーム済み。
- Phase C (#19〜#28) を 2026-04-27 に実施。Atoms 残り 10 種の JSON を保存済み。Atoms Phase C 全完了。
  - Tag: 2バリアント（Deleteable / Undelete）
  - Switch: 2バリアント（ON / OFF）
  - RadioButton/Text: 2バリアント（Select / Unselect）、幅688px固定
  - RadioButton/Box: 2バリアント（Selected / Unselect）、幅180px固定
  - Checkbox: 2バリアント（Selectd / Unselect）、FA: square-check アイコン使用、state 名に typo あり
  - Tooltip: 単一バリアント、背景は画像アセット、幅146px固定
  - Badge/PageSettingIcon: 7種 × active/inactive = 14バリアント、BowNow のみ画像アセット使用
  - Badge/PageStatus: 2バリアント（Open=公開中 / Close=非公開）
  - Badge/Tag: 単一バリアント（白背景・グレー枠・10px フォント）
  - Badge/SubStatus: 3バリアント（PageRebuildTime / Editting / Approved）、state 名に typo あり
- **Phase C (#19〜#28) 実施メモ（2026-04-27）**
  - PageCountBadge: 単一バリアント、グレー背景・12px semibold テキスト、内容幅可変
  - SegmentControlChild: 2バリアント（Selected/Unselected）、選択時は div＋白背景、非選択時は button、件数を '(8)' 形式で表示
  - TabChild: 2バリアント（Selected/Unselected）、選択時は border-b-2 ブランド青、高さ 44px・幅 204px
  - PagerNubmer: 2バリアント（Acutive/Default）、コンポーネント名と state 名に typo（正: PagerNumber / Active）、24x24px 円形
  - ProgressBar: 単一バリアント、グレートラック＋青フィルの2層、高さ 8px・幅可変
  - PasswordStrength: 4バリアント（short/weak/normal/strong）、各強度に応じた背景色・ラベル表示
  - side-bar/menu-icon: 3バリアント（Default/Hover/Current）、FA grip-horizontal アイコン、40x40px
  - logo: 2バリアント（Landscape/Square）、全要素が画像アセット、テキストも画像
  - Icon/LeftMenu: 2バリアント（close/open）、SVG 画像アセット、16x16px
  - Contact: 単一バリアント、画像アセット（青丸＋チャットバブル）、64x64.5px

---

## Phase D 実施メモ

### 実装パターン・注意事項（memory 参照）

詳細は `.claude/projects/-Users-ms-komori-Documents-Git-bm-front-poc/memory/` の各 feedback ファイル参照。

| 注意事項 | memory ファイル |
|---------|----------------|
| Vite base 設定時のアセットパス（`import.meta.env.BASE_URL` を使う） | `feedback_vite_base_asset_path.md` |
| `wrapper.classes()` が空配列 → `wrapper.html()` で代替 | `feedback_vue_test_utils_classes.md` |
| `v-if`/`v-else` フラグメントのルートタグ検証 → `wrapper.find()` を使う | `feedback_vue_test_fragment_tag.md` |
| JSDOM mouseenter 非互換 → `@mouseover` + `contains(relatedTarget)` で代替 | `feedback_css_mouseover_jsdom.md` |

### コンポーネント別 実装仕様サマリー

| # | コンポーネント | 主な確定仕様 |
|---|---|---|
| A-10 | `AppCountBadge.vue` | `rounded-[8px]`（`rounded-md`=6px は Figma 仕様と不一致） |
| A-11 | `AppTagBadge.vue` | `label: string` prop あり（Phase C.5 の「固定テキスト・props なし」から変更） |
| A-12 | `AppSegmentControlItem.vue` | `v-if`/`v-else` で `<div>`（選択）/`<button>`（非選択）を使い分け |
| A-13 | `AppTabItem.vue` | A-12 と同パターン。inner div の padding は `pt-[2px] h-full`（Figma の `px-2 py-1` はデザイン都合で未採用） |

---

## デモページ更新予定タスク

Molecule 実装後に、対応する Atom デモページの特定セクションを Molecule コンポーネントで置き換える。

| デモページ | 対象セクション | 使用 Molecule | 実施タイミング |
|---|---|---|---|
| `src/pages/dev/BaseRadioInputDemo.vue` | グループ選択（相互排他） | `AppRadioButton.vue`（M-1） | M-1 完了後 |
| `src/pages/dev/BaseCheckboxInputDemo.vue` | グループ選択（複数同時チェック可） | `AppCheckbox.vue`（M-2） | M-2 完了後 |
| `src/pages/dev/AppSwitchDemo.vue` | 複数スイッチのフォームデモ | `AppSwitchLabel.vue`（M-3） | M-3 完了後 |
| `src/pages/dev/AppSegmentControlItemDemo.vue` | SegmentControl 風横並びデモ | SegmentControl（Molecule #29） | Molecule #29 完了後 |
