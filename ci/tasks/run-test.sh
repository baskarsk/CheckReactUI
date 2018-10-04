#!/usr/bin/env bash

set -ex
pushd resource-git-onboarding_ui
  echo "Installing node modules................"
  npm install
  echo "Running Tests................"
  npm run test

popd

  echo "Testing Done !!!"