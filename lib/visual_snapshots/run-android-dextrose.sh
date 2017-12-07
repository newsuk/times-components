#!/bin/bash
npx appium &
APPIUM_PID=$!
LOCAL=true npx fructose-tunnel
emulator @NEXUS_5X_API_22 -no-boot-anim &
EMU_PID=$!
adb wait-for-device
adb reverse tcp:8081 tcp:8081
adb reverse tcp:7811 tcp:7811
adb reverse tcp:4723 tcp:4723
npm run fetch-fonts
npx lerna run dextrose-stories --since
npx compile-tests -d fructose
npx rnstl --searchDir ./packages --pattern './*/*.stories.js' --outputFile ./fructose/components.js
react-native start --root fructose &
react-native run-android --variant=debug --no-packager
LOGLEVEL=verbose npx dextrose --config ./dextrose/dextrose.android.js --timeout 600000  --snapshotWait 2000
npx lerna run dextrose-clean
kill -9 $EMU_PID
kill -9 $APPIUM_PID
