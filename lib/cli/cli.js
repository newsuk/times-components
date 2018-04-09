const fs = require("fs-extra");
const path = require("path");

const dashify = require("dashify");
const mkdirp = require("mkdirp");
const subcommander = require("subcommander");

const fileTemplates = require("./templates");

const repositoryRoot = path.join(__dirname, "../../");

function writeStubFiles(variables) {
  const packageRoot = path.join(
    repositoryRoot,
    "packages",
    variables.packageName
  );
  mkdirp.sync(packageRoot);
  mkdirp.sync(`${packageRoot}/src`);
  // Adding platform specific test folders
  mkdirp.sync(`${packageRoot}/src/__tests__/android`);
  mkdirp.sync(`${packageRoot}/src/__tests__/ios`);
  mkdirp.sync(`${packageRoot}/src/__tests__/web`);
  mkdirp.sync(`${packageRoot}/src/styles`);

  fileTemplates(variables).forEach(([template, fileName]) => {
    fs.writeFileSync(path.join(packageRoot, fileName), template(variables));
  });

  fs.copy(path.join(__dirname, "/files"), packageRoot);
}

function addComponent() {
  const component = process.argv[3];
  const packageDescription = process.argv[4];

  const usage =
    '\n\nUsage:\n$ times-components create component ComponentName "Component Description"';
  const argumentOrUsage = (argument, message) => {
    if (!argument) {
      console.error(message + usage); // eslint-disable-line no-console
      process.exit(1);
    }
  };

  const rComponent = /^([A-Z][a-z]*)+$/;

  argumentOrUsage(component, "Component name required");
  argumentOrUsage(
    rComponent.test(component),
    "Use ClassCase for the component name"
  );
  argumentOrUsage(
    packageDescription !== null,
    "Component description required"
  );

  writeStubFiles({
    component,
    packageDescription,
    packageName: dashify(component)
  });
}

module.exports = () => {
  subcommander.command("create component", {
    desc: "create a new component",
    callback: addComponent
  });

  const multiSubCommand = ["create component"].filter(command => {
    const subcommands = command.split(" ").length;
    return process.argv.slice(2, 2 + subcommands).join(" ") === command;
  })[0];

  if (multiSubCommand) {
    const matchLength = multiSubCommand.split(" ").length;
    process.argv = process.argv
      .slice(0, 2)
      .concat(process.argv.slice(2, 2 + matchLength).join(" "))
      .concat(process.argv.slice(2 + matchLength));
  } else {
    subcommander.usage();
    process.exit(1);
  }

  subcommander.parse();
};
