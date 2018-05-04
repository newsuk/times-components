#!/bin/bash
npx selenium-standalone install &&
npx selenium-standalone start 2>> selenium.log & 
npm run fetch-fonts
npx rnscl --searchDir ./packages --pattern './*/*showcase*' --outputFile ./fructose/components.js
npx react-native start --reset-cache &
npx fructose-web -d ./fructose >> webpack.log &
FRUCTOSE_WEB_PID=$!
npx dextrose run --config ./dextrose/dextrose.web.js --snapshotWait 2000
kill -9 $FRUCTOSE_WEB_PID # close the web app
