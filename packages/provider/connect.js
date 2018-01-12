import _pick from "lodash.pick";
import { graphql } from "react-apollo-temp";
import withDebounce from "./debounce";

// use this debounce time to prevent multiple queries as the user flicks through
// content, e.g. while paging to get to a specific page number
export const debounceTimeRapidUserAction = 250;

// use this debounce time to if the query variables may depend on asynchronous
// operations and take a few animation frames to stabilise
export const debounceTimeFrameBatching = 50;

// use this debounce time to disable debouncing
export const debounceTimeNone = 0;

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

const connectGraphql = (query, propsToVariables = identity, debounceTimeMs) => {
  if (
    process.env.NODE_ENV !== "production" &&
    typeof debounceTimeMs !== "number"
  ) {
    throw new Error(
      "Explicit debounceTimeMs required for connectGraphql, establish an appropriate debounce time or pass 0 to disable debouncing"
    );
  }
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

  const GraphQlComponent = graphql(query, {
    options(props) {
      return {
        variables: _pick(
          propsToVariables(props.debouncedProps || props),
          variableNames
        )
      };
    }
  })(Wrapper);

  if (debounceTimeMs === 0) {
    return GraphQlComponent;
  }
  return withDebounce(GraphQlComponent, debounceTimeMs);
};

export default connectGraphql;
