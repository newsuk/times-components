const handlebars = require("handlebars");

const packageJson = require("./package-json");

const indexFile = handlebars.compile(`import React from "react";
import { Text } from "react-native";
import styles from "./styles";

const {{{component}}} = () => (
  <Text style={styles.{{{component}}}Body}>{{{component}}}</Text>
);

export default {{{component}}};
`);

const showcaseFile = handlebars.compile(`import React from "react";
import {{{component}}} from "./src/{{{packageName}}}";

export default {
  children: [
    {
      component: () => <{{{component}}} />,
      name: "{{{component}}}",
      type: "story"
    }
  ],
  name: "{{{component}}}"
};
`);

const storyFile = handlebars.compile(`import { showcaseConverter } from "@times-components/storybook";
import showcase from "./{{{packageName}}}.showcase";

showcaseConverter(module, showcase);
`);

const testsFile = handlebars.compile(`import React from "react";
  import TestRenderer from "react-test-renderer";
  import { iterator } from "@times-components/test-utils";
  import {{{component}}} from "../src/{{{packageName}}}";

  export default () => {
    const tests = [
      {
        name: "renders correctly",
        test: () => {
          const testInstance = TestRenderer.create(
            <{{{component}}} />
          );

          expect(testInstance.toJSON()).toMatchSnapshot();
        }
      }
    ];
    iterator(tests);
  };
`);

const testsNative = handlebars.compile(`import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print
  } from "@times-components/jest-serializer";
  import shared from "./shared.base";

  export default () => {
    addSerializers(
      expect,
      compose(
        print,
        minimalNativeTransform,
        minimaliseTransform((value, key) => key === "style" || key === "testID")
      )
    );

    shared();
  };
`);

const testsWeb = handlebars.compile(`import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
  import shared from "./shared.base";

  export default () => {
    addSerializers(
      expect,
      compose(
        print,
        minimalWebTransform,
        minimaliseTransform(
          (value, key) =>
            key === "style" || key === "className" || key === "data-testid"
        )
      )
    );

    shared();
  };
`);

const testEsLintConfigFile = handlebars.compile(`{
  "env": {
    "jest": true
  }
}
`);

const testContainerWebFile = handlebars.compile(`import shared from "../shared.web";

shared();
`);

const testContainerNativeFile = handlebars.compile(`import shared from "../shared.native";

shared();
`);

const jestConfigFile = platform =>
  handlebars.compile(`const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("${platform}", __dirname);
`);

const styleShared = handlebars.compile(`const sharedStyle = {
  {{{component}}}Body: {
    padding: 20
  }
};

export default sharedStyle;
`);

const styleIndex = handlebars.compile(`import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles
});

export default styles;
`);

const styleWeb = handlebars.compile(`import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  {{{component}}}Body: {
    ...sharedStyles.{{{component}}}Body,
    color: "blue"
  }
});

export default styles;
`);

const styleAndroid = handlebars.compile(`import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  {{{component}}}Body: {
    ...sharedStyles.{{{component}}}Body,
    color: "green"
  }
});

export default styles;
`);

const readMeFile = handlebars.compile(`# {{{component}}}

<!-- Add the description of the package here. -->

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before contributing to this
package

## Running the code

Please see our main [README.md](../README.md) to get the project running locally

## Development

The code can be formatted and linted in accordance with the agreed standards.

\`\`\`
yarn fmt
yarn lint
\`\`\`

## Link to Render project
\`\`\`
yarn watch
\`\`\`

To link the package to render project run \`yarn watch\`, make some code change and restart the server

## Testing

Testing can be done on each platform individually

\`\`\`
yarn test:android
yarn test:ios
yarn test:web
\`\`\`

Or the tests for all platforms can be run

\`\`\`
yarn test:all
\`\`\`

Visit the official

<!-- Add the storybook link here. -->

## Future

<!-- Add details of future development here. -->
`);

const packageJsonFile = variables =>
  `${JSON.stringify(packageJson(variables), null, 2)}\n`;

module.exports = variables => [
  [indexFile, `src/${variables.packageName}.js`],
  [testsFile, `__tests__/shared.base.js`],
  [testsNative, `__tests__/shared.native.js`],
  [testsWeb, `__tests__/shared.web.js`],
  [testEsLintConfigFile, `__tests__/.eslintrc.json`],
  [jestConfigFile("android"), `__tests__/android/jest.config.js`],
  [jestConfigFile("ios"), `__tests__/ios/jest.config.js`],
  [jestConfigFile("web"), `__tests__/web/jest.config.js`],
  [
    testContainerNativeFile,
    `__tests__/android/${variables.packageName}.test.js`
  ],
  [testContainerNativeFile, `__tests__/ios/${variables.packageName}.test.js`],
  [testContainerWebFile, `__tests__/web/${variables.packageName}.test.js`],
  [styleShared, `src/styles/shared.js`],
  [styleIndex, `src/styles/index.js`],
  [styleWeb, `src/styles/index.web.js`],
  [styleAndroid, `src/styles/index.android.js`],
  [showcaseFile, `${variables.packageName}.showcase.js`],
  [storyFile, `${variables.packageName}.stories.js`],
  [readMeFile, "README.md"],
  [packageJsonFile, "package.json"]
];
