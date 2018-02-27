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
      .map(([name, version]) => ({
        name,
        version,
        expected: rules[name]
      }))
      .filter(x => x.expected)
      .filter(x => x.expected !== x.version)
      .map(({ name, expected }) => ({ [name]: expected }))
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
    .map(p => ({
      name: p.name,
      version: p.version,
      deps: [
        ...entries(p.dependencies || {}),
        ...entries(p.devDependencies || {})
      ]
    }))
    .flatMap(({ name, version, deps }) =>
      deps.map(([depName, depVersion]) => ({
        package: { name, version },
        requires: { name: depName, version: depVersion }
      }))
    );
}

export function computeVersionSets(requirements) {
  return requirements.map(p => p.requires).reduce(
    (sets, { name, version }) => ({
      ...sets,
      [name]: distinct([version, ...(sets[name] || [])])
    }),
    {}
  );
}

export function computeFlatReverseLookupMap(requirements) {
  const packName = ({ name, version }) => `${name}@${version}`;
  return requirements
    .map(r => [packName(r.package), packName(r.requires)])
    .reduce(
      (deps, [dependee, dependency]) => ({
        ...deps,
        [dependee]: distinct([dependency, ...(deps[dependee] || [])])
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
          usedBy: [...(flatReverseLookup[`${dependency}@${version}`] || [])]
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
    [...entries(p.dependencies || {}), ...entries(p.devDependencies || {})]
      .map(([name, installs]) => ({
        usedBy: p.name,
        package: name,
        installs,
        expected: expectedVersions[name]
      }))
      .filter(({ installs, expected }) => expected && installs !== expected)
  );
}

export function fixTodo({ path, packageJson, patch }) {
  return [path, applyPatch(packageJson, patch)];
}

export function getSuggestions(todo) {
  return todo.map(({ path, packageJson, patch }) => [
    path,
    [
      ...entries(patch.dependencies)
        .map(([name, version]) => [
          name,
          packageJson.dependencies[name],
          version
        ])
        .filter(x => x[1]),
      ...entries(patch.devDependencies)
        .map(([name, version]) => [
          name,
          packageJson.devDependencies[name],
          version
        ])
        .filter(x => x[1])
    ]
  ]);
}

export function getTodos(packagesList, rules) {
  return packagesList
    .map(([path, packageJson]) => ({
      path,
      packageJson,
      patch: suggestFix(packageJson, rules)
    }))
    .filter(x => x.patch);
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

export default async function compute(packagesList, strategy, overrides = {}) {
  const packages = packagesList.map(p => p[1]);
  const requirements = getAllRequirements(packages);

  const { versionSets, resolved } = applyStrategy(requirements, strategy);

  const wrong = findWrongVersions(packages);
  const rules = createRules(resolved, wrong);
  const todo = getTodos(packagesList, {
    ...rules,
    ...overrides
  });

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
