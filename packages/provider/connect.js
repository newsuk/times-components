import React from "react";
import pick from "lodash.pick";
import { graphql } from "react-apollo";

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
  const Wrapper = ({
    data: { error, loading, ...result },
    children,
    ...props
  }) =>
    children({
      error,
      isLoading: loading,
      ...result,
      ...props
    });

  const Component = props => {
    const variables = pick(propsToVariables(props), variableNames);

    const Graphql = graphql(query, {
      options: {
        variables
      }
    })(Wrapper);

    return <Graphql {...props} />;
  };

  return Component;
};

export default connectGraphql;
