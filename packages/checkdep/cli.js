require("babel-register");
require("babel-polyfill");
const checkdep = require("./checkdep").default;

const expr = process.argv[2] || "packages/*/package.json";
const strategy = process.argv[3] || "majorityConservative";
console.log({expr, strategy});
checkdep(expr, strategy)
  .then( ({divergent, wrong, fixupMap, suggestions, fixedPackages, all}) => {
    console.log('----all direct dependencies-----');
    console.log(Object.keys(all));

    console.log('----divergent dependencies-----');
    console.log(divergent);

    console.log('----out of sync packages-----');
    console.log(wrong);

    console.log('----fixing rules-----')
    console.log(fixupMap)

    console.log('----fix suggestions---');
    suggestions.forEach(
      ([path, suggestions])=>
        console.log(path, suggestions)
    );

    console.log('----fixed packages----');
    console.log(fixedPackages);
  })
  .catch(e => {
    console.log(e.toString());
    process.exit(1);
  });
