import { ApolloClient } from "apollo-client";
import { LocalLink } from "apollo-link-local";
import { makeExecutableSchema } from "graphql-tools";

function createFuture() {
  let resolve;
  const promise = new Promise(done => {
    resolve = done;
  });

  return {
    resolve: data => {
      setTimeout(() => resolve(data));
      return promise;
    },
    promise: () => promise
  };
}

const typeDefs = `
type Pong {
  id: Int,
  data: String
}

type Query {
  ping(id: Int!) : Pong
}`;

export default function PingPongTester(options) {
  const events = [];
  const blockers = {};
  const wait = id => {
    blockers[id] = blockers[id] || createFuture();
    return blockers[id].promise();
  };

  const resolvers = {
    Query: {
      async ping(root, { id }) {
        events.push({ type: "request", id });
        const data = await wait(id);
        events.push({ type: "resolved", id, data });
        return { id, data };
      }
    }
  };

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  class WrappedClient extends ApolloClient {
    getSnapshot = () => [...events];

    pushEvent = data => {
      events.push(data);
    };

    resolve = (id, data) => {
      if (!blockers[id]) return Promise.resolve(data);

      setTimeout(() => {
        events.push({ type: "resolving", id, data });
        blockers[id].resolve(data);
        delete blockers[id];
      });
      return blockers[id].promise();
    };

    query(data) {
      return super.query(data).then(({ data: d }) => {
        events.push({
          type: "response",
          data: d
        });
        return d;
      });
    }
  }

  return new WrappedClient({
    ...options,
    link: new LocalLink({ schema })
  });
}
