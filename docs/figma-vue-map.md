# Figma → Vue コンポーネント対応表

ページ生成時に Figma コンポーネント名から Vue ファイルと使用方法を即座に引くためのルックアップ表。
Phase D 実装済みコンポーネントのみ掲載。未実装は「⬜ 未実装」と表記。

**保守ルール**: Phase D でコンポーネントを実装したら、未実装セクションの行を対応する Atoms/Molecules/Organisms テーブルに移動し、使用例を記入すること。

---

## Atoms

| Figma 名 | node-id | Vue ファイル | 最低限の使用例 |
|----------|---------|-------------|---------------|
| Button/text | 520:14190 | `atoms/AppButton.vue` | `<AppButton variant="ghost" label="テキスト" />` |
| Button/Primary | 523:14502 | `atoms/AppButton.vue` | `<AppButton variant="primary" label="登録" />` |
| Button/Submit | 523:14538 | `atoms/AppButton.vue` | `<AppButton variant="submit" label="送信" />` |
| Button/Destructive | 523:14567 | `atoms/AppButton.vue` | `<AppButton variant="destructive" label="削除" />` |
| Button/Secondary | 523:14596 | `atoms/AppButton.vue` | `<AppButton variant="secondary" label="キャンセル" />` |
| Button/Secondary-cancel | 3790:101917 | `atoms/AppButton.vue` | `<AppButton variant="secondary" label="キャンセル" iconLeft="xmark" />` |
| Button/Secondary-close | 3790:101927 | `atoms/AppButton.vue` | `<AppButton variant="secondary" label="閉じる" iconLeft="xmark" />` |
| Button/Secondary-other | 3801:103145 | `atoms/AppButton.vue` | `<AppButton variant="secondary" label="その他" iconRight="angle-down" />` |
| Button/Sort | 910:42970 | `atoms/AppButton.vue` | `<AppButton variant="sort" label="並び替え" />` |
| Button/Filter | 910:42969 | `atoms/AppButton.vue` | `<AppButton variant="filter" label="絞り込み" />` |
| Button/Icon | 632:8058 | `atoms/AppButtonIcon.vue` | `<AppButtonIcon icon="pen" />` |
| Tag | 911:50285 | `atoms/AppTag.vue` | `<AppTag label="タグ名" :deletable="true" />` |
| Switch | 849:2931 | `atoms/AppSwitch.vue` | `<AppSwitch v-model="val" />` |
| Tooltip（Tooltip-under） | 619:13590 | `atoms/AppTooltip.vue` | `<AppTooltip text="説明" placement="bottom"><button>...</button></AppTooltip>` |
| Tooltip（Tooltip-top） | 2615:90220 | `atoms/AppTooltip.vue` | `<AppTooltip text="説明" placement="top"><button>...</button></AppTooltip>` |
| Badge/PageStatus（Open） | 619:13589 | `atoms/AppBadgeStatus.vue` | `<AppBadgeStatus variant="open" />` |
| Badge/PageStatus（Close） | 619:13589 | `atoms/AppBadgeStatus.vue` | `<AppBadgeStatus variant="close" />` |
| Badge/SubStatus（Rebuilding） | 864:40386 | `atoms/AppBadgeStatus.vue` | `<AppBadgeStatus variant="rebuilding" />` |
| Badge/SubStatus（Editing） | 864:40386 | `atoms/AppBadgeStatus.vue` | `<AppBadgeStatus variant="editing" />` |
| Badge/SubStatus（Approved） | 864:40386 | `atoms/AppBadgeStatus.vue` | `<AppBadgeStatus variant="approved" />` |
| Badge/PageSettingIcon | 538:11930 | `atoms/AppBadgeIcon.vue` | `<AppBadgeIcon type="Contact" :active="true" />` ※type: Contact/Editable/PageSetting/OpenTerm/BowNowScript/BowNow/Curation |
| PageCountBadge | 619:13664 | `atoms/AppCountBadge.vue` | `<AppCountBadge :count="8" />` |
| Badge/Tag | 621:17779 | `atoms/AppTagBadge.vue` | `<AppTagBadge label="ラベル" />` |
| SegmentControlChild | 520:13248 | `atoms/AppSegmentControlItem.vue` | `<AppSegmentControlItem label="タブ名" :count="3" :selected="true" />` |
| TabChild | 849:2330 | `atoms/AppTabItem.vue` | `<AppTabItem label="タブ名" :selected="true" />` |
| PagerNubmer（正: PagerNumber） | 932:25025 | `atoms/AppPagerNumber.vue` | `<AppPagerNumber :page="1" :active="true" />` |
| ProgressBar | 955:48818 | `atoms/AppProgressBar.vue` | `<AppProgressBar :progress="60" />` |
| PasswordStrength | 1000:53908 | `atoms/AppPasswordStrength.vue` | `<AppPasswordStrength type="normal" />` ※type: short/weak/normal/strong |
| side-bar/menu-icon | 308:6380 | `atoms/AppMenuIcon.vue` | `<AppMenuIcon :current="false" />` |
| logo（landscape） | 308:6387 | `atoms/AppLogo.vue` | `<AppLogo variant="landscape" />` |
| logo（square） | 308:6387 | `atoms/AppLogo.vue` | `<AppLogo variant="square" />` |
| Icon/LeftMenu（close） | 411:7357 | `atoms/AppLeftMenuIcon.vue` | `<AppLeftMenuIcon status="close" @toggle="..." />` |
| Icon/LeftMenu（open） | 411:7357 | `atoms/AppLeftMenuIcon.vue` | `<AppLeftMenuIcon status="open" @toggle="..." />` |
| Contact | 520:12941 | `atoms/AppContact.vue` | `<AppContact />` |
| Snackbar | 2051:66855 | `atoms/AppSnackbar.vue` | `<AppSnackbar type="success" title="保存しました" />` ※type: success/info/warning/error |

---

## Molecules

| Figma 名 | node-id | Vue ファイル | 最低限の使用例 |
|----------|---------|-------------|---------------|
| RadioButton/Text | 917:52673 | `molecules/AppRadioButton.vue` | `<AppRadioButton v-model="val" variant="text" label="選択肢" value="a" name="group" />` |
| RadioButton/Box | 917:53007 | `molecules/AppRadioButton.vue` | `<AppRadioButton v-model="val" variant="box" label="選択肢" value="a" name="group" />` |
| Checkbox | 917:53263 | `molecules/AppCheckbox.vue` | `<AppCheckbox v-model="val" label="チェック項目" value="a" />` |
| SegmentControl | 520:13298 | `molecules/AppSegmentControl.vue` | `<AppSegmentControl v-model="val" :items="[{label:'全て',count:10,value:'all'}]" />` |
| Tab | 849:2467 | `molecules/AppTab.vue` | `<AppTab v-model="val" :items="[{label:'タブ1',value:'tab1'}]" />` |
| Pagination | 932:25039 | `molecules/AppPagination.vue` | `<AppPagination v-model="page" :totalCount="100" :totalPages="10" />` |
| FormHeading | 801:16732 | `molecules/AppFormHeading.vue` | `<AppFormHeading title="セクション名" description="説明文" />` |
| FormTitle | 801:16744 | `molecules/AppFormTitle.vue` | `<AppFormTitle title="フォームタイトル" />` |
| ConfirmSection | 806:17001 | `molecules/AppConfirmSection.vue` | `<AppConfirmSection type="information" :items="['確認項目1']" />` |
| PageSettingStatus | 621:12561 | `molecules/AppPageSettingStatus.vue` | `<AppPageSettingStatus status="on" />` |
| FavoriteBlock | 932:24445 | `molecules/AppFavoriteBlock.vue` | `<AppFavoriteBlock title="ブロック名" :selected="false" />` |
| BlockEditMenuCell | 643:13340 | `molecules/AppBlockEditMenuCell.vue` | `<AppBlockEditMenuCell icon="pen" label="編集" />` |
| BlockEditMenu | 797:9870 | `molecules/AppBlockEditMenu.vue` | `<AppBlockEditMenu variant="unselect" />` |
| ModalFooter | 871:50191 | `molecules/AppModalFooter.vue` | `<AppModalFooter><AppButton .../><AppButton .../></AppModalFooter>` ※スロット設計 |
| side-bar/menu-open | 308:6450 | `molecules/AppSidebarMenuItem.vue` | `<AppSidebarMenuItem label="メニュー名" icon="house" :to="{name:'home'}" />` |
| side-bar/menu-open/sub-menu | 308:6469 | `molecules/AppSidebarSubMenu.vue` | `<AppSidebarSubMenu><AppSidebarSubMenuItem .../></AppSidebarSubMenu>` |
| side-bar/menu-icon/sub-menu | 520:6437 | `molecules/AppSidebarSubMenu.vue` | ↑ と同コンポーネント |
| side-bar/sub-menu | 417:8671 | `molecules/AppSidebarSubMenuItem.vue` | `<AppSidebarSubMenuItem label="サブメニュー" :to="{name:'page'}" />` |
| ImageSelector | 2051:66897 | `molecules/AppImageSelector.vue` | `<AppImageSelector v-model="imageUrl" @select="onFile" />` |
| ContactItemType | 1793:71658 | `molecules/AppContactItemType.vue` | `<AppContactItemType v-model="type" />` ※type: ContactItemType 型 |
| Calendar+Time | 849:3283 | — | ⬜ 未実装（ライブラリ未確定）|
| ScrollArea | 950:43861 | — | ⬜ 未実装（ライブラリ未確定）|

---

## 未実装（Organisms / Templates）

Phase D 未着手。ページ実装時はこれらの Figma ノードから直接コードを生成する。

| Figma 名 | node-id | 備考 |
|----------|---------|------|
| sidebar | 308:6191 | O-1 |
| Header | 520:6480 | — |
| AddBlockMenu | 643:13397 | — |
| Title/* | 520:11934 他 | 6種 |
| TableHeaderLeft/Pages | 621:13684 | — |
| TableHeaderRight/* | 621:13699 他 | 複数種 |
| TableRowLeft/* | 621:13867 他 | 複数種 |
| TableRowRight/* | 621:14049 他 | 複数種 |
| InlineMenu/* | 621:17133 他 | 9種 |
| Table/UserDirectory | 849:6270 | — |
| Table/UserDirectoryFile | 849:6271 | — |
| Table/User | 854:2658 | — |
| Table/flow | 3225:6670 | — |
| BlockHover | 643:13549 | — |
| BlockSelect | 643:13612 | — |
| BlockSelectFooter | 1173:25606 | — |
| PagesLayer | 855:18985 | — |
| ArticleIndex | 1132:87972 | — |
| login / login-news | 2319:5852, 2319:5853 | — |
| export / import | 2358:78770, 2358:78801 | — |
| PreviewBar | 3738:5856〜5976 | — |
| ModalLayer | 855:20693 | — |
| ArticleEditor | 938:52200 | — |
| Dashboard/* | 967:72034 他 | 複数種 |
