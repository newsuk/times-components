#!/bin/bash
set -ev

if [ $TRAVIS_BRANCH != 'master' ] && [ $TRAVIS_PULL_REQUEST = 'false' ]
then
  echo "Publishing branch changes to coveralls for PR"
  yarn test --since
  yarn coverage:publish
  exit 0
fi

if [ $TRAVIS_PULL_REQUEST = 'false' ]
then
  echo "Running all the tests for master"
  yarn test
  exit 0
fi

echo "Running all the tests for the PR with no publish"
yarn test
