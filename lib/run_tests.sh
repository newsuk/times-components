#!/bin/bash
set -ev

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]
then
  yarn test --since
  exit 0
fi

yarn test
yarn coverage:publish
