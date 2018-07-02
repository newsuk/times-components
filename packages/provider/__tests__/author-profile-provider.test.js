import React from "react";
import renderer from "react-test-renderer";
import {
  fixtureGenerator,
  MockedProvider
} from "@times-components/provider-test-tools";
import { AuthorProfileProvider } from "../src/provider";

const renderComponent = child =>
  renderer.create(
    <MockedProvider
      mocks={fixtureGenerator.makeArticleMocks({
        withImages: true,
        pageSize: 5,
        delay: 0
      })}
    >
      <AuthorProfileProvider slug="deborah-haynes" debounceTimeMs={0}>
        {child}
      </AuthorProfileProvider>
    </MockedProvider>
  );

describe("AuthorArticlesNoImages provider", () => {
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
