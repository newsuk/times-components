/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { HelmetProvider } = require("react-helmet-async");
const { TopicProvider } = require("@times-components/provider/rnw");
const {
  ContextProviderWithDefaults
} = require("@times-components/context/rnw");
const { scales } = require("@times-components/ts-styleguide/rnw");
const Topic = require("@times-components/topic/rnw").default;

const scale = scales.large;
const sectionColour = "#FFFFFF";

module.exports = (client, analyticsStream, data, helmetContext) => {
  const {
    debounceTimeMs,
    makeArticleUrl,
    makeTopicUrl,
    page,
    pageSize,
    topicSlug
  } = data;

  return React.createElement(
    HelmetProvider,
    { context: helmetContext },
    React.createElement(
      ApolloProvider,
      { client },
      React.createElement(
        TopicProvider,
        {
          debounceTimeMs,
          page,
          pageSize,
          slug: topicSlug
        },
        ({ isLoading, error, refetch, topic }) =>
          React.createElement(
            ContextProviderWithDefaults,
            {
              value: {
                makeArticleUrl,
                makeTopicUrl,
                theme: { scale, sectionColour }
              }
            },
            React.createElement(Topic, {
              analyticsStream,
              error,
              isLoading,
              onArticlePress: () => {},
              onTwitterLinkPress: () => {},
              page,
              pageSize,
              refetch,
              slug: topicSlug,
              topic
            })
          )
      )
    )
  );
};
