/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

const { resolve } = require("path");
const { readFileSync, existsSync } = require("fs");
const { dev } = require("./package.json");

const babelrc = JSON.parse(readFileSync("./.babelrc", "utf8"));

const babelConfig = {
  ...babelrc,
  plugins: [...babelrc.plugins, "react-native-web"]
};

function getEntry(entry) {
  const generic = require.resolve(`./${entry}`);
  const web = generic.replace(".js", ".web.js");
  return existsSync(web) ? web : generic;
}

function externals(ctx, path, cb) {
  if (path.match(/\./)) {
    return cb();
  }

  if (path.match(/^@times-components/)) {
    return cb(null, `commonjs2 ${path}/rnw`);
  }

  return cb(null, `commonjs2 ${path}`);
}

module.exports = {
  target: "node",
  devtool: false,
  mode: "production",
  resolve: {
    extensions: [".web.js", ".js"],
    mainFields: ["dev", "module", "main"]
  },
  externals,
  entry: {
    index: getEntry(dev)
  },
  output: {
    path: resolve(__dirname),
    filename: "rnw.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_module)/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            ...babelConfig
          }
        }
      }
    ]
  }
};
