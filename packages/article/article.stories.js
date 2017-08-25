/* eslint-env browser */
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from "react-apollo";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import Article from "./article";
import ArticleProvider from "./article-provider";

const articleFixture = require("./fixtures/article.json").fixture;

const networkInterface = createNetworkInterface({
  // uri: "http://localhost:4000/graphql/"
  uri: "http://10.22.16.19:4000/graphql/"
});

const client = new ApolloClient({
  networkInterface
});

storiesOf("Article", module)
  .add("Multiple Label", () =>
    <ApolloProvider client={client}>
      <ArticleProvider id="823c3892-ccf5-11e4-81dd-064fe933cd41" />
    </ApolloProvider>
  )
  .add("ArticleWithFixtures", () => <Article {...articleFixture} />);
