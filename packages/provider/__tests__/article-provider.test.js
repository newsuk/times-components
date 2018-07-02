import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@times-components/provider-test-tools";
import { addTypenameToDocument } from "apollo-utilities";
import fixture from "@times-components/provider-test-tools/fixtures/article.json";
import { ArticleProvider } from "../src/provider";
import { query as articleQuery } from "../src/article";

const mocks = [
  {
    request: {
      query: addTypenameToDocument(articleQuery),
      variables: {
        id: "113e9875-b7bf-4dd7-ac99-dee231bf6e74"
      }
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

describe("ArticleProvider", () => {
  it("returns query result", done => {
    renderComponent(({ isLoading, article }) => {
      if (!isLoading) {
        expect(article).toMatchSnapshot();
        done();
      }

      return null;
    });
  });
});
