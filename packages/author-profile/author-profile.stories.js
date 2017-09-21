import React from "react";
import { StyleSheet, View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  IntrospectionFragmentMatcher
} from "react-apollo";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { decorateAction } from "@storybook/addon-actions";
import AuthorProfile, { AuthorProfileProvider } from "./author-profile";
import example from "./example.json";

const preventDefaultedAction = decorateAction([
  ([e, ...args]) => {
    e.preventDefault();
    return ["[SyntheticEvent (storybook prevented default)]", ...args];
  }
]);

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

const story = m => (
  <ApolloProvider client={client}>
    <View style={styles.background}>
      <View style={styles.container}>{m}</View>
    </View>
  </ApolloProvider>
);

storiesOf("AuthorProfile", module)
  .add("Default", () => {
    const props = {
      data: Object.assign({}, example, {
        count: example.articles.count,
        pageSize: 10,
        page: 1
      }),
      loading: false,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress")
    };

    props.data.articles.list.forEach(article => {
      // eslint-disable-next-line
      article.publishedTime = new Date(article.publishedTime);
    });

    return story(<AuthorProfile {...props} />);
  })
  .add("Loading", () => {
    const props = {
      loading: true,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress")
    };

    return story(<AuthorProfile {...props} />);
  })
  .add("Empty State", () => {
    const props = {
      loading: false,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress")
    };

    return story(<AuthorProfile {...props} />);
  })
  .add("Provider", () => {
    const onTwitterLinkPress = preventDefaultedAction("onTwitterLinkPress");

    return story(
      <AuthorProfileProvider
        articleImageRatio="3:2"
        slug="fiona-hamilton"
        page={1}
        pageSize={3}
      >
        {props => (
          <AuthorProfile onTwitterLinkPress={onTwitterLinkPress} {...props} />
        )}
      </AuthorProfileProvider>
    );
  });
