const handlebars = require("handlebars");

const packageJson = require("./package-json");

const indexFile = handlebars.compile(`import React from "react";
import styles from "./styles";

const {{{component}}} = () => (
  <div style={styles.{{{component}}}Body}>{{{component}}}</div>
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

const testEsLintConfigFile = handlebars.compile(`{
  "env": {
    "jest": true
  }
}
`);

const testContainerWebFile = handlebars.compile(`import shared from "../shared";

shared();
`);

const jestConfigFile = () =>
  handlebars.compile(`const jestConfigurator = require("@times-components/jest-configurator-web").default;

module.exports = jestConfigurator(__dirname);
`);

const styleShared = handlebars.compile(`const sharedStyle = {
  {{{component}}}Body: {
    padding: 20
  }
};

export default sharedStyle;
`);

const styleIndex = handlebars.compile(`import sharedStyles from "./shared";

const styles = {
  ...sharedStyles
};

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
yarn test:web
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
  [testEsLintConfigFile, `__tests__/.eslintrc.json`],
  [jestConfigFile("web"), `__tests__/web/jest.config.js`],
  [testContainerWebFile, `__tests__/web/${variables.packageName}.test.js`],
  [styleShared, `src/styles/shared.js`],
  [styleIndex, `src/styles/index.js`],
  [showcaseFile, `${variables.packageName}.showcase.js`],
  [storyFile, `${variables.packageName}.stories.js`],
  [readMeFile, "README.md"],
  [packageJsonFile, "package.json"]
];
