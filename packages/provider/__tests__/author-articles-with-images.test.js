import React from "react";
import renderer from "react-test-renderer";
import {
  fixtureGenerator,
  MockedProvider
} from "@times-components/provider-test-tools";
import { AuthorArticlesWithImagesProvider } from "../src/provider";

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
        debounceTimeMs={0}
        page={1}
        pageSize={5}
        slug="deborah-haynes"
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
