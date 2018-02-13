/* eslint-disable no-console */
import chalk from "chalk";
import { writeJson } from "fs-extra";

import checkdep from "./checkdep";
import * as strategies from "./strategies";
import { argv } from './cli-options';

function prettifyHint([name, current, target]) {
  return ` ${chalk.blue(name)}: ${chalk.red(current)} -> ${chalk.green(
    target
  )}`
}

checkdep(argv.expr, argv.strategy ? strategies[argv.strategy] : null)
  .then(({ fixupMap, suggestions, fixedPackages, all }) => {
    if (argv.list) {
      Object.entries(all)
        .map(([name, versions]) => [name, [...versions]])
        .forEach(([name, versions]) => {
          const color = (() => {
            if (versions.length > 1 && !fixupMap[name]) {
              return chalk.red;
            }

            return !fixupMap[name] ? chalk.green : chalk.yellow;
          })();

          console.log(name, color(versions.join(" ")));
        });
    }

    if (argv.showRules) {
      console.log(fixupMap);
    }

    if (argv.hint || argv.fix) {
      suggestions.forEach(([path, suggestionList]) => {
        console.log(path);
        console.log(
          suggestionList
            .map(prettifyHint)
            .join("\n")
        );
      });
    }

    if (argv.bail && suggestions.length) {
      process.exit(1);
    }

    if (argv.fix) {
      return Promise.all(
        fixedPackages.map(([path, json]) => writeJson(path, json))
      );
    }

    return Promise.resolve();
  })
  .catch(e => {
    console.log(e.toString());
    process.exit(1);
  });
