#!/usr/bin/env bash

# rm ../branches -r > /dev/null
mkdir ../branches -p >> /dev/null
git fetch --all
for BRANCH in $(git branch | awk '{if(NR>0)print}' | cut -c 3-) ;
do
    FOLDER="../branches/$(cut -d'/' -f3 <<<"$BRANCH")"
    echo Extract $BRANCH
    git checkout $BRANCH &&
    mkdir $FOLDER -p &&
    rsync -r \
        --exclude '.git' \
        --exclude 'node_modules' \
        ./ $FOLDER
done
git checkout main