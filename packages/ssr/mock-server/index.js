/* eslint-disable no-console */

const { ApolloServer } = require("apollo-server");
const { article, authorProfile, makeMocks } = require("@times-components/provider-test-tools");

function combineDefaults(...bits) {
  let defaults = {};

  bits.forEach(bit => {
    Object.assign(defaults, ...bit.map(d => ({
      types: d.defaults.types,
      values: d.defaults.values
    })));
  });

  return defaults;
}

//TODO: Desired way of doing it. (uses all exports - overrides each other atm)
// const defaults = combineDefaults(
//   authorProfile({slug: 'baked-beanzz', pageSize: 1}),
//   article()
// );

const [{defaults: articleDefaults}] = article();
const [{defaults: authorDefaults}] = authorProfile({slug: 'deborah-haynes', pageSize: 1});

const defaults = {
  types: Object.assign({}, articleDefaults.types, authorDefaults.types),
  values: Object.assign({}, articleDefaults.values, authorDefaults.values)
};

const schema = makeMocks(defaults);

const server = new ApolloServer({ schema,
  formatError: error => {
    console.log(error);
    return new Error('Internal server error');
  },
  formatResponse: response => {
    console.log(response);
    return response;
  }
});

const App = server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

process.on("SIGTERM", () => {
  App.close(() => {
    process.exit(0);
  });
});
