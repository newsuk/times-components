#!/bin/bash
xcrun simctl boot 'iPhone 7'
npx lerna run dextrose-clean
npx lerna run dextrose-stories --since
npm run fetch-fonts
npx rnstl --searchDir ./packages --pattern '**/*/*.stories!(.web).dextrose.tmp.js' --outputFile ./fructose/components.js
export CWD=$(pwd) 
export FRC=$CWD/fructose 
npx react-native bundle --platform ios --dev false --reset-cache --entry-file fructose/index.js --bundle-output ios/main.jsbundle
mkdir -p ios/build/Build/Products/Release-iphonesimulator/storybooknative.app/
cp ios/main.jsbundle.meta ios/build/Build/Products/Release-iphonesimulator/storybooknative.app/
cp ios/main.jsbundle ios/build/Build/Products/Release-iphonesimulator/storybooknative.app/
react-native run-ios --no-packager --configuration Release
PACKAGER_PID=$!
npx dextrose run --config ./dextrose/dextrose.ios.js --snapshotWait 2000
kill -9 $PACKAGER_PID
xcrun simctl shutdown booted
