import React from "react";
import pick from "lodash.pick";
import { graphql } from "react-apollo-temp";

const identity = a => a;

const flatten = l =>
  l.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

const getQueryVariables = definitions =>
  flatten(
    definitions.map(definition =>
      (definition.variableDefinitions || []).map(
        variable => variable.variable.name.value
      )
    )
  );

const connectGraphql = (query, propsToVariables = identity) => {
  const variableNames = getQueryVariables(query.definitions);

  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = props;
    }

    componentWillReceiveProps(nextProps) {
      this.setState(() => nextProps);
    }

    refetch() {
      this.state.data.retry(); // FIXME: remove this after react-apollo fixes https://github.com/apollographql/apollo-client/issues/2513
      this.state.data.refetch().then(response => {
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            ...response.data,
            error: response.errors
          }
        }));
      });
    }

    render() {
      const {
        data: { error, loading, refetch, ...result },
        children,
        ...props
      } = this.state;

      return children({
        error,
        refetch: this.refetch.bind(this),
        isLoading: loading,
        ...result,
        ...props
      });
    }
  }

  return graphql(query, {
    options(props) {
      return {
        variables: pick(propsToVariables(props), variableNames)
      };
    }
  })(Wrapper);
};

export default connectGraphql;
