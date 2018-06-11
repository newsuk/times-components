const fs = require("fs");
// eslint-disable-next-line import/no-unresolved
const changedComponents = require("./changedPackages.json");

const changedComponentsList = () => {
  const componentDirectories = [];

  changedComponents.forEach(changedPackage => {
    componentDirectories.push(
      require.resolve(changedPackage.name).split("dist")[0]
    );
  });

  fs.writeFileSync(
    "./fructose/rnscl.config",
    JSON.stringify(componentDirectories)
  );
};

changedComponentsList();
