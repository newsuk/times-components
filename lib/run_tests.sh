#!/bin/bash
set -ev

if [ "${TRAVIS_PULL_REQUEST}" = "true" ]
then
  yarn test --since
  exit 0
fi

yarn test
