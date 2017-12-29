import _pick from "lodash.pick";
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
      isLoading: loading,
      ...result,
      ...props
    });

  return graphql(query, {
    options(props) {
      return {
        variables: _pick(propsToVariables(props), variableNames)
      };
    }
  })(Wrapper);
};

export default connectGraphql;
