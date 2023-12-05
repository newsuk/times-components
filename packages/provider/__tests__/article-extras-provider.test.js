import React from "react";
import renderer from "react-test-renderer";
import {
  MockedProvider,
  MockFixture,
  articleExtras as makeArticleExtrasParams
} from "@times-components/provider-test-tools";
import { ArticleExtrasProvider } from "../src/provider";

const renderComponent = child => {
  const id = "113e9875-b7bf-4dd7-ac99-dee231bf6e74";

  return renderer.create(
    <MockFixture
      params={makeArticleExtrasParams({
        count: 123,
        enabled: true,
        id,
        variables: () => ({
          id
        })
      })}
      render={mocks => (
        <MockedProvider mocks={mocks}>
          <ArticleExtrasProvider debounceTimeMs={0} id={id}>
            {child}
          </ArticleExtrasProvider>
        </MockedProvider>
      )}
    />
  );
};

describe("ArticleExtrasProvider", () => {
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
