// @flow

import * as babelJest from "babel-jest";
import * as fs from "fs";
import * as crypto from "crypto";
import type { CacheKeyOptions, ProjectConfig, TransformOptions } from "jest";

const readSource = (filename: string): string =>
  fs.readFileSync(filename).toString();

const isPackageFile = (filename: string): boolean =>
  filename.includes("@times-components");

const pointToSource = (filename: string): boolean =>
  filename.replace("dist", "src");

/* Based upon the babel-jest impl, but only
 * changes if raw source code has been updated.
 */
const getPackageCacheKey = (filename: string): string =>
  crypto
    .createHash("md5")
    .update(readSource(pointToSource(filename)))
    .digest("hex");

const getCacheKey = (
  src: string,
  filename: string,
  config: string,
  cacheOptions: CacheKeyOptions
): string =>
  isPackageFile(filename)
    ? getPackageCacheKey(filename)
    : babelJest.getCacheKey(src, filename, config, cacheOptions);

const transform = (
  src: string,
  targetFilename: string,
  config: ProjectConfig,
  options: TransformOptions
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
