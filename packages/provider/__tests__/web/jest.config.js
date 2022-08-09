// import path from "path";

// const jestConfigurator = require("@times-components/jest-configurator-web").default;
// const jc = jestConfigurator(__dirname);


// const jestConfigurator = require("../../jest-configurator").default;
// const jc = jestConfigurator("web", __dirname);

const jestConfigurator = require("../../../jest-configurator-web").default;
const jc = jestConfigurator(__dirname, {platform: "web"});


// jc.transform = {
//     "^.+\\.js$": `${__dirname}/source-loader.js`,
//     "\\.(gql|graphql)$": "jest-transform-graphql",
//     "^.+\\.graphql": "babel-jest",
//     "^.+\\.[jt]sx?$": "babel-jest"
// };

// console.log("ADAM: jc", jc);

module.exports = jc;
