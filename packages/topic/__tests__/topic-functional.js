import React from "react";
import renderer from "react-test-renderer";
import { fixtureGenerator } from "@times-components/provider-test-tools";
import { delay, MockedProvider } from "@times-components/utils";
import Topic from "../src/topic";

jest.mock("@times-components/article-list", () => "ArticleList");

export default () => {
  const pageSize = 3;

  const mockArticles = fixtureGenerator.makeTopicArticleMocks({
    pageSize,
    withImages: true
  });

  const props = {
    analyticsStream: () => {},
    isLoading: false,
    onArticlePress: () => {},
    page: 1,
    pageSize,
    refetch: () => {},
    slug: "chelsea",
    topic: {
      name: "Chelsea",
      description: "A swanky part of town."
    }
  };

  const realIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  it("should render correctly", async () => {
    const tree = renderer.create(
      <MockedProvider mocks={mockArticles}>
        <Topic {...props} page={1} pageSize={pageSize} />
      </MockedProvider>
    );

    await delay(1500);

    expect(tree).toMatchSnapshot("1. Render a Topic page");
  });

  it("should render the loading state", () => {
    const tree = renderer.create(
      <MockedProvider mocks={mockArticles}>
        <Topic {...props} isLoading />
      </MockedProvider>
    );

    expect(tree).toMatchSnapshot("2. Render an topics page loading state");
  });
};
