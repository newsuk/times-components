import React from "react";
import renderer from "react-test-renderer";
import mockDate from "mockdate";
import {
  fixtureGenerator,
  MockedProvider
} from "@times-components/provider-test-tools";
import { delay } from "@times-components/utils";
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
    adConfig: {},
    analyticsStream: () => {},
    isLoading: false,
    onArticlePress: () => {},
    page: 1,
    pageSize,
    refetch: () => {},
    slug,
    topic: {
      name: "Chelsea",
      description:
        "Chelsea is known for its affluent residents and the posh shops and restaurants that cater to them. It’s a cultural haven too, with the Royal Court Theatre on Sloane Square and the modern Saatchi Gallery on the Duke of York Square. Close by, busy King’s Road is lined with mid- to high-end stores."
    }
  };

  const realIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
    mockDate.set(1514764800000, 0);
  });

  afterEach(() => {
    global.Intl = realIntl;
    mockDate.reset();
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
      <MockedProvider mocks={mockArticles} isLoading>
        <Topic {...props} topic={{}} isLoading />
      </MockedProvider>
    );

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

  it("should send analytics when rendering a topic page", () => {
    const reporter = jest.fn();

    renderer.create(
      <MockedProvider mocks={mockArticles}>
        <Topic
          {...props}
          page={1}
          pageSize={pageSize}
          analyticsStream={reporter}
        />
      </MockedProvider>
    );

    const call = reporter.mock.calls[0][0];

    expect(call).toMatchSnapshot(
      "4. Send analytics when rendering a topics page (with null event time)"
    );
  });
};
