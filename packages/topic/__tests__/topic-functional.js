import React from "react";
import TestRenderer from "react-test-renderer";
import mockDate from "mockdate";
import {
  fixtureGenerator,
  MockedProvider
} from "@times-components/provider-test-tools";
import { iterator } from "@times-components/test-utils";
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

  const tests = [
    {
      name: "topic page",
      test: async () => {
        const testInstance = TestRenderer.create(
          <MockedProvider mocks={mockArticles}>
            <Topic {...props} page={1} pageSize={pageSize} />
          </MockedProvider>
        );

        await delay(1500);

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "loading state",
      test: () => {
        const testInstance = TestRenderer.create(
          <MockedProvider isLoading mocks={mockArticles}>
            <Topic {...props} isLoading topic={{}} />
          </MockedProvider>
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "error state with an invalid Topic Query",
      test: () => {
        const testInstance = TestRenderer.create(
          <Topic {...props} error={{}} refetch={() => null} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "send analytics when rendering a topic page",
      test: () => {
        const reporter = jest.fn();

        TestRenderer.create(
          <MockedProvider mocks={mockArticles}>
            <Topic
              {...props}
              analyticsStream={reporter}
              page={1}
              pageSize={pageSize}
            />
          </MockedProvider>
        );

        const call = reporter.mock.calls[0][0];

        expect(call).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
