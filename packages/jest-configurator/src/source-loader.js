const babelJest = require("babel-jest");
const crypto = require("crypto");
const fs = require("fs");

const readSource = filename => fs.readFileSync(filename).toString();
const isPackageFile = filename => filename.includes("@times-components");
const getRandomKey = () => crypto.createHash('sha256').update(process.hrtime().join('')).digest();

module.exports = {
  getCacheKey(src, filename, config, cacheOptions) {
    return isPackageFile(filename) ? getRandomKey() : babelJest.getCacheKey(src, filename, config, cacheOptions);
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
