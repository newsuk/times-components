#!/bin/bash
xcrun simctl boot 'iPhone 7'
./node_modules/.bin/lerna run dextrose-clean
./node_modules/.bin/lerna run dextrose-stories --since
npm run fetch-fonts
./node_modules/.bin/rnstl --searchDir ./packages --pattern '**/*/*.stories!(.web).dextrose.tmp.js' --outputFile ./fructose/components.js
./node_modules/.bin/react-native bundle --platform ios --dev false --reset-cache --entry-file fructose/index.js --bundle-output ios/main.jsbundle
mkdir -p ios/build/Build/Products/Release-iphonesimulator/storybooknative.app/
./node_modules/.bin/react-native run-ios --no-packager --configuration Release
PACKAGER_PID=$!
./node_modules/.bin/dextrose run --config ./dextrose/dextrose.ios.js --snapshotWait 2000
kill -9 $PACKAGER_PID
xcrun simctl shutdown booted
