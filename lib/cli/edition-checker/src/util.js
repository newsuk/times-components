const fetch = require("node-fetch");

// eslint-disable-next-line prefer-destructuring
exports.today = () => new Date().toISOString().split("T")[0];
exports.unshiftContext = cb =>
  function unshiftContextCallback(...args) {
    return cb(this, ...args);
  };

exports.retry = async function retry(maxAttempts, handler, failureHandler) {
  let attempt = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      // eslint-disable-next-line no-await-in-loop
      return await handler();
    } catch (e) {
      attempt += 1;
      const willRetry = attempt < maxAttempts;

      // eslint-disable-next-line no-await-in-loop
      await failureHandler(e, attempt, willRetry);

      if (!willRetry) {
        throw e;
      }
    }
  }
};

exports.fetchJSON = async function fetchJSON(url) {
  const req = await fetch(url);

  return req.json();
};
