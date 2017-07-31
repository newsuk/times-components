import React from "react";
import pick from "lodash.pick";
import { graphql } from "react-apollo";

const flatten = l =>
  l.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

const map = definitions =>
  flatten(
    definitions.map(definition =>
      definition.variableDefinitions.map(
        variable => variable.variable.name.value
      )
    )
  );

const identity = a => a;

const connectGraphql = (query, propsToVariables = identity) => Component => {
  const variableNames = map(query.definitions);

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
