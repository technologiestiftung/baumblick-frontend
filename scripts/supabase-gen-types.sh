#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
URL=$DATABASE_URL
if ! command -v supabase &>/dev/null; then
	echo "supabase cli could not be found"
	exit 1
fi

if [[ -z "${URL}" ]]; then
	echo "DATABASE_URL env var is not set"
	exit 1
fi

supabase gen types typescript --db-url "$URL"
