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
  uri: "http://localhost:4000/graphql/"
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
  .add("ArticleWeb", () =>
    <ApolloProvider client={client}>
      <ArticleProvider id="ea16d744-cb4a-11e4-a202-50ac5def393a" />
    </ApolloProvider>
  );
