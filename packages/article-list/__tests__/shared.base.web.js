import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import ArticleList from "../src/article-list";
import articlesFixture from "../fixtures/articles.json";
import adConfig from "../fixtures/article-ad-config.json";

export default (additionalTests = []) => {
  const realIntl = Intl;

  const config = {
    get (renderKey) {
      return "www.thetimes.co.uk";
    }
  };

  const makeUrl = (slug, shortIdentifier) => {
    if (process.env.NODE_ENV === 'local' && !process.env.IS_E2E_CI) {
        return `${config.get('render:host')}/${config.get('render:port')}/article/${slug}-${shortIdentifier}`;
    }
    return `${config.get('render:host')}/article/${slug}-${shortIdentifier}`;
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

  const tests = [
    {
      name: "article list",
      test() {
        const testInstance = TestRenderer.create(
          <ArticleList
            adConfig={adConfig}
            articles={articlesFixture}
            emptyStateMessage="Empty state"
            refetch={() => {}}
            makeUrl={makeUrl}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator([...tests, ...additionalTests]);
};
