import { readFile, exists } from "fs-extra";
import create from "./configurator";

module.exports = create(
  {
    exists,
    readFile
  },
  require.resolve
);
