import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@times-components/utils";
import { AuthorArticlesWithImagesProvider } from "../provider";
import fixtureGenerator from "../fixture-generator";

const renderComponent = child =>
  renderer.create(
    <MockedProvider
      mocks={fixtureGenerator.makeArticleMocks({
        withImages: true,
        pageSize: 5,
        delay: 0
      })}
    >
      <AuthorArticlesWithImagesProvider
        slug="deborah-haynes"
        pageSize={5}
        page={1}
        debounceTimeMs={0}
      >
        {child}
      </AuthorArticlesWithImagesProvider>
    </MockedProvider>
  );

describe("AuthorArticlesWithImagesProvider", () => {
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
