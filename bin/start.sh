#!/usr/bin/env bash

mkdir ../branches -p

CURRENT_DIR=$(pwd)

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
echo "Return to $CURRENT_DIR"

for BRANCH in $(ls -1d $PWD/../branches/*) ;
do
  cd $BRANCH
  SOCKET="$PWD/server.socket"
  file_to_wait=$SOCKET
  echo "Waiting for $SOCKET"
  while [ ! -f "$SOCKET" ]
  do
    sleep 1
  done
  chmod 777 $SOCKET
# do
done