# #!/bin/bash
xcrun simctl boot 'iPhone 7'

# ##font crap
npm run fetch-fonts

##construct list of changed packages
npx lerna ls --json --since > fructose/changedPackages.json

##get array of changed components
node fructose/changedComponents.js

## create components file of all showcase file following pattern
npx rnscl --stacktrace --pattern '*.showcase!(.web|.styles).js' --outputFile ./fructose/components.js --config ./fructose/rnscl.config

./node_modules/.bin/react-native start --root $(pwd)/fructose --projectRoots $(pwd)/fructose,$(pwd) --reset-cache &
./node_modules/.bin/react-native run-ios --no-packager

##run dextrose
./node_modules/.bin/dextrose run --config ./dextrose/dextrose.ios.js --snapshotWait 2000 --loglevel verbose
kill -9 $PACKAGER_PID

