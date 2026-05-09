#!/bin/bash
set -euo pipefail

IMAGE="${1:-nginx:latest}"
SEVERITY="${2:-HIGH,CRITICAL}"

echo "=== 镜像安全扫描: $IMAGE ==="

# Trivy 扫描
trivy image --severity "$SEVERITY" --no-progress "$IMAGE"

# Docker Bench 安全检查
docker-bench-security.sh -c container_images

echo "=== 扫描完成 ==="
