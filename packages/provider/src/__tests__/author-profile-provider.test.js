import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@times-components/utils";
import { AuthorProfileProvider } from "../provider";
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
