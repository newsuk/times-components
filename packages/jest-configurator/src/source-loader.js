import * as babelJest from "babel-jest";
import * as fs from "fs";

const readSource = filename => fs.readFileSync(filename).toString();
const isPackageFile = filename => filename.includes("@times-components");
const getPackageCacheKey = filename => `${filename}_${process.hrtime().join('')}`;

const getCacheKey = (src, filename, config, cacheOptions) => (
  isPackageFile(filename)
    ? getPackageCacheKey(filename)
    : babelJest.getCacheKey(src, filename, config, cacheOptions)
);

const processFile = (src, targetFilename, config, processOptions) => {
  let source = src;
  let filename = targetFilename;

  if (isPackageFile(filename)) {
    filename = targetFilename.replace("dist", "src");
    source = readSource(filename);
  }

  return babelJest.process(source, filename, config, processOptions);
};

export {
  getCacheKey,
  processFile as process,
};
