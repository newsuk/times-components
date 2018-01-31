import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@times-components/utils/graphql";
import { addTypenameToDocument } from "apollo-utilities";
import { ArticleProvider } from "../provider";
import { query as articleQuery } from "../article";
import fixture from "../fixtures/article.json";

const mocks = [
  {
    request: {
      query: addTypenameToDocument(articleQuery)
    },
    result: fixture
  }
];

const renderComponent = child =>
  renderer.create(
    <MockedProvider mocks={mocks}>
      <ArticleProvider
        id="113e9875-b7bf-4dd7-ac99-dee231bf6e74"
        debounceTimeMs={0}
      >
        {child}
      </ArticleProvider>
    </MockedProvider>
  );

it("returns query result", done => {
  renderComponent(({ isLoading, article }) => {
    if (!isLoading) {
      expect(article).toMatchSnapshot();
      done();
    }

    return null;
  });
});
