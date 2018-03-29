import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@times-components/utils";
import { AuthorArticlesNoImagesProvider } from "../provider";
import fixtureGenerator from "../fixture-generator";

const renderComponent = child =>
  renderer.create(
    <MockedProvider
      mocks={fixtureGenerator.makeArticleMocks({ pageSize: 5, delay: 0 })}
    >
      <AuthorArticlesNoImagesProvider
        slug="deborah-haynes"
        pageSize={5}
        page={1}
        shortSummaryLength={220}
        longSummaryLength={360}
        debounceTimeMs={0}
      >
        {child}
      </AuthorArticlesNoImagesProvider>
    </MockedProvider>
  );

describe("AuthorArticlesNoImagesProvider", () => {
  it("returns query result", done => {
    renderComponent(({ isLoading, author }) => {
      if (!isLoading) {
        expect(author).toMatchSnapshot();
        done();
      }

      return null;
    });
  });
});
