require("babel-register");

const { writeJson } = require("fs-extra");
const getPackages = require("./get-packages").default;
const { argv } = require("./cli-options").default;
const log = (...args) => console.log(...args);
const exit = code => Process.exit(code);

require("./main").default({ log, writeJson, getPackages, argv, exit });
