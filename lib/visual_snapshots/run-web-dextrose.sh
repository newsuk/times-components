#!/bin/bash

##setup
npx selenium-standalone install &&
npx selenium-standalone start 2>> selenium.log & 
npm run fetch-fonts

##construct list of changed packages
npx lerna ls --json --since > fructose/changedPackages.json

##get array of changed components∏
node fructose/changedComponents.js

## create components file of all showcase file following pattern
npx rnscl --pattern '*.showcase!(.styles).js' --outputFile ./fructose/components.js --config ./fructose/rnscl.config

## build vendor package
npx webpack --config fructose/vendor.webpack.config.js

##start bundler
npx react-native start --reset-cache &

##run fructose app
npx fructose-web -d ./fructose >> webpack.log &
FRUCTOSE_WEB_PID=$!

##run dextrose
npx dextrose run --config ./dextrose/dextrose.web.js --snapshotWait 2000
kill -9 $FRUCTOSE_WEB_PID # close the web app
