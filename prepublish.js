/* eslint no-console:off */

const babel = require("babel-core");
const path = require("path");
const fs = require("fs");

function getComponentFiles(filter, callback) {
  const startPath = "./packages";
  if (!fs.existsSync(startPath)) {
    console.error(startPath, " does not exist");
    return;
  }

  const files = fs.readdirSync(startPath);
  files
    .map(file => path.join(startPath, file))
    .filter(filename => {
      const isDirectory = fs.lstatSync(filename).isDirectory();
      return isDirectory;
    })
    .forEach(directory => {
      const dir = fs.readdirSync(directory);
      dir.forEach(file => {
        const pathToFile = path.join(directory, file);
        if (filter.test(pathToFile)) {
          callback(pathToFile);
        }
      });
    });
}

function writeFile(babelErr, result) {
  const filename = result.options.filename;
  console.log(`Writing ${filename}`);
  if (babelErr) {
    console.error(babelErr);
  } else {
    const compiledLocation = filename.replace(/((\.web)?\.js)/, ".es5$1");
    fs.writeFile(compiledLocation, result.code, writeErr => {
      if (writeErr) {
        console.log(writeErr);
      } else {
        console.log(`${filename} written`);
      }
    });
  }
}

getComponentFiles(/(\/|^)[\w-]+(\.web)?\.js$/, filename => {
  console.log(`Transforming ${filename}`);
  babel.transformFile(filename, writeFile);
});
