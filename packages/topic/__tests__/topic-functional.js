import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { fixtureGenerator } from "@times-components/provider-test-tools";
import { MockedProvider } from "@times-components/utils";
import Topic from "../src/topic";

jest.mock("../src/topic-head-divider", () => "Divider");
jest.mock("@times-components/article-list", () => "ArticleList");

export default () => {
  const realIntl = Intl;

  const topicProps = {
    analyticsStream: () => {},
    onArticlePress: () => {},
    refetch: () => {},
    slug: "chelsea",
    topic: {
      name: "Chelsea",
      description: "A swanky part of town."
    }
  };

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
    jest.useFakeTimers();
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  it("should render correctly", () => {
    const pageSize = 3;
    const tree = renderer.create(
      <MockedProvider
        mocks={fixtureGenerator.makeTopicArticleMocks({
          pageSize,
          withImages: true
        })}
      >
        <Topic {...topicProps} page={1} pageSize={pageSize} />
      </MockedProvider>
    );

    expect(tree).toMatchSnapshot("1. Render a Topic page");
  });
};
