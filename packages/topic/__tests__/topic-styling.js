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
      description:
        "Chelsea is known for its affluent residents and the posh shops and restaurants that cater to them. It’s a cultural haven too, with the Royal Court Theatre on Sloane Square and the modern Saatchi Gallery on the Duke of York Square. Close by, busy King’s Road is lined with mid- to high-end stores."
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
