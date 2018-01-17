#!/bin/bash
npx selenium-standalone install &&
npx selenium-standalone start & 
npm run fetch-fonts  # fetch times fonts
npx lerna run dextrose-clean
npx lerna run dextrose-stories --since
npx rnstl --searchDir ./packages --pattern './*/*.dextrose.tmp.js' --outputFile ./fructose/components.js
npx compile-tests -d fructose -t components.test.js -a components.js # single file for all the tests
npx webpack --config fructose/vendor.webpack.config.js # build vendor package
npx fructose-web -d fructose & # start the fructose web app
FRUCTOSE_WEB_PID=$!
npx dextrose run --config ./dextrose/dextrose.web.js --snapshotWait 2000
npx lerna run dextrose-clean
kill -9 $FRUCTOSE_WEB_PID # close the web app