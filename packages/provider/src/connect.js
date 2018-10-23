import React from "react";
import pick from "lodash.pick";
import { Query } from "react-apollo";
import PropTypes from "prop-types";
import withDebounce from "./debounce";

const identity = a => a;

const flatten = l =>
  l.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

const getQueryVariableValues = query =>
  flatten(
    query.definitions.map(definition =>
      (definition.variableDefinitions || []).map(
        variable => variable.variable.name.value
      )
    )
  );

export const makeVariableFactory = (
  variableNames,
  propsToVariables = identity
) => props =>
  pick(propsToVariables(props.debouncedProps || props), variableNames);

const connectGraphql = (query, propsToVariables) => {
  const variablesFactory = makeVariableFactory(
    getQueryVariableValues(query),
    propsToVariables
  );

  const Wrapper = ({ children, ...props }) => (
    <Query query={query} variables={variablesFactory(props)}>
      {({ loading, data, refetch, fetchMore, error }) =>
        children({
          error,
          fetchMore,
          isLoading: loading,
          refetch: () => refetch(),
          ...data,
          ...props,
        })
      }
    </Query>
  );

  Wrapper.propTypes = {
    children: PropTypes.func.isRequired,
    debouncedProps: PropTypes.shape({}).isRequired
  };

  return withDebounce(Wrapper);
};

export default connectGraphql;
