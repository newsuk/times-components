#!/bin/bash
xcrun simctl boot 'iPhone 7'
# npm run fetch-fonts
# ./node_modules/.bin/rnstl --searchDir ./packages --pattern '**/*/*.showcase.js' --outputFile ./fructose/components.js
./node_modules/.bin/react-native bundle --platform ios --dev false --reset-cache --entry-file fructose/index.js --bundle-output ios/main.jsbundle
./node_modules/.bin/react-native run-ios --no-packager --configuration Release
PACKAGER_PID=$!
./node_modules/.bin/dextrose run --config ./dextrose/dextrose.ios.js --snapshotWait 2000
kill -9 $PACKAGER_PID
xcrun simctl shutdown booted
