#!/usr/bin/env bash

for BRANCH in $(ls -1d $PWD/../branches/*) ;
do
  NAME=$(basename $BRANCH)
  cd $BRANCH
  rm server.socket
  pm2 stop $NAME
  echo Kill $NAME
done