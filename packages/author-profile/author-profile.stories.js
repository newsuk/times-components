import React from "react";
import { StyleSheet, View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import { withPageState } from "@times-components/pagination";
import {
  ApolloClient,
  ApolloProvider,
  createBatchingNetworkInterface,
  IntrospectionFragmentMatcher
} from "react-apollo";
import AuthorProfile from "./";
import example from "./example.json";

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#f5efeb",
    alignItems: "center"
  },
  container: {
    backgroundColor: "#fff",
    alignSelf: "stretch"
  }
});

const story = m =>
  <View style={styles.background}>
    <View style={styles.container}>
      {m}
    </View>
  </View>;

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

const networkInterface = createBatchingNetworkInterface({
  uri: "http://localhost:4000/graphql/",
  batchInterval: 50
});

const client = new ApolloClient({
  fragmentMatcher,
  networkInterface
});

const AuthorProfileWithPageState = withPageState(AuthorProfile);

storiesOf("Author Profile", module)
  .add("Component", () => {
    const props = {
      data: Object.assign({}, example, {
        count: example.articles.count,
        pageSize: 10,
        page: 1
      }),
      isLoading: false
    };

    props.data.articles.list.forEach(article => {
      // eslint-disable-next-line
      article.publishedTime = new Date(article.publishedTime);
    });

    return story(<AuthorProfile {...props} />);
  })
  .add("Loading", () => {
    const props = {
      isLoading: true
    };

    return story(<AuthorProfile {...props} />);
  })
  .add("Empty", () => {
    const props = {
      isLoading: false
    };

    return story(<AuthorProfile {...props} />);
  }).add("Provider", () =>
  <ApolloProvider client={client}>
    <AuthorProfileWithPageState
      generatePageLink={page => `https://www.thetimes.co.uk?page=${page}`}
      imageRatio="3:2"
      slug="fiona-hamilton"
      page={1}
      pageSize={3}
    />
  </ApolloProvider>
);
