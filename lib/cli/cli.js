const fs = require("fs-extra");
const path = require("path");

const dashify = require("dashify");
const mkdirp = require("mkdirp");
const subcommander = require("subcommander");

const editionChecker = require("./edition-checker");
const fileTemplates = require("./templates");

const repositoryRoot = path.join(__dirname, "../../");

function writeStubFiles(variables) {
  const packageRoot = path.join(
    repositoryRoot,
    "packages",
    variables.packageName
  );

  mkdirp.sync(packageRoot);
  mkdirp.sync(`${packageRoot}/__tests__/web`);
  mkdirp.sync(`${packageRoot}/src`);
  mkdirp.sync(`${packageRoot}/src/styles`);

  fileTemplates(variables).forEach(([template, fileName]) => {
    fs.writeFileSync(path.join(packageRoot, fileName), template(variables));
  });

  fs.copy(path.join(__dirname, "/files"), packageRoot);
}

function addComponent(opts) {
  const component = opts[0];
  const packageDescription = opts[1];

  const usage =
    '\n\nUsage:\n$ times-components create component ComponentName "Component Description"';
  const argumentOrUsage = (argument, message) => {
    if (!argument) {
      console.error(message + usage);
      process.exit(1);
    }
  };

  const rComponent = /^([A-Z][a-z]*)+$/;
  //
  argumentOrUsage(component, "Component name required");
  argumentOrUsage(
    rComponent.test(component),
    "Use ClassCase for the component name"
  );
  argumentOrUsage(packageDescription, "Component description required");

  writeStubFiles({
    component,
    packageDescription,
    packageName: dashify(component)
  });
}

module.exports = function cli(args) {
  subcommander
    .command("create", { desc: "code generator" })
    .command("component", {
      desc: "create a new component",
      callback: addComponent
    });

  editionChecker(subcommander, "check");

  subcommander.parse(args);
};
