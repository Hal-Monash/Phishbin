#! /bin/sh

mongod -dbpath /home/ubuntu/hao/mongod >output_mongod.log 2>&1 &
yarn api:start >output_api.log 2>&1 &