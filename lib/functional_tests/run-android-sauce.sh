#!/bin/bash
npx fructose-tunnel &
pushd android
./gradlew clean
./gradlew assembleRelease
popd
npm run fetch-fonts
npx rnstl --searchDir ./packages --pattern './*/*.fructose.android.js' --outputFile ./fructose/components.js

curl -u $SAUCE_USERNAME:$SAUCE_KEY\
    -X POST \
    -H "Content-Type: application/octet-stream"\
    https://saucelabs.com/rest/v1/storage/tnlweb/fructose-e2e.apk?overwrite=true\
    --data-binary @${PWD}/android/app/build/outputs/apk/release/app-release.apk

npx compile-tests -d fructose
jest fructose/components.test.js --setupTestFrameworkScriptFile ./fructose/setup.android.sauce.js --forceExit --verbose
