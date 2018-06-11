import "jest-styled-components";
import React from "react";
import renderer from "react-test-renderer";
import { fixtureGenerator } from "@times-components/provider-test-tools";
import { MockedProvider } from "@times-components/utils";
import Topic from "../src/topic";

export default () => {
  const props = {
    analyticsStream: () => {},
    isLoading: false,
    onArticlePress: () => {},
    refetch: () => {},
    slug: "chelsea",
    topic: {
      name: "Chelsea",
      description: "A swanky part of town."
    }
  };

  it("should render styling correctly", () => {
    const pageSize = 3;
    const tree = renderer.create(
      <MockedProvider
        mocks={fixtureGenerator.makeTopicArticleMocks({
          pageSize,
          withImages: true
        })}
      >
        <Topic {...props} page={1} pageSize={pageSize} />
      </MockedProvider>
    );

    expect(tree).toMatchSnapshot();
  });
};
