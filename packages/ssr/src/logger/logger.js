const formatMessage = require("./message-formatter");

/* eslint-disable sort-keys */
const logLevels = {
  silly: 6,
  debug: 5,
  verbose: 4,
  info: 3,
  warn: 2,
  error: 1,
  off: 0
};

const getLogLevelNumber = (logLevel, requestId) => {
  const logLevelStrings = logLevels;
  const logLevelNumber = logLevelStrings[logLevel];
  if (typeof logLevelNumber === "number") {
    return logLevelNumber;
  }
  /* eslint no-console: ["error", { allow: ["log"] }] */
  console.log(
    formatMessage(
      "error",
      `LoggerError: Unable to log at level '${logLevel}'`,
      { requestId }
    )
  );
  return Number.POSITIVE_INFINITY;
};

const loggerFactory = (logLevel, requestId) => {
  const logLevelNumber = getLogLevelNumber(logLevel, requestId);

  return {
    silly(message) {
      if (logLevelNumber >= logLevels.silly) {
        /* eslint no-console: ["error", { allow: ["log"] }] */
        console.log(formatMessage("silly", message, { requestId }));
      }
    },
    debug(message) {
      if (logLevelNumber >= logLevels.debug) {
        console.log(formatMessage("debug", message, { requestId }));
      }
    },
    verbose(message) {
      if (logLevelNumber >= logLevels.verbose) {
        console.log(formatMessage("verbose", message, { requestId }));
      }
    },
    info(message) {
      if (logLevelNumber >= logLevels.info) {
        console.log(formatMessage("info", message, { requestId }));
      }
    },
    warn(message) {
      if (logLevelNumber >= logLevels.warn) {
        console.log(formatMessage("warn", message, { requestId }));
      }
    },
    error(message) {
      if (logLevelNumber >= logLevels.error) {
        console.log(formatMessage("error", message, { requestId }));
      }
    }
  };
};

module.exports = loggerFactory;
