import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { LocalLink } from "apollo-link-local";
import { makeExecutableSchema } from "graphql-tools";

const typeDefs = `
type Pong {
  id: Int
}

type Query {
  ping(id: Int) : Pong
}
`;

export function createFuture() {
  let resolve;
  const promise = new Promise(done => {
    resolve = done;
  });
  return {
    resolve() {
      setTimeout(resolve);
      return promise;
    },
    promise: () => promise
  };
}

export function createPingPongClient(
  waitFor = () => Promise.resolve(),
  onEvent = () => {}
) {
  const resolvers = {
    Query: {
      ping: async (root, { id }) => {
        onEvent({ id, type: "request" });
        await waitFor(id);
        onEvent({ id, type: "awaited" });
        return { id };
      }
    }
  };

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const client = new ApolloClient({
    cache: new InMemoryCache({}),
    link: new LocalLink({ schema })
  });

  return client;
}
