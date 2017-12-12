#!/bin/bash
npm run fetch-fonts
npx react-native start --root fructose --projectRoots $(pwd)/fructose,$(pwd) &
npx rnstl --searchDir ./packages --pattern './*/*.fructose.ios.js' --outputFile ./fructose/components.js
npx compile-tests -d fructose -t components.test.js
jest fructose/components.test.js --setupTestFrameworkScriptFile ./fructose/setup.ios.js --forceExit --verbose
