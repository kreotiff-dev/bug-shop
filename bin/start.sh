#!/usr/bin/env bash

mkdir ../branches -p

CURRENT_DIR=$ENV

for BRANCH in $(ls -1d $PWD/../branches/*) ;
do
  NAME=$(basename $BRANCH)
  cd $BRANCH
  echo "*** Now in $PWD"
  npm i
  nx build frontend --prod
  nx build
  pm2 start $BRANCH/dist/apps/backend/main.js --name $NAME
  chmod 777 server.socket
  echo "*** RUNNING $NAME ***"
  echo "*** Path $BRANCH"

done

cd $CURRENT_DIR
sleep 5
for BRANCH in $(ls -1d $PWD/../branches/*) ;
  cd $BRANCH
  chmod 777 server.socket
do
dome