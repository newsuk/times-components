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

    if (config.mode === "development") {
      config.resolve = {
        ...config.resolve,
        extensions: [`.ios.js`, ".native.js", ".js"],
        mainFields: ["devModule", "dev", "react-native", "browser", "module", "main"],
      };
    }
    return config;
  }
};
