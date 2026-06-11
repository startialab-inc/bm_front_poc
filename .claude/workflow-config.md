# ワークフロー設定

スキル（`.claude/commands/`）が参照するプロジェクト固有の設定ファイル。
初回スキル実行時に未設定項目を確認してここに記録する。手動での編集も可能。

---

## figma-collect 設定

```yaml
figma_file_key: VpMboz99gE6SKsEeHGcjmP
figma_target_node: "308:6190"
figma_parts_dir: docs/figma-parts/
component_list_file: docs/session-plan.md
```

---

## component-impl 設定

```yaml
component_base_dir: src/components/
# stories・テストは component_base_dir と同階層（設定不要）
demo_dir: src/pages/dev/
index_page: src/pages/dev/DevIndex.vue
router_file: src/router/index.ts
design_tokens_file: DESIGN.md
figma_parts_dir: docs/figma-parts/
component_list_file: docs/session-plan.md
```

---

## session-wrapup 設定

```yaml
progress_file: docs/session-plan.md
dev_command: pnpm dev
dev_url: http://localhost:8300
screenshot_temp_dir: .playwright-mcp/
```
