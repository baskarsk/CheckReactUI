#!/usr/bin/env bash

set -ex
echo "Building................"
pushd resource-git-onboarding_ui
  export TERM=dumb
    pwd
    ls -lart
    npm install
    npm run build
    pwd
    ls -lart
    rm -r node_modules
    echo "Moving code ................"
    mv * -v -t ../uiCode
    cd ../uiCode
    ls -lart    
popd
echo "Build Completed !!!"
