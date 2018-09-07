import path from "path";

export default ({ readFile, exists }, resolve) => {
  const parseJson = async pathToJson =>
    (await exists(pathToJson))
      ? JSON.parse((await readFile(pathToJson, "utf8")).toString())
      : {};

  const getBabelConfig = async dir => {
    const babelrcPath = path.resolve(dir, ".babelrc");
    const babelrc = await parseJson(babelrcPath);
    return {
      ...babelrc,
      plugins: [
        ...(babelrc.plugins || []),
        ["react-native-web", { commonjs: true }]
      ]
    };
  };

  const getEntry = async (dir, entry) => {
    const pathToPackage = path.resolve(dir, "package.json");
    const packageJson = await parseJson(pathToPackage);
    const entryPoint = packageJson[entry];

    if (!entryPoint) {
      throw new Error(`entrypoint "${entry}" not found in "${pathToPackage}".`);
    }

    const main = path.resolve(dir, packageJson[entry]);

    try {
      const generic = resolve(main);

      const web = generic.replace(".js", ".web.js");
      return (await exists(web)) ? web : generic;
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

  const configurator = (dir, entry) => async () => ({
    target: "node",
    devtool: false,
    mode: "production",
    resolve: {
      extensions: [".web.js", ".js"],
      mainFields: ["dev", "module", "main"]
    },
    externals,
    entry: {
      index: await getEntry(dir, entry)
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
              ...(await getBabelConfig(dir))
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
