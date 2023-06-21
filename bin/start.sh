#!/usr/bin/env bash

mkdir ../branches >> /dev/null
for BRANCH in $(ls -1d $PWD/../branches/*) ;
do
  NAME=$(basename $BRANCH)
  cd $BRANCH
  npm i
  nx build frontend --prod
  nx build
  mkdir ~/.forever/logs -p
  pm2 start dist/apps/backend/main.js --name $NAME
  echo "***** RUNNING $NAME ******"

done