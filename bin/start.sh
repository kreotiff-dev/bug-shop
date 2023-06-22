#!/usr/bin/env bash

mkdir ../branches -p
for BRANCH in $(ls -1d $PWD/../branches/*) ;
do
  NAME=$(basename $BRANCH)
  cd $BRANCH
  echo "*** Now in $PWD"
  npm i
  nx build frontend --prod
  nx build
  pm2 start $BRANCH/dist/apps/backend/main.js --name $NAME
  echo "*** RUNNING $NAME ***"
  echo "*** Path $BRANCH"

done