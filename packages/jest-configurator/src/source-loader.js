const babelJest = require("babel-jest");
const fs = require("fs");

const readSource = filename => fs.readFileSync(filename).toString();

module.exports = {
    process(src, targetFilename, config, transformOptions) {
      const isPackageFile = targetFilename.includes("@times-components");
      let source = src;
      let filename = targetFilename;

      if (isPackageFile) {
        filename = targetFilename.replace("dist", "src");
        source = readSource(filename);
        config.cache = false;
        transformOptions.cache = false;
      }

      return babelJest.process(source, filename, config, transformOptions);
  },
};
