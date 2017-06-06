'use strict';

const handlebars = require('handlebars');

const indexFile = handlebars.compile(`
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
});

export default function {{{component}}} () {
  return (
    <Text>{{{component}}}</Text>
  );
};
`);

const storyFile = handlebars.compile(`
import React from 'react';
import { storiesOf } from '@storybook/react';
import {{{component}}} from './{{{packageName}}}';

storiesOf('{{{component}}}', module)
  .add('{{{component}}}', () => (
    <{{{component}}} />
  ));
`);

const testFile = handlebars.compile(`
import 'react-native';
import React from 'react';
import {{{component}}} from './{{{packageName}}}';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <{{{component}}} />
  ).toJSON();

  expect(tree).to.exist;
});
`);

const packageJsonFile = (variables) => JSON.stringify({
  name: '@lal/' + variables.packageName,
  version: variables.version || '0.0.1',
  description: variables.description,
  main: variables.packageName + '.js',
  scripts: {
    "flow": "node_modules/flow-bin/cli.js",
    "test:dev": "jest --bail --verbose --watch",
    "test": "jest --bail --ci --coverage"
  },
  "jest": {
    "preset": "react-native"
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/newsuk/times-components.git'
  },
  keywords: [ 'react-native-web', 'react', 'native', 'web', variables.packageName, 'component' ],
  author: 'Craig Bilner',
  license: 'BSD-3-Clause',
  bugs: {
    url: 'https://github.com/newsuk/times-components/issues'
  },
  homepage: 'https://github.com/newsuk/times-components#readme',
  devDependencies: {
    "babel-cli": "^6.24.1",
    "babel-core": "6.24.1",
    "babel-loader": "7.0.0",
    "babel-plugin-transform-react-remove-prop-types": "0.4.5",
    "babel-preset-flow": "^6.23.0",
    "babel-preset-react-native": "1.9.2",
    "flow-bin": "^0.42.0",
    "jest": "^20.0.4",
    "react-native": "^0.44.2",
    "react-test-renderer": "^15.5.4",
    "webpack": "2.6.1"
  },
  dependencies: {
    "react": "15.5.4",
    "react-dom": "15.5.4",
    "react-native-web": "0.0.96"
  },
  _timesComponentsCliVariables: variables
}, null, 2);

module.exports = variables => [
  [ indexFile, variables.packageName + '.js' ],
  [ testFile, variables.packageName + '.test.js' ],
  [ storyFile, variables.packageName + '.story.js' ],
  [ packageJsonFile, 'package.json' ],
];

module.exports.packageJson = packageJsonFile;
