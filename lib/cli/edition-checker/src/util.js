const fetch = require("node-fetch");

// eslint-disable-next-line prefer-destructuring
exports.today = () => new Date().toISOString().split("T")[0];
exports.unshiftContext = cb =>
  function unshiftContextCallback(...args) {
    return cb(this, ...args);
  };

exports.retry = async function retry(maxRetry, handler, retryHandler) {
  let attempt = 1;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      // eslint-disable-next-line no-await-in-loop
      return await handler();
    } catch (e) {
      if (attempt <= maxRetry) {
        // eslint-disable-next-line no-await-in-loop
        await retryHandler(e, attempt);
        attempt += 1;
      } else {
        throw e;
      }
    }
  }
};

exports.fetchJSON = async function fetchJSON(url) {
  const req = await fetch(url);

  return req.json();
};
