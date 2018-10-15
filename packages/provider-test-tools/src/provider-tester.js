import React, { Component } from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import { ApolloProvider } from "react-apollo";
import clientTester from "./client-tester";

export default function providerTester(
  requestHandler,
  WrappedComponent,
  defaultProps = {}
) {
  const { link, client } = clientTester(requestHandler);

  let isMounted = false;
  let setProps = () => Promise.resolve();
  class Stateful extends Component {
    constructor(props) {
      super(props);
      this.state = defaultProps;
    }

    componentDidMount() {
      isMounted = true;
      setProps = state => {
        if (!isMounted) return Promise.resolve();

        return new Promise(done =>
          this.setState(() => {
            done(state);
            return state;
          })
        );
      };
    }

    componentWillUnmount() {
      isMounted = false;
      setProps = () => Promise.resolve();
    }

    render() {
      return this.props.children(this.state);
    }
  }

  Stateful.propTypes = {
    children: PropTypes.func.isRequired
  };

  const component = renderer.create(
    <ApolloProvider client={client}>
      {
        <Stateful>
          {state => (
            <WrappedComponent {...state}>
              {props => {
                link.pushEvent({
                  props,
                  type: "render"
                });
                return null;
              }}
            </WrappedComponent>
          )}
        </Stateful>
      }
    </ApolloProvider>
  );

  return {
    client,
    component,
    link,
    setProps
  };
}
