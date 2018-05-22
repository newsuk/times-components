const { resolve } = require("path");
const { readFileSync, existsSync } = require("fs");

const parseJson = path => {
  return existsSync(path)
    ? JSON.parse(readFileSync(path, "utf8").toString())
    : {};
}

const babelConfig = dir => {
  const babelrcPath = resolve(dir,'.babelrc');
  const babelrc = parseJson(babelrcPath);
  return {
    ...babelrc,
    plugins: [...babelrc.plugins, "react-native-web"]
  };
};

function getEntry(dir, entry) {
  const packageJson = parseJson(resolve(dir, 'package.json'));
  const generic = require.resolve(`${dir}/${packageJson[entry]}`);
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

module.exports = (dir, entry) => ({
  target: "node",
  devtool: false,
  mode: "production",
  resolve: {
    extensions: [".web.js", ".js"],
    mainFields: ["dev", "module", "main"]
  },
  externals,
  entry: {
    index: getEntry(dir, entry)
  },
  output: {
    path: resolve(dir),
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
            ...babelConfig(dir)
          }
        }
      }
    ]
  }
});
