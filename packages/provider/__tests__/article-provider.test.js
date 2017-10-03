/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import { resetMockGraphQLProps, setMockGraphQLProps } from "react-apollo";
import { ArticleProvider } from "../provider";
import articleFixture from "../provider-fixtures/article.json";

beforeEach(() => {
  resetMockGraphQLProps();
  jest.mock("WebView", () => "WebView");
});

it("renders loading state", () => {
  setMockGraphQLProps({
    data: {
      loading: true
    }
  });

  const tree = renderer.create(<ArticleProvider />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders data from graphql", done => {
  const data = {
    data: {
      loading: false,
      article: articleFixture
    }
  };

  setMockGraphQLProps(data, (query, extras) => {
    expect(extras.options.variables.id).toEqual(
      "3107c018-cb60-11e4-81dd-064fe933cd41"
    );
    return done();
  });

  const tree = renderer
    .create(<ArticleProvider id="3107c018-cb60-11e4-81dd-064fe933cd41" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
