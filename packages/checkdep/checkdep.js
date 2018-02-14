import getPackages from "./get-packages";

function resolveConflicts(strategy, packages) {
  return packages.sort(strategy)[0];
}

function objectOrUndefined(dep) {
  return Object.keys(dep).length ? dep : undefined;
}

const count = o => Object.keys(o).length;

function suggestFix(packageJson = {}, fixupMap) {
  const fixup = dep =>
    Object.entries(dep || {})
      .map(([key, value]) => [key, fixupMap[key], value])
      .filter(x => x[1])
      .filter(x => x[1] !== x[2])
      .map(([name, ver]) => ({ [name]: ver }))
      .reduce((a, b) => ({ ...a, ...b }), {});

  const dependencies = fixup(packageJson.dependencies);
  const devDependencies = fixup(packageJson.devDependencies);

  if (!count(dependencies) && !count(devDependencies)) return null;

  return {
    dependencies,
    devDependencies
  };
}

export function applyFix(packageJson, { dependencies, devDependencies }) {
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

export function getAllRequirements(packages) {
  return packages
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
}

export function computeFlatReverseLookupMap(requirements) {
  return requirements
    .map(p => [`${p[2]}@${p[3]}`, `${p[0]}@${p[1]}`])
    .reduce(
      (a, [target, pack]) =>
        Object.assign(a, {
          [target]: new Set([pack, ...(a[target] || [])])
        }),
      {}
    );
}

export function computeVersionSets(requirements) {
  return requirements.map(p => [p[2], p[3]]).reduce(
    (a, [name, ver]) =>
      Object.assign(a, {
        [name]: new Set([ver, ...(a[name] || [])])
      }),
    {}
  );
}

export function computeReverseLookupMap(requirements, versionSets) {

  const flatReverseLookup = computeFlatReverseLookupMap(requirements);

  return Object.entries(versionSets)
    .map(c => ({
      [c[0]]: [...c[1]].map(p => ({
        name: c[0],
        version: p,
        usedBy: [...flatReverseLookup[`${c[0]}@${p}`]]
      }))
    }))
    .reduce((a, b) => Object.assign(a, b), {})
}

export function findWrongVersions(packages) {
  const packageMap = packages
    .map(p => [p.name, p.version])
    .map(([name, version]) => ({ [name]: version }))
    .reduce((a, b) => Object.assign(a, b), {});

  return packages.flatMap(p =>
    Object.entries(p.dependencies || {})
      .map(([k, v]) => [p.name, k, v, packageMap[k]])
      .filter(x => x[3] && x[2] !== x[3])
      .map(([usedBy, packageName, installs, expected]) => ({
        usedBy,
        package: packageName,
        installs,
        expected
      }))
  );
}

export function fixTodo([path, json, fix]) {
  return [
    path,
    applyFix(json, fix)
  ];
}

export function getSuggestions(todo) {
  return todo.map(([path, json, fix]) => [
    path,
    [].concat(
      Object.entries(fix.dependencies)
        .map(([name, version]) => [name, json.dependencies[name], version])
        .filter(x => x[1]),
      Object.entries(fix.devDependencies)
        .map(([name, version]) => [name, json.devDependencies[name], version])
        .filter(x => x[1])
    )
  ]);
}

export function getTodos(packagesList, rules) {
  return packagesList
    .map(([path, json]) => [path, json, suggestFix(json, rules)])
    .filter(x => x[2])
}


export default async function checkdep(packagesList, strategy) {
  const packages = packagesList.map(p=>p[1]);

  const requirements = getAllRequirements(packages);
  const versionSets = computeVersionSets(requirements);
  const reverseLookup = computeReverseLookupMap(requirements, versionSets);

  const divergent = Object
    .values(reverseLookup)
    .filter(x => x.length > 1);

  const fixed = strategy
    ? divergent.map(c => resolveConflicts(strategy, c))
    : [];

  const wrong = findWrongVersions(packages)

  const rules = []
    .concat(
      fixed.map(w => ({ [w.name]: w.version })),
      wrong.map(w => ({ [w.package]: w.expected }))
    )
    .reduce((a, b) => ({ ...a, ...b }), {});

  const todo = getTodos(packagesList, rules);

  const fixedPackages = todo.map(fixTodo);

  const suggestions = getSuggestions(todo);

  return {
    versionSets,
    divergent,
    wrong,
    rules,
    suggestions,
    fixedPackages
  };
}
