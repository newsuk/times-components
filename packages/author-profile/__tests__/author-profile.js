import React from "react";
import TestRenderer from "react-test-renderer";
import mockDate from "mockdate";
import { MockedProvider } from "@times-components/provider-test-tools";
import { iterator } from "@times-components/test-utils";
import { delay } from "@times-components/utils";
import AuthorProfile from "../src/author-profile";
import {
  mockArticles,
  mockArticlesWithoutImages,
  mockAuthorWithoutImages,
  props
} from "./mocks";

export default () => {
  const realIntl = Intl;

  beforeAll(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
    mockDate.set(1514764800000, 0);
  });

  afterAll(() => {
    global.Intl = realIntl;
    mockDate.reset();
  });

  const tests = [
    {
      name: "with images",
      test: async () => {
        const testInstance = TestRenderer.create(
          <MockedProvider mocks={mockArticles}>
            <AuthorProfile {...props} />
          </MockedProvider>
        );

        await delay(1500);

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "without images",
      test: async () => {
        const testInstance = TestRenderer.create(
          <MockedProvider mocks={mockArticlesWithoutImages}>
            <AuthorProfile {...props} author={mockAuthorWithoutImages} />
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
            <AuthorProfile {...props} isLoading />
          </MockedProvider>
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "author profile page error state",
      test: () => {
        const testInstance = TestRenderer.create(
          <AuthorProfile {...props} error={{}} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "send analytics when rendering an author profile page",
      test: () => {
        const reporter = jest.fn();

        TestRenderer.create(
          <MockedProvider mocks={mockArticles}>
            <AuthorProfile {...props} analyticsStream={reporter} />
          </MockedProvider>
        );

        const call = reporter.mock.calls[0][0];

        expect(call).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
