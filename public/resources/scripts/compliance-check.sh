#!/bin/bash
set -euo pipefail

TARGET="${1:-localhost}"
LEVEL="${2:-2}"

echo "=== CIS 基线合规检查: $TARGET ==="

# kube-bench 检查
kube-bench run --targets node --level "$LEVEL"

# 文件权限检查
echo "检查敏感文件权限..."
for file in /etc/kubernetes/admin.conf /var/lib/kubelet/config.yaml; do
  if [[ -f "$file" ]]; then
    perm=$(stat -c "%a" "$file")
    echo "  $file: $perm"
    if [[ "$perm" -gt 600 ]]; then
      echo "  WARNING: 权限过于宽松"
    fi
  fi
done

echo "=== 检查完成 ==="
