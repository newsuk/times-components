const fs = require("fs");
// eslint-disable-next-line import/no-unresolved
const changedComponents = require("./changedPackages.json");

const changedComponentsList = () => {
  const componentDirectories = [];

  changedComponents.forEach(changedPackage => {
    try {
      componentDirectories.push(
        require.resolve(changedPackage.name).split("dist")[0]
      );
    } catch (e) {
      // Module not found
    }
  });

  fs.writeFileSync(
    "./fructose/rnscl.config",
    JSON.stringify(componentDirectories)
  );
};

changedComponentsList();
