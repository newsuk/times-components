/* eslint-disable react/no-multi-comp */

import React from "react";
import { iterator } from "@times-components/test-utils";
import { fixtures } from "@times-components/provider-test-tools";
import ArticleMainVideo from "../src/article-main-video";
import { adConfig } from "./ad-mock";

jest.mock("@times-components/save-and-share-bar", () => "SaveAndShareBar");

export const snapshotTests = renderComponent => [
  {
    name: "an article",
    test() {
      const output = renderComponent(
        <ArticleMainVideo
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={fixtures.articleVideoData}
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
        <ArticleMainVideo isLoading />
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
  }
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

  iterator([...snapshotTests(renderComponent), ...platformTests]);
};

export { adConfig };
