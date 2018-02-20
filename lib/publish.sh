#!/usr/bin/env bash
set -e

echo "Running publish script"

echo $(printf "TRAVIS_BRANCH %s" $TRAVIS_BRANCH)
echo $(printf "TRAVIS_PULL_REQUEST %s" $TRAVIS_PULL_REQUEST)

if [[ $JOB_TYPE != 'rest' ]]
then
  echo "We only publish for the rest job"
  exit 0
fi

if [[ $TRAVIS_BRANCH != 'master' ]]
then
  echo "Not on master"
  exit 0
fi

if [[ $TRAVIS_PULL_REQUEST != 'false' ]]
then
  echo "We don't publish for PRs"
  exit 0
fi

# set up git
git config user.name "Publish Bot"
git config user.email "publish@ghbot.com"

git remote set-url origin https://${GH_TOKEN}@github.com/newsuk/times-components.git > /dev/null 2>&1

TAGS=$(git tag -l --points-at HEAD)

# we don't want to recursively publish
if [[ $TAGS ]]
then
  echo "This is the published commit"
  exit 0
fi

git checkout master

TIP_COMMIT=$(git rev-parse HEAD)
echo $(printf "Travis commit: %s, Head commit: %s" $TRAVIS_COMMIT $TIP_COMMIT)

# make sure we only publish if we are at the head of master
if [[ $TIP_COMMIT != $TRAVIS_COMMIT ]]
then
  echo "Not on the tip of master!"
  exit 0
fi

yarn coverage:publish

# set npm credentials
echo "Setting up npm"
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc

# bump versions, create change logs, create tags, publish to npm
PR_MSG=$(git log --pretty=format:"%h" -1)
MESSAGE=$(printf "chore: Publish %s" $PR_MSG)
echo $MESSAGE
lerna publish --conventional-commits --yes --concurrency=1 --exact -m "$MESSAGE"

# push above changes to git
echo "Pushing to master"
git push origin master --tags --quiet > /dev/null 2>&1

./lib/publish_storybook.sh
