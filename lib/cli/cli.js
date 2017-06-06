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

const repositoryRoot = path.join(__dirname, '../../');

module.exports = () => {
  subcommander.command('component-add', {
    desc: 'create a new component',
    callback: addComponent
  });

  subcommander.command('component-update-all', {
    desc: 'update all components\'s package.json files',
    callback: updateAllComponents
  });

  subcommander.parse();
}

function addComponent() {
  function onCliAnswers (variables) {
    variables.packageName = dashify(variables.component)

    writeStubFiles(variables);
  }

  inquirer.prompt([
    { name: 'component', message: 'Component name in ClassCase?' },
    { name: 'packageDescription', message: 'Package description?' }
  ])
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
  const newPkg = JSON.parse(fileTemplates.packageJson(variables));

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
