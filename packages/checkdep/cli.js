require("babel-polyfill");
require("babel-register");


const { writeJson } = require("fs-extra");
const getPackages = require("./get-packages").default;
const { argv } = require("./cli-options").default;
const log = (...args) => console.log(...args);


require("./main").default({log, writeJson, getPackages, argv});
