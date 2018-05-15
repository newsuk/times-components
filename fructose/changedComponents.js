// eslint-disable-next-line import/no-unresolved
const changedComponents = require("./changedPackages.json");

const componentDirectories = [];

changedComponents.forEach(changedPackage => {
  componentDirectories.push(
    require.resolve(changedPackage.name).split("dist")[0]
  );
});

const output = componentDirectories.toString().replace(",", " ");

console.log(`[ ${output} ]`);
