#!/usr/bin/env bash

set -a
. ./config
set +a

docker build --build-arg SSH_PRIVATE_KEY -t ${API_NAME}:latest -f release/Dockerfile ../

docker-compose up -d --remove-orphans
