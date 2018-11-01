const jsonStringifySafe = require("json-stringify-safe");

module.exports = (level, input, meta) => {
  if (typeof input === "string") {
    return jsonStringifySafe({
      level,
      message: input,
      meta
    });
  }

  if (input instanceof Error) {
    return jsonStringifySafe({
      level,
      message: input.message,
      meta,
      stack: input.stack
    });
  }

  return jsonStringifySafe({
    data: input.data,
    error: input.error && {
      message: input.error.message,
      stack: input.error.stack
    },
    level,
    message: input.message,
    meta
  });
};
