/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { TopicProvider } = require("@times-components/provider/rnw");
const Context = require("@times-components/context/rnw").default;
const { scales } = require("@times-components/styleguide/rnw");
const Topic = require("@times-components/topic/rnw").default;

const scale = scales.large;
const sectionColour = "#FFFFFF";

module.exports = (client, analyticsStream, data) => {
  const {
    debounceTimeMs,
    makeArticleUrl,
    mapTopicToAdConfig,
    page,
    pageSize,
    topicSlug
  } = data;

  return React.createElement(
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
          Context.Provider,
          {
            value: {
              makeArticleUrl,
              theme: { scale, sectionColour }
            }
          },
          React.createElement(Topic, {
            adConfig: mapTopicToAdConfig(),
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
  );
};
