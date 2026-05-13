#!/bin/bash
# セッション開始時の初期化スクリプト
# Claude Codeのコンテキストに注入されるメッセージを出力する

PROJECT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
TODAY=$(date +%Y-%m-%d)
# TODO: Figma REST API トークンの有効期限を更新してください（.env の FIGMA_ACCESS_TOKEN 更新時に合わせてここも更新）
# 次セッションで設定予定
TOKEN_EXPIRY="9999-12-31"

# .env からトークンを読み込む
if [ -f "$PROJECT_DIR/.env" ]; then
  FIGMA_TOKEN=$(grep '^FIGMA_ACCESS_TOKEN=' "$PROJECT_DIR/.env" | cut -d'=' -f2)
fi

# macOS互換の日付計算
expiry_epoch=$(date -j -f "%Y-%m-%d" "$TOKEN_EXPIRY" +%s 2>/dev/null)
today_epoch=$(date +%s)
warn_epoch=$(( expiry_epoch - 7 * 86400 ))

echo "=== セッション開始チェック ==="

# Figmaトークン期限チェック（日付ベース）
if [ "$today_epoch" -gt "$expiry_epoch" ]; then
  echo "⚠️  【要対応】Figmaアクセストークンの期限が切れています！（期限: $TOKEN_EXPIRY）"
  echo "   .env の FIGMA_ACCESS_TOKEN を新しいトークンに更新してください。"
  echo "   取得先: https://www.figma.com/settings"
elif [ "$today_epoch" -gt "$warn_epoch" ]; then
  remaining_days=$(( (expiry_epoch - today_epoch) / 86400 ))
  echo "⚠️  Figmaアクセストークンの期限が残り${remaining_days}日です（期限: $TOKEN_EXPIRY）"
else
  remaining_days=$(( (expiry_epoch - today_epoch) / 86400 ))
  echo "✅ Figmaアクセストークン: 有効（期限: $TOKEN_EXPIRY、残り${remaining_days}日）"
fi

# Figma APIトークン実際の有効性チェック（Figma ファイルエンドポイントへのアクセスで確認）
# TODO: プロジェクトの Figma ファイルキーに変更してください（次セッションで設定予定）
FIGMA_FILE_KEY="UNSET"
if [ -n "$FIGMA_TOKEN" ] && [ "$FIGMA_FILE_KEY" != "UNSET" ]; then
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "X-Figma-Token: $FIGMA_TOKEN" \
    "https://api.figma.com/v1/files/${FIGMA_FILE_KEY}?depth=1" 2>/dev/null)
  if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Figma REST APIトークン: 認証OK（ファイルエンドポイント疎通確認済み）"
  else
    echo "⚠️  【要対応】Figma APIトークンが無効です（HTTP: $HTTP_STATUS）"
    echo "   期限前でもトークンが失効している場合があります。"
    echo "   https://www.figma.com/settings で新しいトークンを発行し、"
    echo "   .env / ~/.claude.json / session-init.sh / CLAUDE.md を更新してください。"
  fi
elif [ "$FIGMA_FILE_KEY" = "UNSET" ]; then
  echo "ℹ️  Figma REST API トークン疎通確認: スキップ（ファイルキー未設定）"
fi

# Figma MCP認証確認の指示
echo ""
echo "【指示】Figma MCP の接続を確認するため、最初のタスクを実行する前に"
echo "必ず mcp__figma__whoami ツールを呼び出してください。"
echo "成功した場合はそのまま作業を開始できます。"
echo "失敗した場合は以下のいずれかで再認証してください："
echo "  方法A: /mcp コマンド → figma を選択 → Authenticate をクリック → ブラウザで認証"
echo "  方法B: Claude Code を再起動してブラウザで Figma OAuth 認証を完了させる"
echo "（OAuth 認証は初回または認証切れ時のみ必要です）"
