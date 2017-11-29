#!/bin/bash
npx selenium-standalone install &&
npx selenium-standalone start & 
npm run fetch-fonts  # fetch times fonts
npx rnstl --searchDir ./packages --pattern './*/*.stories.js' --outputFile ./fructose/components.js
npx compile-tests -d fructose -t components.test.js -a components.js # single file for all the tests
npx webpack --config fructose/vendor.webpack.config.js # build vendor package
npx fructose-web -d fructose & # start the fructose web app
FRUCTOSE_WEB_PID=$!
LOGLEVEL=verbose npx dextrose --config ./dextrose/dextrose.web.js
kill -9 $FRUCTOSE_WEB_PID # close the web app