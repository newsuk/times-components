#!/bin/bash
npm run fetch-fonts
react-native start --root fructose &
npx rnstl --searchDir ./packages --pattern './*/*.fructose.ios.js' --outputFile ./fructose/components.js
npx compile-tests
jest fructose/components.test.js --setupTestFrameworkScriptFile ./fructose/setup.ios.js --forceExit --verbose

