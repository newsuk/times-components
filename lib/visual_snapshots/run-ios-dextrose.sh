#!/bin/bash
xcrun simctl boot 'iPhone 7'
npm run fetch-fonts
npx rnscl --searchDir ./packages --pattern '**/*/*.showcase!(.web|.styles).js' --outputFile ./fructose/components.js
./node_modules/.bin/react-native bundle --platform ios --dev false --reset-cache --entry-file ./fructose/index.js --bundle-output ios/main.jsbundle
PACKAGER_PID=$!
./node_modules/.bin/react-native run-ios --configuration Release --no-packager
./node_modules/.bin/dextrose run --config ./dextrose/dextrose.ios.js --snapshotWait 2000 --loglevel verbose
kill -9 $PACKAGER_PID
xcrun simctl shutdown booted

