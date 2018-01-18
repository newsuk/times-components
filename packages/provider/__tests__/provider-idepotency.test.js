import gql from "graphql-tag";
import React from "react";
import renderer from "react-test-renderer";
import { ApolloProvider } from "react-apollo";
import connectGraphql from "../provider";
import { createFuture, createPingPongClient } from "./provider-testing-utils";

it("should send queries only once", done => {
  const query = gql`
    query PingQuery($id: Int) {
      ping(id: $id) {
        id
      }
    }
  `;

  const Connect = connectGraphql(query);
  const futures = Array.from({ length: 4 }, createFuture);

  const events = [];

  const runTests = () => {
    const requested = events.filter(x => x.type === "request").map(x => x.id);

    expect(requested).toEqual([0, 1]);

    done();
  };

  const client = createPingPongClient(
    id => futures[id].promise(),
    data => events.push(data)
  );

  const resolveAll = async () => {
    await futures[1].resolve();
    await futures[3].resolve();
    await futures[2].resolve();
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

      if (i < 3) {
        setTimeout(() => {
          this.setState(({ i: j }) => {
            events.push({ id: j, type: "inc" });
            return { i: j + 1 };
          });
        });
      } else {
        resolveAll();
      }

      const j = i % 2;
      return (
        <Connect id={j} foo={i}>
          {() => null}
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
