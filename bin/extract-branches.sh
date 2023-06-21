#!/usr/bin/env bash

# rm ../branches -r > /dev/null
mkdir ../branches >> /dev/null
git remote update
git pull --all
for BRANCH in $(git branch | awk '{if(NR>0)print}' | cut -c 3-) ;
do
    FOLDER="../branches/$(cut -d'/' -f3 <<<"$BRANCH")"
    echo Extract $BRANCH
    git checkout $BRANCH &&
    mkdir $FOLDER &&
    rsync -r \
        --exclude '.git' \
        --exclude 'node_modules' \
        ./ $FOLDER
done
git checkout main