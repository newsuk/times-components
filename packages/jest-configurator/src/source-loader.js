// @flow

import * as babelJest from "babel-jest";
import jestPreset from "babel-preset-jest";
import { transform as babelTransform, util as babelUtil } from "babel-core";
import babelIstanbulPlugin from "babel-plugin-istanbul";
import { readFileSync } from "fs";
import { createHash } from "crypto";
import path from "path";

const readSource = (filename: string): string =>
  readFileSync(filename).toString();

const isPackageFile = (filename: string): boolean =>
  filename.includes("times-components");

const pointToSource = (filename: string): string =>
  filename.replace("dist", "src");

/* Based upon the babel-jest impl, but only
 * changes if raw source code has been updated.
 */
const getPackageCacheKey = (filename: string): string =>
  createHash("md5")
    .update(readSource(pointToSource(filename)))
    .digest("hex");

type Config = {
  cwd: string,
  coveragePathIgnorePatterns: Array<string>
};

const getCacheKey = (
  src: string,
  filename: string,
  config: string,
  cacheOptions: {
    rootDir: string
  }
): string =>
  isPackageFile(filename)
    ? getPackageCacheKey(filename)
    : babelJest.getCacheKey(src, filename, config, cacheOptions);

const transform = (
  src: string,
  targetFilename: string,
  { cwd, coveragePathIgnorePatterns }: Config
): string => {
  let source = src;
  let filename = targetFilename;

  if (isPackageFile(filename)) {
    filename = pointToSource(filename);
    source = readSource(filename);
  }

  if (babelUtil && !babelUtil.canCompile(filename)) {
    return source;
  }

  const transformResult = babelTransform(source, {
    filename,
    plugins: [
      [
        babelIstanbulPlugin,
        {
          cwd: path.join(cwd, "src"),
          exclude: coveragePathIgnorePatterns
        }
      ]
    ],
    presets: [jestPreset]
  });

  return transformResult || source;
};

export { getCacheKey, transform as process };
