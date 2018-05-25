import path from "path";

export default ({ readFileSync, existsSync }, resolve) => {
  const parseJson = pathToJson =>
    existsSync(pathToJson) ? JSON.parse(readFileSync(path).toString()) : {};

  const getBabelConfig = dir => {
    const babelrcPath = path.resolve(dir, ".babelrc");
    const babelrc = parseJson(babelrcPath);
    return {
      ...babelrc,
      plugins: [...(babelrc.plugins || []), "react-native-web"]
    };
  };

  const getEntry = (dir, entry) => {
    const pathToPackage = path.resolve(dir, "package.json");
    const packageJson = parseJson(pathToPackage);
    const entryPoint = packageJson[entry];

    if (!entryPoint) {
      throw new Error(`entrypoint "${entry}" not found in "${pathToPackage}".`);
    }

    const main = path.resolve(dir, packageJson[entry]);

    try {
      const generic = resolve(main);

      const web = generic.replace(".js", ".web.js");
      return existsSync(web) ? web : generic;
    } catch (_) {
      throw new Error(
        `could not resolve "${main}". Make sure "${entry}" in "${
          pathToPackage
        }" points to the right file`
      );
    }
  };

  function externals(_, filePath, cb) {
    if (filePath.match(/\./)) {
      return cb();
    }

    if (filePath.match(/^@times-components/)) {
      return cb(null, `commonjs2 ${filePath}/rnw`);
    }

    return cb(null, `commonjs2 ${filePath}`);
  }

  const configurator = (dir, entry) => ({
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
      path: dir,
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
              ...getBabelConfig(dir)
            }
          }
        }
      ]
    }
  });

  return Object.assign(configurator, {
    getEntry,
    getBabelConfig,
    parseJson,
    externals
  });
};
