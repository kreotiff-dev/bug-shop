#!/usr/bin/env bash

CURRENT_DIR=$(pwd)

# rm ../branches -r > /dev/null
mkdir ../branches -p >> /dev/null
git pull
for branch in `git branch -a | grep remotes | grep -v HEAD | grep -v master `; do
   git branch --track ${branch#remotes/origin/} $branch
done

git fetch --all

for BRANCH in $(git branch | awk '{if(NR>0)print}' | cut -c 3-) ;
do
    FOLDER="../branches/$(cut -d'/' -f3 <<<"$BRANCH")"
    echo Extract $BRANCH
    git checkout $BRANCH &&
    git fetch &&
    git pull
    mkdir $FOLDER -p &&
    rsync -r \
        --exclude '.git' \
        --exclude 'node_modules' \
        ./ $FOLDER
    sed -i "s/{branch}/$BRANCH/g" $FOLDER/apps/frontend/src/index.html
    ENV_FILE=$CURRENT_DIR/../.env
    cat $ENV_FILE
    cp $ENV_FILE $FOLDER/
done
git checkout main