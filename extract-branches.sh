#!/usr/bin/env bash

# CHANGE REPOSITORY NAME AT THE LINE BELOW!!!
rm ../branches -r > /dev/null
mkdir ../branches
#  | grep remotes/origin | grep -v HEAD ####### | awk '{if(NR>0)print}'
for BRANCH in $(git branch | awk '{if(NR>0)print}' | cut -c 3-) ;
do
    FOLDER="../branches/$(cut -d'/' -f3 <<<"$BRANCH")"
    echo branch: !$BRANCH!
    echo folder: !$FOLDER!
    git checkout $BRANCH
    mkdir $FOLDER
    rsync -r --exclude '.git' ./ $FOLDER
done
git checkout main