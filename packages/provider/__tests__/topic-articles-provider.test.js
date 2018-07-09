import React from "react";
import renderer from "react-test-renderer";
import {
  fixtureGenerator,
  MockedProvider
} from "@times-components/provider-test-tools";
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
        debounceTimeMs={0}
        page={1}
        pageSize={pageSize}
        slug="chelsea"
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
