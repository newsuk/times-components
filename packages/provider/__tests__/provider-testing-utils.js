import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, Observable } from "apollo-link";
import renderer from "react-test-renderer";
import { ApolloProvider } from "react-apollo";
import React from "react";
import PropTypes from "prop-types";

function createFuture() {
  let resolve;
  const promise = new Promise(done => {resolve = done});

  return {
    resolve: () => {
      setTimeout(resolve);
      return promise;
    },
    promise: () => promise
  };
}

export class TestLink extends ApolloLink {
  constructor(onRequest) {
    super();
    this.onRequest = onRequest;
    this.operations = [];
    this.blocked = [];
    this.events = [];
  }

  resolve(i) {
    if (!this.blocked[i]) return Promise.resolve();
    return this.blocked[i].resolve();
  }

  pushEvent(data) {
    this.events.push(data);
  }

  getRequest() {
    return this.operations;
  }

  resolveRequest(filter) {
    const entry = Object.entries(this.operations).find(x => filter(x[1]));

    if (entry) return this.resolve(entry[0]);

    return Promise.resolve();
  }

  getEvents() {
    return this.events;
  }

  request(operation) {
    this.blocked.push(createFuture());
    const { promise } = this.blocked[this.blocked.length - 1];
    this.operations.push(operation);
    this.events.push({ type: "request", operation });
    return new Observable(observer => {
      Promise.resolve(this.onRequest(operation))
        .then(async data => {
          this.events.push({ type: "resolving", operation, data });
          await promise();
          this.events.push({ type: "resolved", operation, data });
          if (!observer.closed) {
            observer.next(data);
            observer.complete();
          }
        })
        .catch(e => {
          this.events.push({ type: "error", error: e });
          if (!observer.closed) {
            observer.error(e);
          }
        });
    });
  }
}

export function createClientTester(requestHandler) {
  const link = new TestLink(requestHandler);
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
  });

  return { client, link };
}

export function createProviderTester(
  requestHandler,
  Component,
  defaultProps = {}
) {
  const { link, client } = createClientTester(requestHandler);

  let setProps = () => Promise.resolve();
  class Stateful extends React.Component {

    constructor(props) {
      super(props);
      this.state = defaultProps;
    }

    componentDidMount() {
      setProps = state =>
        new Promise(done =>
          this.setState(() => {
            done(state);
            return state;
          })
        );
    }

    componentWillUnmount() {
      setProps = () => Promise.resolve();
    }

    render() {
      const Child = this.props.children;
      return <Child {...this.state} />;
    }
  }

  Stateful.propTypes = {
    children: PropTypes.func.isRequired
  };

  const component = renderer.create(
    <ApolloProvider client={client}>
      {
        <Stateful>
          {props => (
            <Component {...props}>
              {data => {
                link.pushEvent({ type: "render", data });
                return null;
              }}
            </Component>
          )}
        </Stateful>
      }
    </ApolloProvider>
  );

  return {
    client,
    link,
    setProps,
    component
  };
}



function tidyEvent(e) {
  if (e.type === "render") {
    return {
      type: e.type,
      ...e.data
    };
  }

  return {
    type: e.type,
    query: e.operation.operationName,
    vars: e.operation.variables
  };
}

export function getEvents(link) {
  return link.getEvents().map(tidyEvent);
}
