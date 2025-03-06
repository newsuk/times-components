# Webpack Configurator

Webpack-configurator only generates a configuration and does not run webpack.

## Usage

```js
// webpack.config.js
module.exports = require("@times-components/webpack-configurator")(
  __dirname, // package-root
  "dev" // entrypoint
);
```
