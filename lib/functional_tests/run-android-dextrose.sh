#!/bin/bash
npx appium &
APPIUM_PID=$!
LOCAL=true npx fructose-tunnel
/Users/kourosaliabadi/Library/Android/sdk/tools/emulator @NEXUS_5X_API_22 -no-boot-anim &
EMU_PID=$!
adb wait-for-device
adb reverse tcp:8081 tcp:8081
adb reverse tcp:7811 tcp:7811
adb reverse tcp:4723 tcp:4723
npm run fetch-fonts
npx compile-tests -d fructose
npx rnstl --searchDir ./packages --pattern './*/*.stories.js' --outputFile ./fructose/components.js
react-native run-android --variant=release --no-packager
LOGLEVEL=verbose npx dextrose --config ./dextrose/dextrose.android.js
kill -9 $EMU_PID
kill -9 $APPIUM_PID
