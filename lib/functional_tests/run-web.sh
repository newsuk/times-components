#!/bin/bash
npm run fetch-fonts  # fetch times fonts
rnstl --searchDir ./ --pattern './packages/*/*.fructose.web.js' --outputFile ./.fructose/components.js # create single file with all the components
npx compile-tests # single file for all the tests
npx webpack --config .fructose/vendor.webpack.config.js # build vendor package
npx fructose-web --build-dir dist/public & # start the fructose web app
WEB=true jest .fructose/components.test.js --setupTestFrameworkScriptFile ./.fructose/setup.js --verbose --forceExit # run the tests
kill -9 $(lsof -ti :3000) # close the web app
