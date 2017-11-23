#!/bin/bash
npm run fetch-fonts  # fetch times fonts
rnstl --searchDir ./ --pattern './packages/*/*.fructose.web.js' --outputFile ./fructose/components.js # create single file with all the components
npx compile-tests -d fructose -t components.test.js -a components.js # single file for all the tests
npx webpack --config fructose/vendor.webpack.config.js # build vendor package
npx fructose-web -d fructose & # start the fructose web app
FRUCTOSE_WEB_PID=$!
jest fructose/components.test.js --setupTestFrameworkScriptFile ./fructose/setup.web.js --verbose --forceExit --no-cache # run the tests
kill -9 $FRUCTOSE_WEB_PID # close the web app
