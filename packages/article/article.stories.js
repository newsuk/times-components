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
  uri: "http://localhost:4000/graphql/"
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      req.options.headers["X-authorization"] = "DO_NOT_USE_IN_PROD";
      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface
});

storiesOf("Article", module)
  .add("Apollo - Multiple Label", () =>
    <ApolloProvider client={client}>
      <ArticleProvider id="be725c01-dd7e-4c46-85b5-16ffc30c0b98" />
    </ApolloProvider>
  )
  .add("Fixtures - Basic", () => <Article {...articleFixture} />);
