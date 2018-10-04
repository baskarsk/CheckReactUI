#!/bin/bash

set -xe

cat ./current-app-info/current-app.txt

sed "s/APPNAME/$(cat ./current-app-info/next-app.txt)-$PWS_APP_SUFFIX_NEW/" ./resource-git-onboarding_ui/manifest.yml > ./app-manifest-output/manifest.yml

cat ./app-manifest-output/manifest.yml
