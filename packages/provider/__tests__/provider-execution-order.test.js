import gql from "graphql-tag";
import React from "react";
import renderer from "react-test-renderer";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

import connectGraphql from "../provider";
import createPingPongClient from "./provider-testing-utils";


it("should maintain order", async() => {
  const query = gql`
    query PingQuery($ID: Int) {
      ping(id: $ID) {
        id
      }
    }
  `;

  const Connect = connectGraphql(query);

  const client = createPingPongClient({
    cache: new InMemoryCache()
  });


  const lastRender = await new Promise( (done) => {
    class PingPong extends React.Component {
      constructor(props, context) {
        super(props, context);
        this.state = {
          i: 0
        };
      }

      render() {
        const { i } = this.state;
        
        setTimeout( async ()=>{
          if (i<3) {
            this.setState({i:i+1})
          } else {
            await client.resolve(3);
            await client.resolve(1);
            await client.resolve(2);
            await client.resolve(0);
          }
        })

        return (
          <Connect ID={i}>
            { (props) => {
              const {isLoading, ping = {id:null}} = props;
              client.pushEvent({type:'render', id: ping.id, requested: i, isLoading})
              if (!isLoading) done(ping.id);
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
  })

  expect(lastRender).toBe(3);
  expect(client.getSnapshot()).toEqual([ 
    { type: 'render', id: null, requested: 0, isLoading: true },
    { type: 'request', id: 0 },
    { type: 'request', id: 1 },
    { type: 'render', id: null, requested: 1, isLoading: true },
    { type: 'request', id: 2 },
    { type: 'render', id: null, requested: 2, isLoading: true },
    { type: 'request', id: 3 },
    { type: 'render', id: null, requested: 3, isLoading: true },
    { type: 'resolving', id: 3},
    { type: 'resolved', id: 3},
    { type: 'render', id: 3, requested: 3, isLoading: false }
  ]);
})
