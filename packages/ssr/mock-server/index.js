/* eslint-disable no-console */

const { ApolloServer } = require("apollo-server");
const { article, makeMocks } = require("@times-components/provider-test-tools");

const [{ defaults }] = article();

const schema = makeMocks(defaults);

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
