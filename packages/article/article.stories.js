/* eslint-env browser */
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from "react-apollo";
import { storiesOf } from "@storybook/react-native";
import { View, Platform } from "react-native";
import React from "react";
import Article from "./article";
import ArticleProvider from "./article-provider";

const networkInterface = createNetworkInterface({
  uri: "http://10.22.23.184:4000/graphql/"
});

const client = new ApolloClient({
  networkInterface
});

const renderIframe = () => {
  if (Platform.OS !== "web") {
    return null;
  }

  return (
    <a
      href={`/iframe.html${window.top.location.search}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Render ads
    </a>
  );
};

storiesOf("Article", module)
  .add("Article", () =>
    <View>
      {renderIframe()}
      <Article />
    </View>
  )
  .add("ArticleWebWithLabel", () =>
    <ApolloProvider client={client}>
      <ArticleProvider id="823c3892-ccf5-11e4-81dd-064fe933cd41" />
    </ApolloProvider>
  )
  .add("ArticleWebWithoutLabelWithoutFlag", () =>
    <ApolloProvider client={client}>
      <ArticleProvider id="97c64f20-cb67-11e4-a202-50ac5def393a" />
    </ApolloProvider>
  );
