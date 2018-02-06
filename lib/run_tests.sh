#!/bin/bash
set -ev

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]
then
  yarn test
  exit 0
fi

yarn test --since
