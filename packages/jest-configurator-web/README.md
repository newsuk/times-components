# Jest

Across the components in the monorepo, we reuse Jest config in a number of
places. It makes sense to centralise this. As a result the Jest Configurator was
created.

## Usage

Create a file called `jest.config.js` in your folder under tests.
E.g. `<rootDir>/packages/${component}/__tests__/web/jest.config.js`.
Then add code like below.

```js
const jestConfiguratorWeb = require("@times-components/jest-configurator-web");

module.exports = jestConfiguratorWeb(__dirname);
```

Saving this file in your tests folder will give you a Jest config.
