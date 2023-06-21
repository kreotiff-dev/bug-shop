#!/usr/bin/env bash

for BRANCH in $(ls -1d $PWD/../branches/*) ;
do
  cd $BRANCH
  npm i
  nx build frontend --prod
  nx build
  mkdir ~/.forever/logs -p
  pm2 start dist/apps/backend/main.js
  echo "***** RUNNING $BRANCH ******"

done