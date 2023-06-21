#!/usr/bin/env bash

# CHANGE REPOSITORY NAME AT THE LINE BELOW!!!
rm ../branches -r
mkdir ../branches
#  | grep remotes/origin | grep -v HEAD
for BRANCH in $(git branch | awk '{if(NR>1)print}' ) ;
do
    FOLDER="../branches/$(cut -d'/' -f3 <<<"$BRANCH")"
    echo branch: !$BRANCH!
    echo folder: !$FOLDER!
    git checkout $BRANCH
    mkdir $FOLDER
    rsync -r --exclude '.git' ./ $FOLDER
done