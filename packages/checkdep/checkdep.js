import getPackages from "./get-packages";

function resolveConflicts(strategy, packages) {
  return packages.sort(strategy)[0];
}

function objectOrUndefined(dep) {
  return Object.keys(dep).length? dep : undefined;
}

function suggestFix(packageJson = {}, fixupMap) {
  const fixup = dep => Object
    .entries(dep||{}).map( ([key, value]) => [key, fixupMap[key], value])
    .filter(x => x[1])
    .filter(x => x[1] != x[2])
    .map( ([name, ver]) => ({[name]: ver}))
    .reduce((a,b) => ({...a, ...b}), {});

  const count = o => Object.keys(o).length;

  const dependencies = fixup(packageJson.dependencies);
  const devDependencies = fixup(packageJson.devDependencies);

  if( !count(dependencies) && !count(devDependencies) )
    return null;

  return {
    dependencies,
    devDependencies
  };
}

function applyFix(packageJson, {dependencies, devDependencies}) {
  return {
    ...packageJson,
    dependencies: objectOrUndefined({
      ...packageJson.dependencies,
      ...dependencies
    }),
    devDependencies: objectOrUndefined({
      ...packageJson.devDependencies,
      ...devDependencies
    })
  };
}

export default async function checkdep(expr, strategy) {
  const packagesList = await getPackages(expr);
  const packageMap = packagesList
    .map(p => p[1])
    .map(p => [p.name, p.version])
    .map(([name, version]) => ({ [name]: version }))
    .reduce((a, b) => Object.assign(a, b), {});

  const list = packagesList
    .map(p => p[1])
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


  const fixed = strategy? divergent.map(c => resolveConflicts(
    strategy, c
  )) : [];

  const wrong = packagesList
    .map(p => p[1])
    .flatMap(p =>
    Object.entries(p.dependencies || {})
      .map(([k, v]) => [p.name, k, v, packageMap[k]])
      .filter(x => x[3] && x[2] != x[3])
      .map(([usedBy, p, installs, expected]) => ({
        usedBy,
        package: p,
        installs,
        expected
      }))
  );

  const fixupMap = [].concat(
    fixed.map(w => ({[w.name] : w.version})),
    wrong.map(w => ({[w.package] : w.expected})),
  ).reduce( (a, b) => ({...a, ...b}), {});

  const todo = packagesList
    .map( ([path, json]) => [path, json, suggestFix(json, fixupMap)] )
    .filter(x => x[2]);

  const fixedPackages = todo
    .map( ([path, json, fix]) => [path, applyFix(json, fix)]);

  const suggestions = todo.map(
    ([path, json, fix]) => [path, [].concat(
        Object.entries(fix.dependencies)
          .map( ([name, version]) => [name, json.dependencies[name], version] )
          .filter(x => x[1]),
        Object.entries(fix.devDependencies)
          .map( ([name, version]) => [name, json.devDependencies[name], version] )
          .filter(x => x[1])
      )]
  )



  return {all: depMap, divergent, wrong, fixupMap, suggestions, fixedPackages};
}
