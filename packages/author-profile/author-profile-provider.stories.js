import React from "react";
import { storiesOf } from "@storybook/react-native";
import { ApolloProvider } from "react-apollo";

import AuthorProfileProvider from "./author-profile-provider";
import client from "./apollo-client";

storiesOf("AuthorProfileProvider", module).add("AuthorProfileProvider", () =>
  <ApolloProvider client={client}>
    <AuthorProfileProvider
      slug="fiona-hamilton"
      page={1}
      pageSize={10}
      imageRatio="3:2"
    />
  </ApolloProvider>
);
