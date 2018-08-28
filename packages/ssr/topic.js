/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { TopicProvider } = require("@times-components/provider/rnw");
const Topic = require("@times-components/topic/rnw").default;

module.exports = (client, slug) =>
  React.createElement(
    ApolloProvider,
    { client },
    React.createElement(
      TopicProvider,
      {
        debounceTimeMs: 0,
        slug
      },
      ({ isLoading, error, refetch, topic }) =>
        React.createElement(Topic, {
          adConfig: {},
          analyticsStream: () => {},
          isLoading,
          error,
          onTwitterLinkPress: () => {},
          onArticlePress: () => {},
          page: 1,
          refetch,
          slug,
          topic
        })
    )
  );
