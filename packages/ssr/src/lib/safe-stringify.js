module.exports = input => JSON.stringify(input).replace(/</g, "\\u003c");
