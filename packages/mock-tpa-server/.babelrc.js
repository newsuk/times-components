// FIXME: remove once babel-jest supports babel.config.js
module.exports = require('./babel.config')({
  cache: () => {},
  env: () => process.env.NODE_ENV
})
