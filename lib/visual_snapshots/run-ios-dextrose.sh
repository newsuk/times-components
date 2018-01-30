#!/bin/bash
xcrun simctl boot 'iPhone 7'
npx lerna run dextrose-clean
npx lerna run dextrose-stories --since
npm run fetch-fonts
npx rnstl --searchDir ./packages --pattern './*/*.dextrose.tmp.js' --outputFile ./fructose/components.js
npx compile-tests -d fructose
export CWD=$(pwd) 
export FRC=$CWD/fructose 
npx react-native start --root fructose --projectRoots $(pwd)/fructose,$(pwd) &
react-native run-ios --no-packager
PACKAGER_PID=$!
LOGLEVEL=verbose npx dextrose run --config ./dextrose/dextrose.ios.js --snapshotWait 2000
npx lerna run dextrose-clean
kill -9 $PACKAGER_PID
xcrun simctl shutdown booted
