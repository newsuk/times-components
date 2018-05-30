import { readFile, exists } from "fs-extra";
import create from "./configurator";

module.exports = create({ readFile, exists }, require.resolve);
