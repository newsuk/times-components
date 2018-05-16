# #!/bin/bash
xcrun simctl boot 'iPhone 7'

# ##font crap
npm run fetch-fonts

##construct list of changed packages
npx lerna ls --json --since > fructose/changedPackages.json

##get array of changed components
OUTPUT="$(node fructose/changedComponents.js)"

## create components file of all showcase file following pattern
npx rnscl --searchDir ${OUTPUT} --pattern '*.showcase!(.web|.styles).js' --outputFile ./fructose/components.js

##create bundle
./node_modules/.bin/react-native bundle --platform ios --dev false --reset-cache --entry-file ./fructose/index.js --bundle-output ios/main.jsbundle
PACKAGER_PID=$!

##build app
./node_modules/.bin/react-native run-ios --configuration Release --no-packager

##run dextrose
./node_modules/.bin/dextrose run --config ./dextrose/dextrose.ios.js --snapshotWait 2000 --loglevel verbose
kill -9 $PACKAGER_PID
xcrun simctl shutdown booted
