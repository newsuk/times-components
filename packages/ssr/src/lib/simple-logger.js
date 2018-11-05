/* eslint-disable no-console */

module.exports = {
  debug: message => console.log("DEBUG:", message),
  error: message => console.log("ERROR:", message),
  info: message => console.log("INFO:", message),
  silly: message => console.log("SILLY:", message),
  verbose: message => console.log("VERBOSE:", message),
  warn: message => console.log("WARN:", message)
};
