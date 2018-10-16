import React from "react";
import TestRenderer from "react-test-renderer";
import Context from "@times-components/context";
import { iterator, makeArticleUrl } from "@times-components/test-utils";
import ArticleList from "../src/article-list";
import articlesFixture from "../fixtures/articles.json";
import adConfig from "../fixtures/article-ad-config.json";

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
          <Context.Provider value={{ makeArticleUrl }}>
            <ArticleList
              adConfig={adConfig}
              articles={articlesFixture}
              emptyStateMessage="Empty state"
              refetch={() => {}}
            />
          </Context.Provider>
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator([...tests, ...additionalTests]);
};
