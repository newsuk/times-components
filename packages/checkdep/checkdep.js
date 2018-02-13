import getPackages from "./get-packages";
import * as strategy from "./strategies";

function resolveConflicts(strategy, packages) {
  return packages.sort(strategy)[0];
}

export default async function checkdep(expr) {
  const packagesList = await getPackages(expr);

  const packageMap = packagesList
    .map(p => [p.name, p.version])
    .map(([name, version]) => ({ [name]: version }))
    .reduce((a, b) => Object.assign(a, b), {});

  const list = packagesList
    .map(p => [
      p.name,
      p.version,
      [].concat(
        Object.entries(p.dependencies || {}),
        Object.entries(p.devDependencies || {})
      )
    ])
    .flatMap(([name, version, deps]) =>
      deps.map(([tName, tVersion]) => [name, version, tName, tVersion])
    );

  const flatReverseLookup = list
    .map(p => [p[2] + "@" + p[3], p[0] + "@" + p[1]])
    .reduce(
      (a, [target, pack]) =>
        Object.assign(a, {
          [target]: new Set([pack, ...(a[target] || [])])
        }),
      {}
    );

  const depMap = list.map(p => [p[2], p[3]]).reduce(
    (a, [name, ver]) =>
      Object.assign(a, {
        [name]: new Set([ver, ...(a[name] || [])])
      }),
    {}
  );

  const reverseLookup = Object.entries(depMap)
    .map(c => ({
      [c[0]]: [...c[1]].map(p => ({
        name: c[0],
        version: p,
        usedBy: [...flatReverseLookup[c[0] + "@" + p]]
      }))
    }))
    .reduce((a, b) => Object.assign(a, b), {});

  const divergent = Object.values(reverseLookup).filter(x => x.length > 1);

  const fixed = divergent.map(c => resolveConflicts(
    strategy.majorityProgressive, c
  ));

  const wrong = packagesList.flatMap(p =>
    Object.entries(p.dependencies || {})
      .map(([k, v]) => [p.name, k, v, packageMap[k]])
      .filter(x => x[3] && x[3] != x[2])
      .map(([usedBy, p, installs, expected]) => ({
        usedBy,
        package: p,
        installs,
        expected
      }))
  );



  const fixupMap = [].concat(
    fixed.map(w => ({[w.name] : w.version})),
    wrong.map(w => ({[w.package] : w.expected}))
  ).reduce( (a,b) => ({...a, ...b}), {});



  return {divergent, wrong, fixed, fixupMap};
}
