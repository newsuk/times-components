/* eslint-disable no-console */
import chalk from "chalk";
import options from "./cli-options";
import checkdep from "./checkdep";
const { help } = options;

function prettifyHint([name, current, target]) {
  return ` ${chalk.blue(name)}: ${chalk.red(current)} -> ${chalk.green(
    target
  )}`
}

export default async function main({log, getPackages, writeJson, argv}) {
  const packagesList = await getPackages(argv.expr);
  return checkdep(packagesList, argv.strategy ? strategies[argv.strategy] : null)
    .then(({ rules, suggestions, fixedPackages, versionSets }) => {

      if (argv.help) {
        log(help());
        return Promise.resolve();
      }

      if (argv.list) {
        Object.entries(versionSets)
          .map(([name, versions]) => [name, [...versions]])
          .forEach(([name, versions], i) => {
            const color = (() => {
              if (versions.length > 1 && !rules[name]) {
                return chalk.red;
              }

              return !rules[name] ? chalk.green : chalk.yellow;
            })();

            log(chalk.blue(i+1), name, color(versions.join(" ")));
          });
      }

      if (argv.showRules) {
        log(rules);
      }

      if (argv.hint || argv.fix) {
        suggestions.forEach(([path, suggestionList]) => {
          log(path);
          log('  '+
            suggestionList
              .map(prettifyHint)
              .join("\n")
          );
        });
      }

      if (argv.bail && suggestions.length) {
        exit(1);
        return Promise.resolve();
      }

      if (argv.fix) {
        return Promise.all(
          fixedPackages.map(([path, json]) => writeJson(path, json, {spaces:2}))
        );
      }

      return Promise.resolve();
    })
    .catch(e => {
      log(e.toString());
      exit(1);
    });
}
