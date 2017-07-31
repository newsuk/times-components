import React from "react";
import { storiesOf } from "@storybook/react-native";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider, IntrospectionFragmentMatcher } from "react-apollo";
import AuthorProvider from "./author-provider";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "UNION",
          name: "Media",
          possibleTypes: [
            {
              name: "Image"
            },
            {
              name: "Video"
            }
          ]
        }
      ]
    }
  }
});

const networkInterface = createNetworkInterface({
  uri: "http://localhost:4000/graphql/"
}).use([{
  applyMiddleware(req, next) {
    console.log(req);
    return next();
  }
}]);

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher
});

storiesOf("AuthorProvider", module).add("AuthorProvider", () =>
  <ApolloProvider client={client}>
    <AuthorProvider
      slug="fiona-hamilton"
      pageSize={10}
      pageNumber={1}
      imageRatio="3:2"
    />
  </ApolloProvider>
);
