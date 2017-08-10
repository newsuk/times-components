import React from "react";
import pick from "lodash.pick";
import { graphql } from "react-apollo";

const identity = a => a;

const flatten = l =>
  l.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

const getQueryVariables = definitions =>
  flatten(
    definitions.map(definition =>
      (definition.variableDefinitions || [])
        .map(variable => variable.variable.name.value)
    )
  );

const connectGraphql = (query, propsToVariables = identity) => Component => {
  const variableNames = getQueryVariables(query.definitions);
  return props => {
    const Wrapper = data => <Component {...props} {...data} />;

    const variables = pick(propsToVariables(props), variableNames);
    const WithGraphql = graphql(query, {
      options: {
        variables
      }
    })(Wrapper);

    return <WithGraphql />;
  };
};

export default connectGraphql;
