"use strict";

const cp = require("child_process");
const fs = require("fs");
const path = require("path");

const _ = require("lodash");
const dashify = require("dashify");
const mkdirp = require("mkdirp");
const sortPkg = require("sort-pkg")
const subcommander = require("subcommander");

const fileTemplates = require("./templates");
const generatePackageJson = require("./package-json");

const repositoryRoot = path.join(__dirname, "../../");

module.exports = () => {
  subcommander.command("add component", {
    desc: "create a new component",
    callback: addComponent
  });

  const multiSubCommand = [
    "add component",
  ].filter(command => {
    const subcommands = command.split(" ").length;
    return process.argv.slice(2, 2 + subcommands).join(" ") === command;
  })[0];

  if (multiSubCommand) {
    const matchLength = multiSubCommand.split(" ").length;
    process.argv = process.argv
      .slice(0, 2)
      .concat(process.argv.slice(2, 2 + matchLength).join(" "))
      .concat(process.argv.slice(2 + matchLength))
  } else {
    subcommander.usage()
    process.exit(1)
  }

  subcommander.parse();
}

function addComponent() {
  const component = process.argv[3];
  const packageDescription = process.argv[4];

  const usage = "\n\nUsage:\n$ times-components add component ComponentName \"Component Description\"";
  const argumentOrUsage = (argument, message) => {
    if (!argument) {
      console.error(message + usage);
      process.exit(1);
    }
  };

  argumentOrUsage(component, "Component name required");
  argumentOrUsage(packageDescription != null, "Component description required");

  writeStubFiles({
    component,
    packageDescription,
    packageName: dashify(component),
  });
}

function writeStubFiles(variables) {
  const packageRoot = path.join(repositoryRoot, "packages", variables.packageName);
  mkdirp.sync(packageRoot);
  fileTemplates(variables).forEach(([ template, fileName ]) => {
    fs.writeFileSync(
      path.join(packageRoot, fileName),
      template(variables)
    );
  });
}
