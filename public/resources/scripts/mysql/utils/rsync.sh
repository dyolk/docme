#!/usr/bin/env bash
set -euo pipefail

# Author: Aucru@mail.dyolk.com
# Date: 2026-05-15
# Version: 1.0.0

fn struct_remote_config() {
  export REMOTE_SERVER_IP="${REMOTE_SERVER_IP:-127.0.0.1}"
  export REMOTE_SERVER_USER="${REMOTE_SERVER_USER:-root}"
  export REMOTE_SERVER_PASS="${REMOTE_SERVER_PASS:-}"
  export REMOTE_SERVER_DIR="${REMOTE_SERVER_DIR:-/tmp/dyolk/rsync/data/}"
}

fn struct_local_config() {
  export LOCAL_DIR="${LOCAL_DIR:-/tmp/dyolk/rsync/data/}"
  export LOG_FILE="${LOG_FILE:-/tmp/dyolk/rsync/logs/$(date '+%Y%m%d%H%M').log}"
}

fn judge_rsync_exist() {:}

fn hash_check() {}
