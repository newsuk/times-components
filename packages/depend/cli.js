#!/usr/bin/env node
import { exit } from "process";
import { writeJson, readJson } from "fs-extra";
import getPackages from "./get-packages";
import parser from "./cli-parser";
import main from "./main";

// eslint-disable-next-line no-console
const log = (...args) => console.log(...args);
const argv = parser.parse(process.argv);
main({ log, readJson, writeJson, getPackages, argv, exit });
