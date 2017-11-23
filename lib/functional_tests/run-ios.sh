#!/bin/bash
npm run fetch-fonts
npx rnstl --searchDir ./packages --pattern './*/*.fructose.ios.js' --outputFile ./.fructose/components.js
npx compile-tests
export CWD=$(pwd) 
export FRC=$CWD/.fructose 
react-native start --projectRoots $CWD,$FRC --resetCache&
PACKAGER_PID=$!
jest .fructose/components.test.js --setupTestFrameworkScriptFile ./.fructose/setup.ios.js --forceExit --verbose
TEST_EXIT_CODE=$?
kill -9 $PACKAGER_PID
exit $TEST_EXIT_CODE