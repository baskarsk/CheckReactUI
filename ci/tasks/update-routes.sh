#!/usr/bin/env bash

set -ex

pwd
env

cf api $PWS_API --skip-ssl-validation

cf login -u $PWS_USER -p $PWS_PWD -o "$PWS_ORG" -s "$PWS_SPACE"

cf apps

cf routes

export PWS_DOMAIN_NAME=$PWS_APP_DOMAIN
export MAIN_ROUTE_HOSTNAME=$PWS_APP_SUFFIX # Removing prefix "main-",inorder to maintain same app name in PCF

export NEXT_APP_COLOR=$(cat ./current-app-info/next-app.txt)
export NEXT_APP_HOSTNAME=$NEXT_APP_COLOR-$PWS_APP_SUFFIX_NEW

export CURRENT_APP_COLOR=$(cat ./current-app-info/current-app.txt)
export CURRENT_APP_HOSTNAME=$CURRENT_APP_COLOR-$PWS_APP_SUFFIX

echo "Mapping main app route to point to $NEXT_APP_HOSTNAME instance"
cf map-route $NEXT_APP_HOSTNAME $PWS_DOMAIN_NAME --hostname $MAIN_ROUTE_HOSTNAME

cf routes

echo "Removing previous main app route that pointed to $CURRENT_APP_HOSTNAME instance"

set +e
cf unmap-route $CURRENT_APP_HOSTNAME $PWS_DOMAIN_NAME --hostname $MAIN_ROUTE_HOSTNAME
cf delete $CURRENT_APP_HOSTNAME -f
cf delete-route $PWS_DOMAIN_NAME --hostname $NEXT_APP_HOSTNAME -f
cf rename $NEXT_APP_HOSTNAME $NEXT_APP_COLOR-$PWS_APP_SUFFIX

set -e

echo "Routes updated"

cf routes
