const babelJest = require("babel-jest");
const fs = require("fs");

const readSource = filename => fs.readFileSync(filename).toString();
const isPackageFile = filename => filename.includes("@times-components");
const getPackageCacheKey = filename => `${filename}_${process.hrtime().join('')}`;

module.exports = {
  getCacheKey(src, filename, config, cacheOptions) {
    return isPackageFile(filename)
      ? getPackageCacheKey(filename)
      : babelJest.getCacheKey(src, filename, config, cacheOptions);
  },

  process(src, targetFilename, config, processOptions) {
    let source = src;
    let filename = targetFilename;

    if (isPackageFile(filename)) {
      filename = targetFilename.replace("dist", "src");
      source = readSource(filename);
    }

    return babelJest.process(source, filename, config, processOptions);
  },
};
