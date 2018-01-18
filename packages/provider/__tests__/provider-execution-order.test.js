import gql from "graphql-tag";
import React from "react";
import renderer from "react-test-renderer";
import { ApolloProvider } from "react-apollo";
import connectGraphql from "../provider";
import { createFuture, createPingPongClient } from "./provider-testing-utils";

it("should recive gql client response", async () => {
  const query = gql`
    {
      ping(id: 42) {
        id
      }
    }
  `;

  const client = createPingPongClient();
  const result = client.query({ query });
  const { data } = await result;
  expect(data.ping.id).toEqual(42);
});

it("should maintain order", done => {
  const query = gql`
    query PingQuery($id: Int) {
      ping(id: $id) {
        id
      }
    }
  `;

  const Connect = connectGraphql(query);
  const futures = Array.from({ length: 3 }, createFuture);

  const events = [];

  const client = createPingPongClient(
    id => futures[id].promise(),
    data => events.push(data)
  );

  function runTests() {
    const requested = events.filter(x => x.type === "request").map(x => x.id);

    const rendered = events
      .filter(x => x.type === "render")
      .map(x => x.requestedId);

    const awaited = events.filter(x => x.type === "awaited").map(x => x.id);

    expect(requested).toEqual([0, 1, 2]);
    expect(awaited).toEqual([1, 2, 0]);

    expect(rendered).toEqual([0, 1, 2, 2]);
    done();
  }

  const resolveAll = async () => {
    events.push({ id: 1, type: "resolving" });
    await futures[1].resolve();

    events.push({ id: 2, type: "resolving" });
    await futures[2].resolve();

    events.push({ id: 0, type: "resolving" });
    await futures[0].resolve();

    setTimeout(runTests);
  };

  class PingPong extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        i: 0
      };
    }

    render() {
      const { i } = this.state;

      if (i < 2) {
        setTimeout(() => {
          this.setState(({ i: j }) => {
            events.push({ id: j, type: "inc" });
            return { i: j + 1 };
          });
        });
      } else {
        resolveAll();
      }

      return (
        <Connect id={i} name={i.toString()}>
          {props => {
            events.push({
              id: (props.ping || {}).id,
              requestedId: props.id,
              type: "render",
              loading: props.isLoading
            });

            return null;
          }}
        </Connect>
      );
    }
  }

  renderer.create(
    <ApolloProvider client={client}>
      <PingPong />
    </ApolloProvider>
  );
});
