import { readFileSync, existsSync } from "fs";
import create from "./configurator";

module.exports = create({ readFileSync, existsSync }, require.resolve);
