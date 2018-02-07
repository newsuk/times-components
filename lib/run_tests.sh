#!/bin/bash
set -ev

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]
then
  yarn test --since
  yarn coverage:publish
  exit 0
fi

yarn test
