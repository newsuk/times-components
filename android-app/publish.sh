#!/usr/bin/env bash
set -e

function publish {
  echo -e '\n'$1
  FILEPATH="$1.tar"
  tar -cf $FILEPATH $1
  curl -T $FILEPATH --header "X-Explode-Archive: true" -u${ARTIFACTORY_USER}:${ARTIFACTORY_API_KEY} "$ARTIFACTORY_URL"
}

echo "Publishing to bintray $ARTIFACTORY_URL"
ROOT_DIR=$(dirname "$0")

# Upload contents of repo folder
cd $ROOT_DIR/repo
ls -d */ | cut -f1 -d'/' | while read line ; do publish $line ; done
cd $ROOT_DIR
