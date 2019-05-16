#!/bin/bash
set -ev

if [ $TRAVIS_BRANCH != 'master' ] && [ $TRAVIS_PULL_REQUEST = 'false' ]
then
  if [ $JOB_TYPE == 'rest' ]
  then
    yarn lint
    yarn test
    npx lerna run test --stream --since -- -- --ci --bail --coverage
  else
    npx lerna run test:$JOB_TYPE --stream --since -- -- --ci --bail --coverage
  fi

  echo "Publishing branch changes to coveralls for PR"
  yarn coverage:publish

  exit 0
fi

if [ $TRAVIS_PULL_REQUEST = 'false' ]
then
  echo "Running all the tests for master"

  if [ $JOB_TYPE == 'rest' ]
  then
    yarn lint
    yarn test
    npx lerna run test --stream -- -- --ci --bail --coverage
  else
    npx lerna run test:$JOB_TYPE --stream -- -- --ci --bail --coverage
  fi

  exit 0
fi

echo "Running all the tests for the PR with no publish"
if [ $JOB_TYPE == 'rest' ]
then
  yarn lint
  yarn test
  npx lerna run test --stream -- -- --ci --bail --coverage
else
  npx lerna run test:$JOB_TYPE --stream -- -- --ci --bail --coverage
fi
