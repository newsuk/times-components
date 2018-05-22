import React from "react";
import renderer from "react-test-renderer";
import { fixtureGenerator } from "@times-components/provider-test-tools";
import { delay, MockedProvider } from "@times-components/utils";
import Topic from "../src/topic";

// This is the only possible way for this to work... :'-(
// eslint-disable-next-line global-require
jest.mock("@times-components/article-list", () => require("./articleListMock"));

export default () => {
  const pageSize = 3;
  const slug = "chelsea";

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
    slug,
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
    const tree = renderer.create(<Topic {...props} isLoading />);

    expect(tree).toMatchSnapshot("2. Render a topics page loading state");
  });

  it("should render an error state with an invalid Topic Query", () => {
    const tree = renderer.create(
      <Topic {...props} error={{}} refetch={() => null} />
    );

    expect(tree).toMatchSnapshot(
      "3. Render a topics page error state with an invalid Topic Query"
    );
  });
};
