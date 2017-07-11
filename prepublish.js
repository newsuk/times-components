/* eslint no-console:off, import/no-unresolved:off */

const babelify = require("babelify");
const path = require("path");
const fs = require("fs");
const browserify = require("browserify");
const rowFlow = require("browserify-row-flow");
const globalShim = require("browserify-global-shim");

globalShim.configure({
  react: "React",
  "react-dom": "ReactDOM"
});

function getComponentFiles(filter, callback) {
  const startPath = "./packages";
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
          console.log(`Found ${pathToFile}`);
          callback(pathToFile);
        }
      });
    });
}

function bundleFile(filename) {
  console.log(filename);
  console.log(`Bundling ${filename}`);

  const compiledFilename = filename.replace(/((\.web)?\.js)/, ".es5$1");
  const writeStream = fs.createWriteStream(compiledFilename);
  writeStream.on("finish", () => {
    console.log(`Completed browserifying ${filename}`);
  });

  browserify(filename)
    .transform(babelify)
    .transform(globalShim)
    .plugin(rowFlow().plugin())
    .bundle()
    .pipe(writeStream);
}

// getComponentFiles(/(\/|^)[\w-]+(\.web)?\.js$/, bundleFile);
bundleFile("./packages/brightcove-video/brightcove-video.web.js");
