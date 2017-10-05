import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { decorateAction } from "@storybook/addon-actions";
import { withPageState } from "@times-components/pagination";
import { AuthorProfileProvider } from "@times-components/provider";
import { ApolloClient, IntrospectionFragmentMatcher } from "react-apollo";
import { MockedProvider, mockNetworkInterface } from "react-apollo/test-utils";
// eslint-disable-next-line import/no-extraneous-dependencies
import { addTypenameToDocument } from "apollo-client";
import { query as authorProfileQuery } from "@times-components/provider/author-profile-provider";
import AuthorProfile from "./author-profile";
import example from "./example.json";

const preventDefaultedAction = decorateAction([
  ([e, ...args]) => {
    e.preventDefault();
    return ["[SyntheticEvent (storybook prevented default)]", ...args];
  }
]);

const mocks = [
  { first: 3, skip: 0 },
  { first: 6, skip: 3 },
  { first: 9, skip: 6 },
  { first: 12, skip: 9 },
  { first: 15, skip: 12 },
  { first: 18, skip: 15 },
  { first: 21, skip: 18 },
  { first: 24, skip: 21 }
].map(({ first, skip }) => ({
  request: {
    query: addTypenameToDocument(authorProfileQuery),
    variables: {
      slug: "fiona-hamilton",
      first,
      skip,
      imageRatio: "3:2"
    }
  },
  result: example
}));

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

const networkInterface = mockNetworkInterface(...mocks);

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher
});

storiesOf("AuthorProfile", module)
  .add("Default", () => {
    const props = {
      ...example.data,
      isLoading: false,
      page: 2,
      pageSize: 3,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress")
    };

    return <AuthorProfile {...props} />;
  })
  .add("Loading", () => {
    const props = {
      isLoading: true,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress")
    };

    return <AuthorProfile {...props} />;
  })
  .add("Empty State", () => {
    const props = {
      isLoading: false,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress")
    };

    return <AuthorProfile {...props} />;
  })
  .add("With Page State", () => {
    const AuthorProfileProviderWithPageState = withPageState(
      AuthorProfileProvider
    );
    const onTwitterLinkPress = preventDefaultedAction("onTwitterLinkPress");
    const onArticlePress = preventDefaultedAction("onArticlePress");

    return (
      <MockedProvider mocks={mocks} client={client}>
        <AuthorProfileProviderWithPageState
          articleImageRatio="3:2"
          slug="fiona-hamilton"
          page={1}
          pageSize={3}
        >
          {({ author, isLoading, error, page, pageSize, onNext, onPrev }) => (
            <AuthorProfile
              author={author}
              isLoading={isLoading}
              error={error}
              page={page}
              pageSize={pageSize}
              onTwitterLinkPress={onTwitterLinkPress}
              onArticlePress={onArticlePress}
              onNext={onNext}
              onPrev={onPrev}
            />
          )}
        </AuthorProfileProviderWithPageState>
      </MockedProvider>
    );
  });
