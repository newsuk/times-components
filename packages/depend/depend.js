import "babel-polyfill";

const { keys, values, entries } = Object;
const toObject = (a, b) => ({ ...a, ...b });
const count = o => keys(o).length;
const distinct = x => [...new Set(x)];
const objectOrUndefined = dep => (count(dep) ? dep : undefined);

// TODO: handle semver ranges and bail if undecidable
function resolveConflicts(strategy, packages) {
  const { name, version } = packages.sort(strategy)[0];
  return { name, version };
}

export function suggestFix(packageJson = {}, rules = {}) {
  const fixup = (dep = {}) =>
    entries(dep)
      .map(([key, value]) => [key, rules[key], value])
      .filter(x => x[1])
      .filter(x => x[1] !== x[2])
      .map(([name, ver]) => ({ [name]: ver }))
      .reduce(toObject, {});

  const dependencies = fixup(packageJson.dependencies);
  const devDependencies = fixup(packageJson.devDependencies);

  if (!count(dependencies) && !count(devDependencies)) {
    return null;
  }

  return {
    dependencies,
    devDependencies
  };
}

export const applyPatch = (
  packageJson,
  { dependencies = {}, devDependencies = {} }
) => ({
  ...packageJson,
  dependencies: objectOrUndefined({
    ...packageJson.dependencies,
    ...dependencies
  }),
  devDependencies: objectOrUndefined({
    ...packageJson.devDependencies,
    ...devDependencies
  })
});

export function getAllRequirements(packages) {
  return packages
    .map(p => [
      p.name,
      p.version,
      [...entries(p.dependencies || {}), ...entries(p.devDependencies || {})]
    ])
    .flatMap(([name, version, deps]) =>
      deps.map(([depName, depVersion]) => [name, version, depName, depVersion])
    );
}

export function computeVersionSets(requirements) {
  return requirements.map(p => [p[2], p[3]]).reduce(
    (sets, [name, ver]) => ({
      ...sets,
      [name]: distinct([ver, ...(sets[name] || [])])
    }),
    {}
  );
}

export function computeFlatReverseLookupMap(requirements) {
  return requirements.map(r => [`${r[2]}@${r[3]}`, `${r[0]}@${r[1]}`]).reduce(
    (deps, [dependee, dependency]) => ({
      ...deps,
      [dependee]: new Set([dependency, ...(deps[dependee] || [])])
    }),
    {}
  );
}

export function computeReverseLookupMap(requirements, versionSets) {
  const flatReverseLookup = computeFlatReverseLookupMap(requirements);
  return entries(versionSets)
    .map(([dependency, versions]) => ({
      [dependency]: [
        ...versions.map(version => ({
          name: dependency,
          version,
          usedBy: [...flatReverseLookup[`${dependency}@${version}`]]
        }))
      ]
    }))
    .reduce(toObject, {});
}

// finds dependencies that don't match packages
export function findWrongVersions(packages) {
  const expectedVersions = packages
    .map(({ name, version }) => ({ [name]: version }))
    .reduce(toObject, {});

  return packages.flatMap(p =>
    entries(p.dependencies || {})
      .map(([name, version]) => [p.name, name, version, expectedVersions[name]])
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
    [
      ...entries(patch.dependencies)
        .map(([name, version]) => [name, json.dependencies[name], version])
        .filter(x => x[1]),
      ...entries(patch.devDependencies)
        .map(([name, version]) => [name, json.devDependencies[name], version])
        .filter(x => x[1])
    ]
  ]);
}

export function getTodos(packagesList, rules) {
  return packagesList
    .map(([path, json]) => [path, json, suggestFix(json, rules)])
    .filter(x => x[2]);
}

export function createRules(resolved, wrong) {
  return [
    ...resolved.map(w => ({ [w.name]: w.version })),
    ...wrong.map(w => ({ [w.package]: w.expected }))
  ].reduce(toObject, {});
}

export function applyStrategy(requirements, strategy) {
  const versionSets = computeVersionSets(requirements);

  if (!strategy) {
    return {
      versionSets,
      resolved: []
    };
  }

  const reverseLookup = computeReverseLookupMap(requirements, versionSets);
  const divergent = values(reverseLookup).filter(x => x.length > 1);
  const resolved = divergent.map(c => resolveConflicts(strategy, c));

  return {
    versionSets,
    resolved
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
