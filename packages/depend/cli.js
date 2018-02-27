#!/usr/bin/env node
import { exit } from "process";
import { writeJson } from "fs-extra";
import getPackages from "./get-packages";
import parser from "./cli-parser";
import main from "./main";

// eslint-disable-next-line no-console
const log = (...args) => console.log(...args);
const argv = parser(process.argv);
main({ log, writeJson, getPackages, argv, exit });
