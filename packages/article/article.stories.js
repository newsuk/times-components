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
  uri: "https://hknmtcy3aj.execute-api.eu-west-1.amazonaws.com/prod/graphql"
});

// TEMP disable warning for rapid iteration
// console.disableYellowBox = true;

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
  .add("Apollo - long article with italic and bold", () =>
    <ApolloProvider client={client}>
      <ArticleProvider id="ccf235b7-bc11-4c3f-bbe5-b0c5c6fc2b29" />
    </ApolloProvider>
  )
  .add("Apollo - Multiple Label and italics", () =>
    <ApolloProvider client={client}>
      <ArticleProvider id="be725c01-dd7e-4c46-85b5-16ffc30c0b98" />
    </ApolloProvider>
  )
  .add("Apollo - Production Article", () =>
    <ApolloProvider client={client}>
      <ArticleProvider id="5cbac836-8eea-11e7-86bd-27eb324693e0" />
    </ApolloProvider>
  )
  .add("Apollo - Production Article bold", () =>
    <ApolloProvider client={client}>
      <ArticleProvider id="978ecf38-8eff-11e7-86bd-27eb324693e0" />
    </ApolloProvider>
  )
  .add("Fixtures - Basic", () => <Article {...articleFixture} />);
