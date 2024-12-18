#!/usr/bin/env bash
set -e

# set npm credentials
echo "Setting up npm"
echo "//registry.npmjs.org/:_authToken=${NEWS_TOOLS_NPM_TOKEN}" > ~/.npmrc

git config user.name "times-tools"
git config user.email "tools@news.co.uk"

# publish canary to npm
BRANCH_HASH=`/bin/echo $CIRCLE_BRANCH | /usr/bin/md5sum | /bin/cut -f1 -d" "`
lerna publish --canary --yes --preid ${BRANCH_HASH}
