#!/usr/bin/env bash
set -e

# set npm credentials
echo "Setting up npm"
echo "//registry.npmjs.org/:_authToken=${NEWS_TOOLS_NPM_TOKEN}" > ~/.npmrc

git config user.name "times-tools"
git config user.email "tools@news.co.uk"

# publish canary to npm
lerna publish --canary --yes
