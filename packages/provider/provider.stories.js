import React from "react";
import { Text } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import { withPageState } from "@times-components/pagination";

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  IntrospectionFragmentMatcher,
  gql
} from "react-apollo";

import connectGraphql, {
  AuthorProfileProvider,
  ArticleProvider
} from "./provider.js";

const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;

const query = gql`
  {
    author(slug: "fiona-hamilton") {
      name
    }
  }
`;

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
});

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher
});

storiesOf("Provider", module).add("Provider", () => {
  const WithData = connectGraphql(query)(Component);
  return (
    <ApolloProvider client={client}>
      <WithData />
    </ApolloProvider>
  );
});

const AuthorProfileWithPageState = withPageState(AuthorProfileProvider);
storiesOf("Provider", module).add("AuthorProfileProvider", () => (
  <ApolloProvider client={client}>
    <AuthorProfileWithPageState
      generatePageLink={page => `https://www.thetimes.co.uk?page=${page}`}
      imageRatio="3:2"
      slug="fiona-hamilton"
      page={1}
      pageSize={3}
    />
  </ApolloProvider>
));

storiesOf("Provider", module)
  // .add("ArticleProvider", () => (
  //   <div>
  //     <a
  //       href={`/iframe.html${window.top.location.search}`}
  //       target="_blank"
  //       rel="noopener noreferrer"
  //     >
  //       Click to render the ads
  //     </a>
  //     <ApolloProvider client={client}>
  //       <ArticleProvider
  //         id="3107c018-cb60-11e4-81dd-064fe933cd41"
  //       />
  //     </ApolloProvider>
  //   </div>
  // ));
  .add("ArticleProvider", () => (
    <ApolloProvider client={client}>
      <ArticleProvider
        id="3107c018-cb60-11e4-81dd-064fe933cd41"
      />
    </ApolloProvider>
  ));
