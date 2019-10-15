/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { HelmetProvider } = require("react-helmet-async");
const {
  ContextProviderWithDefaults
} = require("@times-components/context/rnw");
const HomePage = require("@times-components/home-page/rnw").default;

module.exports = (client, analyticsStream, data, helmetContext) => {
  const { editionId, makeArticleUrl, makeTopicUrl } = data;

  return React.createElement(
    HelmetProvider,
    { context: helmetContext },
    React.createElement(
      ApolloProvider,
      { client },
      React.createElement(
        ContextProviderWithDefaults,
        { value: { makeArticleUrl, makeTopicUrl } },
        React.createElement(HomePage, { id: editionId })
      )
    )
  );
};
