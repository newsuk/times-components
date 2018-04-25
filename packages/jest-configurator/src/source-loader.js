// @flow

import * as babelJest from "babel-jest";
import { readFileSync } from "fs";
import { createHash } from "crypto";

const readSource = (filename: string): string =>
  readFileSync(filename).toString();

const isPackageFile = (filename: string): boolean =>
  filename.includes("@times-components");

const pointToSource = (filename: string): string =>
  filename.replace("dist", "src");

/* Based upon the babel-jest impl, but only
 * changes if raw source code has been updated.
 */
const getPackageCacheKey = (filename: string): string =>
  createHash("md5")
    .update(readSource(pointToSource(filename)))
    .digest("hex");

const getCacheKey = (
  src: string,
  filename: string,
  config: string,
  cacheOptions: {}
): string =>
  isPackageFile(filename)
    ? getPackageCacheKey(filename)
    : babelJest.getCacheKey(src, filename, config, cacheOptions);

const transform = (
  src: string,
  targetFilename: string,
  config: {},
  options: {}
): string => {
  let source = src;
  let filename = targetFilename;

  if (isPackageFile(filename)) {
    filename = pointToSource(filename);
    source = readSource(filename);
  }

  return babelJest.process(source, filename, config, options);
};

export { getCacheKey, transform as process };
