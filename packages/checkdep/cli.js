#!/usr/bin/env node
require("babel-register");

const { exit } = require("process");
const { writeJson } = require("fs-extra");
const getPackages = require("./get-packages").default;
const { argv } = require("./cli-options").default;

// eslint-disable-next-line no-console
const log = (...args) => console.log(...args);

require("./main").default({ log, writeJson, getPackages, argv, exit });
