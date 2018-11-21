import * as babelJest from "babel-jest";
import jestPreset from "babel-preset-jest";
import { transform as babelTransform, util as babelUtil } from "babel-core";
import babelIstanbulPlugin from "babel-plugin-istanbul";
import { readFileSync } from "fs";
import { createHash } from "crypto";
import path from "path";

const readSource = filename => readFileSync(filename).toString();

const isPackageFile = filename => filename.includes("times-components");

const pointToSource = filename => filename.replace("dist", "src");

/* Based upon the babel-jest impl, but only
 * changes if raw source code has been updated.
 */
const getPackageCacheKey = filename =>
  createHash("md5")
    .update(readSource(pointToSource(filename)))
    .digest("hex");

const getCacheKey = (src, filename, config, cacheOptions) =>
  isPackageFile(filename)
    ? getPackageCacheKey(filename)
    : babelJest.getCacheKey(src, filename, config, cacheOptions);

const transform = (
  src,
  targetFilename,
  { cwd, coveragePathIgnorePatterns }
) => {
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
