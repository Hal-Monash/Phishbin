#!/usr/bin/env bash

set -Eeuo pipefail

function wait_for_mongo() {
  until nc -z ${DB_HOST:-mongo} ${DB_PORT:-27017}
  do
    printf "Waiting for mongodb ...\n"
    sleep 1
  done
}

wait_for_mongo

exec "$@"
