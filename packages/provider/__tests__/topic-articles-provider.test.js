import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@times-components/utils";
import { fixtureGenerator } from "@times-components/provider-test-tools";
import { TopicArticlesProvider } from "../src/provider";

const pageSize = 5;

const mocks = fixtureGenerator.makeTopicArticleMocks({
  withImages: true,
  pageSize
});

const renderComponent = child =>
  renderer.create(
    <MockedProvider mocks={mocks}>
      <TopicArticlesProvider
        slug="chelsea"
        pageSize={pageSize}
        page={1}
        debounceTimeMs={0}
      >
        {child}
      </TopicArticlesProvider>
    </MockedProvider>
  );

describe("TopicArticlesProvider", () => {
  it("returns query result", done => {
    renderComponent(({ isLoading, topic }) => {
      if (!isLoading) {
        expect(topic).toMatchSnapshot();
        done();
      }

      return null;
    });
  });
});
