#!/bin/bash
xcrun simctl boot 'iPhone 7'
npm run fetch-fonts
npx rnstl --searchDir ./packages --pattern './*/*.stories.js' --outputFile ./fructose/components.js
npx compile-tests -d fructose
export CWD=$(pwd) 
export FRC=$CWD/fructose 
npx react-native start --root fructose --resetCache &
PACKAGER_PID=$!
LOGLEVEL=verbose npx dextrose --config ./dextrose/dextrose.ios.js
kill -9 $PACKAGER_PID
xcrun simctl shutdown booted