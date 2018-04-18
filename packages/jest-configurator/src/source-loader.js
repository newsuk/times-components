// @flow

import * as babelJest from "babel-jest";
import * as fs from "fs";
import type { CacheKeyOptions, ProjectConfig, TransformOptions } from "jest";

const readSource = (filename: string): string =>
  fs.readFileSync(filename).toString();
const isPackageFile = (filename: string): boolean =>
  filename.includes("@times-components");
const getPackageCacheKey = (filename: string): string =>
  `${filename}_${process.hrtime().join("")}`;

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
    filename = targetFilename.replace("dist", "src");
    source = readSource(filename);
  }

  return babelJest.process(source, filename, config, options);
};

export { getCacheKey, transform as process };
