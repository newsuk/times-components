#!/bin/bash

##setup
LOCAL=true npx fructose-tunnel
emulator @Nexus_5X_API_25 -no-boot-anim &
EMU_PID=$!
adb wait-for-device
adb reverse tcp:8081 tcp:8081
adb reverse tcp:7811 tcp:7811
adb reverse tcp:4723 tcp:4723
npm run fetch-fonts

##construct list of changed packages
npx lerna ls --json --since > fructose/changedPackages.json

##get array of changed components
node fructose/changedComponents.js

## create components file of all showcase file following pattern
npx rnscl --stacktrace --pattern '*.showcase!(.web|.styles).js' --outputFile ./fructose/components.js --config ./fructose/rnscl.config

./node_modules/.bin/react-native start --root $(pwd)/fructose --projectRoots $(pwd)/fructose,$(pwd) --reset-cache &
./node_modules/.bin/react-native run-android --no-packager
##run dextrose
npx dextrose run --config ./dextrose/dextrose.android.js --timeout 600000  --snapshotWait 2000
kill -9 $EMU_PID
