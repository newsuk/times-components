require('babel-polyfill');
const glob = require('glob');
const fs = require('fs');
const semver = require('semver');

function conservative(a, b) {
  return semver.compare(a.version, b.version );
}

function progressive(a, b) {
  return semver.compare(b.version, a.version);
}

function majority(a, b) {
  return b.usedBy.length - a.usedBy.length;
}

function combine(s1, s2) {
  return (a,b) => s1(a, b) || s2(a, b);
}

const majorityConservative = combine(majority, conservative);
const majorityProgressive = combine(majority, progressive);

const strategies = {
  conservative,
  progressive,
  majority,
  majorityConservative,
  majorityProgressive
};



function resolveConflicts(strategy, packages) {
  return packages.sort(strategy)[0];
}


const expr = process.argv[2] || "packages/*/package.json";
console.log(expr);
glob(expr, (e, files) => {

console.log(files);
  const packagesList = files.map(file => JSON.parse(fs.readFileSync(file)));

  const packageMap = packagesList.map(p => [p.name, p.version])
    .map( ([name, version]) => ({[name]:version}))
    .reduce( (a,b) => Object.assign(a,b), {});

  const list = packagesList.map(p => [p.name, p.version, [].concat(
    Object.entries(p.dependencies||{}),
    Object.entries(p.devDependencies||{})
  )]).flatMap( ([name, version, deps]) => deps.map( ([tName, tVersion]) =>
    [name, version, tName, tVersion]));

  const flatReverseLookup = list.map(p => [
    p[2]+"@"+p[3],  p[0]+"@"+p[1]
  ]).reduce( (a, [target, package]) => Object.assign(a, {
    [target]: new Set([package, ...(a[target]||[])])
  }), {});

  const depMap = list.map(p => [p[2], p[3]])
    .reduce( (a, [name, ver]) => Object.assign(a, {
      [name]: new Set([ver, ...(a[name]||[])])
    }), {})


  //console.log(reverseLookup, depMap);

  const reverseLookup = Object.entries(depMap)
    .map( c =>(
      {[c[0]]: [...c[1]].map( p => ({
        name: c[0],
        version: p,
        usedBy: [...flatReverseLookup[c[0]+"@"+p]]
      }))
    }
    )).reduce( (a,b)=> Object.assign(a,b), {});

  const divergent = Object.values(reverseLookup)
    .filter(x => x.length>1 );

  console.log(divergent);

  console.log(
    divergent.map(c=>resolveConflicts(majority, c))
  )

  const wrong = packagesList.flatMap(p => Object.entries(p.dependencies||{})
    .map( ([k, v]) => [p.name, k, v, packageMap[k]])
    .filter(x => x[3] && x[3] != x[2] )
    .map( ([usedBy, package, installs, expected]) => ({
      usedBy,
      package,
      installs,
      expected
    }))
  );

  console.log(wrong);

  //packagesList.map(x=> dependencies)

});
