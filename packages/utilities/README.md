# Utilities

This is a shared store of component specific utilities.

## Jest

Across the components in the monorepo, we reuse Jest config in a number of places. It makes sense to centralise this. As a result the Jest Configurator was created.

### Usage

Create a file called `jest.config.js` in a platform specific folder under tests. E.g. `<rootDir>/packages/${component}/__tests__/${platform}/jest.config.js`. Then add platform specific code like below.

```js
const Utilities = require("@times-components/utilities");

module.exports = Utilities.jestConfigurator("article", "android");
```

Saving this file in your platform specific tests folder will give you a platform specific Jest config.