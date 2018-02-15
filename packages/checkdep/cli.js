#!/usr/bin/env node
import { exit } from "process";
import { writeJson } from "fs-extra";
import getPackages from "./get-packages";
import { argv } from "./cli-options";
import main from "./main";

// eslint-disable-next-line no-console
const log = (...args) => console.log(...args);
main({ log, writeJson, getPackages, argv, exit });
