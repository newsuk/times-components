#!/bin/bash
npm run fetch-fonts
npx rnstl --searchDir ./packages --pattern './*/*.fructose.ios.js' --outputFile ./.fructose/components.js
npx compile-tests
IOS=true jest .fructose/components.test.js --setupTestFrameworkScriptFile ./.fructose/setup.js --forceExit --verbose