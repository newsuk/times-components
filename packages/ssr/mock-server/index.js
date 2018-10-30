/* eslint-disable no-console */

const { ApolloServer } = require("apollo-server");
const { article, makeMocks } = require("@times-components/provider-test-tools");

const [{ defaults }] = article();

const schema = makeMocks(defaults);

const server = new ApolloServer({ schema });

const App = server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

process.on("SIGTERM", () => {
  App.close(() => {
    process.exit(0);
  });
});
