/* eslint-disable no-console */
import chalk from "chalk";
import { join } from "path";
import depend from "./depend";
import graph from "./graph";
import * as strategies from "./strategies";

function prettifyHint([name, current, target]) {
  return ` ${chalk.blue(name)}: ${chalk.red(current)} -> ${chalk.green(
    target
  )}`;
}

function pickOverride(str = "") {
  const [name, version] = str.split("@");
  return { [name]: version };
}

export default async function main({
  log,
  getPackages,
  readJson,
  writeJson,
  argv,
  exit
}) {
  const lernaPackages = argv.lerna
    ? await readJson(join(argv.lerna, "lerna.json"))
        .then(lerna => lerna.packages)
        .then(packages =>
          packages.map(expr => join(argv.lerna, expr, "package.json"))
        )
    : [];

  const packagesToFind = [...lernaPackages, argv.expr].filter(x => x);

  const packagesList = await Promise.all(
    packagesToFind.map(path => getPackages(path))
  ).then(packages => packages.flatten());

  return depend(
    packagesList,
    argv.strategy ? strategies[argv.strategy] : null,
    pickOverride(argv.pick)
  )
    .then(
      ({ requirements, rules, suggestions, fixedPackages, versionSets }) => {
        if (argv.graph) {
          log(graph(requirements, argv.graph));
          Promise.resolve(0);
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

              log(chalk.blue(i + 1), name, color(versions.join(" ")));
            });
        }

        if (argv.showRules) {
          log(rules);
        }

        if (argv.hint || argv.fix) {
          suggestions.forEach(([path, suggestionList]) => {
            log(path);
            log(`    ${suggestionList.map(prettifyHint).join("\n")}`);
          });
        }

        if (argv.bail && suggestions.length) {
          exit(1);
          return Promise.resolve();
        }

        if (argv.fix) {
          return Promise.all(
            fixedPackages.map(([path, json]) =>
              writeJson(path, json, { spaces: 2 })
            )
          );
        }

        return Promise.resolve();
      }
    )
    .catch(e => {
      log(e.toString());
      exit(1);
    });
}
