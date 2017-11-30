#!/bin/bash
npx appium &
APPIUM_PID=$!
LOCAL=true npx fructose-tunnel
/Users/kourosaliabadi/Library/Android/sdk/tools/emulator @PIXEL_XL_API_26 -no-boot-anim &
EMU_PID=$!
adb wait-for-device
adb reverse tcp:8081 tcp:8081
adb reverse tcp:7811 tcp:7811
adb reverse tcp:4723 tcp:4723
npm run fetch-fonts
npx compile-tests -d fructose
npx rnstl --searchDir ./packages --pattern './*/*.stories.js' --outputFile ./fructose/components.js
react-native run-android --variant=debug --no-packager
react-native start --root fructose &
sleep 8
LOGLEVEL=verbose npx dextrose --config ./dextrose/dextrose.android.js --snapshotWait 2000
kill -9 $EMU_PID
kill -9 $APPIUM_PID
