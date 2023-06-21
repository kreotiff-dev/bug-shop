#!/usr/bin/env bash

for BRANCH in $(ls -1d $PWD/../branches/*) ;
do
  cd $BRANCH
  pnpm i
  nx build frontend --prod
  nx build
  node dist/apps/backend/main.js &
  echo $! > server.pid
  echo "***** RUNNING $BRANCH ******"

done