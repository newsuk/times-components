require("babel-register");
require("babel-polyfill");
const checkdep = require("./checkdep").default;

const expr = process.argv[2] || "packages/*/package.json";
console.log({expr});
checkdep(expr)
  .then( ({divergent, wrong, fixed, fixupMap}) => {
    console.log(fixupMap);
  })
  .catch(e=> console.log(e));
