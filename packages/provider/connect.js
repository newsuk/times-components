import pick from "lodash.pick";
import { graphql } from "react-apollo-temp";
import PropTypes from "prop-types";
import withDebounce from "./debounce";

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

export const makeGraphqlOptions = (
  variableNames,
  propsToVariables = identity
) => props => ({
  variables: pick(
    propsToVariables(props.debouncedProps || props),
    variableNames
  )
});

const connectGraphql = (query, propsToVariables) => {
  const variableNames = getQueryVariables(query.definitions);
  const Wrapper = ({
    data: { error, loading, refetch, retry, ...result },
    children,
    ...props
  }) =>
    children({
      error,
      refetch: () => {
        retry(); // FIXME: remove this after react-apollo fixes https://github.com/apollographql/apollo-client/issues/2513
        refetch();
      },
      isLoading: loading || props.isDebouncing,
      ...result,
      ...props
    });
  Wrapper.propTypes = {
    debouncedProps: PropTypes.shape({}).isRequired
  };

  const GraphQlComponent = graphql(query, {
    options: makeGraphqlOptions(variableNames, propsToVariables)
  })(Wrapper);

  return withDebounce(GraphQlComponent);
};

export default connectGraphql;
