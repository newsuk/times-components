import React from "react";
import pick from "lodash.pick";
import { Query } from "react-apollo";
import PropTypes from "prop-types";
import { Debounce } from "./debounce";

const flatten = l =>
  l.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

const getQueryVariableNames = query =>
  flatten(
    query.definitions.map(definition =>
      (definition.variableDefinitions || []).map(
        variable => variable.variable.name.value
      )
    )
  );

export const QueryProvider = ({
  query,
  propsToVariables,
  debounceTimeMs,
  ...props
}) => (
  <Debounce
    {...props}
    debounceRender={({ children, ...renderProps }) => {
      const variables = pick(
        propsToVariables(renderProps.debouncedProps || renderProps),
        getQueryVariableNames(query)
      );

      return (
        <Query query={query} variables={variables}>
          {({ loading, data, refetch, fetchMore, error }) =>
            children({
              error,
              fetchMore,
              isLoading: loading,
              refetch: () => refetch(),
              variables,
              ...renderProps,
              ...data
            })
          }
        </Query>
      );
    }}
    debounceTimeMs={debounceTimeMs}
  />
);

QueryProvider.propTypes = {
  children: PropTypes.func.isRequired,
  debounceTimeMs: PropTypes.number.isRequired,
  propsToVariables: PropTypes.func,
  query: PropTypes.shape({
    definitions: PropTypes.arrayOf(
      PropTypes.shape({
        variableDefinitions: PropTypes.arrayOf(
          PropTypes.shape({
            variable: PropTypes.shape({
              name: PropTypes.shape({
                value: PropTypes.string.isRequired
              }).isRequired
            }).isRequired
          })
        )
      })
    ).isRequired
  }).isRequired
};

QueryProvider.defaultProps = {
  propsToVariables: i => i
};

const connectGraphql = (query, propsToVariables) => props => (
  <QueryProvider {...props} propsToVariables={propsToVariables} query={query} />
);

export default connectGraphql;
