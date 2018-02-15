import "babel-polyfill";
function resolveConflicts(strategy, packages) {
  const { name, version } = packages.sort(strategy)[0];
  return { name, version };
}

function objectOrUndefined(dep) {
  return Object.keys(dep).length ? dep : undefined;
}

const count = o => Object.keys(o).length;

export function suggestFix(packageJson = {}, rules = {}) {
  const fixup = (dep = {}) =>
    Object.entries(dep)
      .map(([key, value]) => [key, rules[key], value])
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

export function applyPatch(
  packageJson,
  { dependencies = {}, devDependencies = {} }
) {
  const newDeps = objectOrUndefined({
    ...packageJson.dependencies,
    ...dependencies
  });

  const newDev = objectOrUndefined({
    ...packageJson.devDependencies,
    ...devDependencies
  });
  return {
    ...packageJson,
    dependencies: newDeps,
    devDependencies: newDev
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
      deps.map(([depName, depVersion]) => [name, version, depName, depVersion])
    );
}

export function computeFlatReverseLookupMap(requirements) {
  return requirements.map(p => [`${p[2]}@${p[3]}`, `${p[0]}@${p[1]}`]).reduce(
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
    .reduce((a, b) => Object.assign(a, b), {});
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

export function fixTodo([path, json, patch]) {
  return [path, applyPatch(json, patch)];
}

export function getSuggestions(todo) {
  return todo.map(([path, json, patch]) => [
    path,
    [].concat(
      Object.entries(patch.dependencies)
        .map(([name, version]) => [name, json.dependencies[name], version])
        .filter(x => x[1]),
      Object.entries(patch.devDependencies)
        .map(([name, version]) => [name, json.devDependencies[name], version])
        .filter(x => x[1])
    )
  ]);
}

export function getTodos(packagesList, rules) {
  return packagesList
    .map(([path, json]) => [path, json, suggestFix(json, rules)])
    .filter(x => x[2]);
}

export function createRules(resolved, wrong) {
  return []
    .concat(
      resolved.map(w => ({ [w.name]: w.version })),
      wrong.map(w => ({ [w.package]: w.expected }))
    )
    .reduce((a, b) => ({ ...a, ...b }), {});
}

export function applyStrategy(requirements, strategy) {
  const versionSets = computeVersionSets(requirements);

  if (!strategy)
    return {
      versionSets,
      resolved: []
    };

  const reverseLookup = computeReverseLookupMap(requirements, versionSets);

  const divergent = Object.values(reverseLookup).filter(x => x.length > 1);

  return {
    versionSets,
    resolved: divergent.map(c => resolveConflicts(strategy, c))
  };
}

export default async function compute(packagesList, strategy) {
  const packages = packagesList.map(p => p[1]);
  const requirements = getAllRequirements(packages);

  const { versionSets, resolved } = applyStrategy(requirements, strategy);

  const wrong = findWrongVersions(packages);
  const rules = createRules(resolved, wrong);
  const todo = getTodos(packagesList, rules);

  const fixedPackages = todo.map(fixTodo);
  const suggestions = getSuggestions(todo);

  return {
    requirements,
    versionSets,
    wrong,
    rules,
    suggestions,
    fixedPackages
  };
}
