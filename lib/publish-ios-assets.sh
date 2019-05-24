#!/usr/bin/env bash
set -e

VERBOSE=0
ASSET_REPO="git@github.com:newsuk/times-components-ios-artifacts.git"

function logError () {
    echo "$@" >&4
}

function log () {
    echo "$@"
}

function logVerbose () {
    echo "$@" >&3
}

while getopts "v" OPTION
do
  case $OPTION in
    v) VERBOSE=1
       ;;
  esac
done

if [ "$VERBOSE" = 1 ]; then
    exec 4>&2 3>&1
else
    exec 4>/dev/null 3>/dev/null
fi

log "Publish IOS Resources ..."

# =======================
# Find version
# =======================

log "Checking new version ..."
VERSION=$(cat ios-app/package.json | grep version | head -1 | sed 's/[\",\t ]//g' | awk -F: '{ print $2 }' 2>&4)
if [ -z "$VERSION" ]
then
  logError "Error: Can't find ios version"
  exit 2
fi
log "Found new version: $VERSION"

# =======================
# Create Tmp Folder
# =======================

TMP_ASSET_DIR=$(mktemp -d) || { logError "Failed to create temp file" ; exit 2; }
logVerbose "Tmp Directory: $TMP_ASSET_DIR"

# ==================================
# Check out assets repo and validate
# ==================================

# set up git
git config user.name "Publish Bot" 2>&4
git config user.email "publish@ghbot.com" 2>&4

logVerbose "Checking out $ASSET_REPO in $TMP_ASSET_DIR"
# Fetch the whole repo as we want to check if the tag exists already
#git clone --single-branch --branch master $ASSET_REPO $TMP_ASSET_DIR  2>&4 1>&3
git clone --branch master $ASSET_REPO $TMP_ASSET_DIR  2>&4 1>&3

cd $TMP_ASSET_DIR 2>&4 1>&3
# If tag already present on the repo, abort
if [ $(git tag -l "$VERSION") ]; then
    logError "Error: $VERSION already exists in assets repo"
    exit 2
fi
cd - 2>&4 1>&3

# ==================================
# Update new assets and commit
# ==================================

log "Update new assets"
rm -rf $TMP_ASSET_DIR/assets 1>&3
mkdir -p $TMP_ASSET_DIR/assets 1>&3
cp -r ios-app/ios-assets/* $TMP_ASSET_DIR/assets 1>&3
# Lets not copy podspec file over as it has path info for this repo
# and it will be confusing to see it over in assets repo

cd $TMP_ASSET_DIR 2>&4 1>&3
git add $TMP_ASSET_DIR/assets TimesComponents.podspec 1>&3
# If there are no changes and we still want to tag the version, ignore error
git commit -m "IOS assets for version:$VERSION"  1>&3 || true
log "Create new version tag: $VERSION"
git tag -a $VERSION -m "IOS assets for version:$VERSION"  1>&3

# push above changes to git
log "Pushing changes to assets repo"
git push origin master --tags --quiet 1>&3

# ==================================
# Cleanup
# ==================================

logVerbose "Clean up tmp folder"
rm -rf $TMP_ASSET_DIR 2>&4 1>&3

log "All done!!"
exit 0
