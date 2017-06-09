'use strict';

const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const inquirer = require('inquirer');
const dashify = require('dashify');
const sortPkg = require('sort-pkg')
const subcommander = require('subcommander');
const mkdirp = require('mkdirp');

const fileTemplates = require('./templates');
const generatePackageJson = require('./package-json');

const repositoryRoot = path.join(__dirname, '../../');

module.exports = () => {
  subcommander.command('add component', {
    desc: 'create a new component',
    callback: addComponent
  });

  subcommander.command('update all components', {
    desc: 'update all components\'s package.json files',
    callback: updateAllComponents
  });

  const multiSubCommand = [
    'add component',
    'update all components',
  ].filter(command => {
    const subcommands = command.split(' ').length;
    return process.argv.slice(2, 2 + subcommands).join(' ') === command;
  })[0];

  if (multiSubCommand) {
    const matchLength = multiSubCommand.split(' ').length;
    process.argv = process.argv
      .slice(0, 2)
      .concat(process.argv.slice(2, 2 + matchLength).join(' '))
      .concat(process.argv.slice(2 + matchLength))
  } else {
    subcommander.usage()
    process.exit(1)
  }

  subcommander.parse();
}

function addComponent() {
  const componentArgument = process.argv[3];
  function onCliAnswers (variables) {
    if (componentArgument) {
      variables.component = componentArgument;
    }
    variables.packageName = dashify(variables.component)

    writeStubFiles(variables);
  }

  inquirer.prompt([
    !componentArgument
      ? { name: 'component', message: 'Component name in ClassCase?' }
      : null,
    { name: 'packageDescription', message: 'Package description?' }
  ].filter(Boolean))
  .then(answers => onCliAnswers(answers))
  .catch(e => { console.error(e) });
}

function updateAllComponents() {
  const packages = fs.readdirSync(path.join(repositoryRoot, 'packages'))
    .filter(pkg => !/^\./.test(pkg));

  packages.forEach(updatePackage);
}

function updatePackage(pkg) {
  const pkgFileName = path.join(repositoryRoot, 'packages', pkg, 'package.json');
  const currentPkg = JSON.parse(fs.readFileSync(pkgFileName, 'utf-8'));
  const variables = _.merge(currentPkg._timesComponentsCliVariables, { version: currentPkg.version });
  const newPkg = generatePackageJson(variables);

  const packageJsonToWrite = sortPkg(_.merge(currentPkg, newPkg));

  fs.writeFileSync(pkgFileName, JSON.stringify(packageJsonToWrite, null, 2));
}

function writeStubFiles(variables) {
  const packageRoot = path.join(repositoryRoot, 'packages', variables.packageName);
  mkdirp.sync(packageRoot);
  fileTemplates(variables).forEach(([ template, fileName ]) => {
    fs.writeFileSync(
      path.join(packageRoot, fileName),
      template(variables)
    );
  });
}
