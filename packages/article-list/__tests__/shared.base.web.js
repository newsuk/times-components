import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import ArticleList from "../src/article-list";
import articlesFixture from "../fixtures/articles.json";

export default (additionalTests = []) => {
  const realIntl = Intl;

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

  const tests = [
    {
      name: "article list",
      test() {
        const testInstance = TestRenderer.create(
          <ArticleList
            articles={articlesFixture}
            emptyStateMessage="Empty state"
            refetch={() => {}}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator([...tests, ...additionalTests]);
};
