/* eslint-disable react/no-multi-comp */

import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import ArticleMainVideo from "../src/article-main-video";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";
import articleProps from "./shared-article-props";

jest.mock("@times-components/save-and-share-bar", () => "SaveAndShareBar");

const emptyArticle = {
  bylines: null,
  expirableFlags: null,
  hasVideo: null,
  label: null,
  leadAsset: null,
  longRead: false,
  relatedArticleSlice: null,
  standfirst: null,
  topics: null
};

export const snapshotTests = renderComponent => [
  {
    name: "an article",
    test() {
      const output = renderComponent(
        <ArticleMainVideo
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture(testFixture)}
          onAuthorPress={() => {}}
          onCommentGuidelinesPress={() => {}}
          onCommentsPress={() => {}}
          onLinkPress={() => {}}
          onRelatedArticlePress={() => {}}
          onTopicPress={() => {}}
          onTwitterLinkPress={() => {}}
          onVideoPress={() => {}}
        />
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "loading",
    test() {
      const output = renderComponent(
        <ArticleMainVideo {...articleProps} isLoading />
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an error",
    test() {
      const props = {
        error: { message: "An example error." }
      };

      const output = renderComponent(
        <ArticleMainVideo
          {...props}
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          onAuthorPress={() => {}}
          onCommentGuidelinesPress={() => {}}
          onCommentsPress={() => {}}
          onLinkPress={() => {}}
          onRelatedArticlePress={() => {}}
          onTopicPress={() => {}}
          onTwitterLinkPress={() => {}}
          onVideoPress={() => {}}
        />
      );

      expect(output).toMatchSnapshot();
    }
  },
];

export default (renderComponent, platformTests = []) => {
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

  iterator([
    ...snapshotTests(renderComponent),
    ...platformTests
  ]);
};

export { adConfig };
