import React from "react";
import renderer from "react-test-renderer";
import {
  MockedProvider,
  MockFixture,
  topic as makeTopicParams
} from "@times-components/provider-test-tools";
import { TopicArticlesProvider } from "../src/provider";

const renderComponent = child => {
  const articleImageRatio = "3:2";
  const name = "Chelsea";
  const pageSize = 1;
  const slug = "chelsea";

  return renderer.create(
    <MockFixture
      params={makeTopicParams({
        articleVariables: iteration => ({
          first: pageSize,
          imageRatio: articleImageRatio,
          skip: (iteration - 1) * pageSize,
          slug
        }),
        name,
        pageSize,
        slug
      })}
      render={mocks => (
        <MockedProvider mocks={mocks}>
          <TopicArticlesProvider
            debounceTimeMs={0}
            page={1}
            pageSize={pageSize}
            slug={slug}
          >
            {child}
          </TopicArticlesProvider>
        </MockedProvider>
      )}
    />
  );
};

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
