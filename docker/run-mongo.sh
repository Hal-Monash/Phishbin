#!/usr/bin/env bash

set -a
. ./config
set +a

docker-compose -f docker-compose-mongo.yaml up -d --remove-orphans
