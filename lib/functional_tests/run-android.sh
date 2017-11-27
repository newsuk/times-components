#!/bin/bash
npx appium &
APPIUM_PID=$!
LOCAL=true npx fructose-tunnel
emulator @fructose_device -no-boot-anim &
EMU_PID=$!
adb wait-for-device
adb reverse tcp:8081 tcp:8081
adb reverse tcp:7811 tcp:7811
adb reverse tcp:4723 tcp:4723
react-native run-android --variant=release --no-packager
npm run fetch-fonts
npx rnstl --searchDir ./packages --pattern './*/*.fructose.android.js' --outputFile ./fructose/components.js
npx compile-tests -d fructose
jest fructose/components.test.js --setupTestFrameworkScriptFile ./fructose/setup.android.js --forceExit --verbose
kill -9 $EMU_PID
kill -9 $APPIUM_PID
