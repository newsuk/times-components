const path = require("path");
const webpack = require("webpack");
const {readFileSync} = require("fs");
const babelrc = JSON.parse(readFileSync("./.babelrc", "utf8"));
const {dev} = require('./package.json');

const babelConfig = {
  ...babelrc,
  plugins: [
    ...babelrc.plugins,
    "react-native-web"
  ]
};

function externals(ctx, path, cb) {
  if ( path.match(/\./) ) {
    return cb();
  }


  if ( path.match(/^@times-components\/utils/) ) {
    return cb(null, 'commonjs ' + path);
  }

  if ( path.match(/^@times-components/) ) {
    return cb(null, 'commonjs ' + path+"/rnw");
  }

  cb(null, 'commonjs ' + path);
}

module.exports = {
  mode: "development",
  target: "node",
  resolve: {
    alias: {
      "react-native": "react-native-web"
    },
    extensions: [".web.js", ".js"],
    mainFields: ["dev", "module", "main"]
  },
  externals,
  entry: {
    index: require.resolve('./'+dev),
  },
  output: {
    path: path.resolve(__dirname, 'dist/rnw'),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_module)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
};
