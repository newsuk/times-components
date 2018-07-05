import { createWebpackConfig } from "haul";

export default {
  webpack: env => {
    const config = createWebpackConfig(({ platform }) => ({
      entry: `./index.${platform}.js`
    }))({
      ...env,
      initializeCoreLocation:
        "../node_modules/react-native/Libraries/Core/InitializeCore.js"
    });

    config.module.rules[1].exclude = /\.\.\/node_modules(?!.*[\/\\](react|@expo|pretty-format|haul|metro))/;

    return config;
  }
};
