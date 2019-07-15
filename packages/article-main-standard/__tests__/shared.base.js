/* eslint-disable react/no-multi-comp */

import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import ArticleMainStandard from "../src/article-main-standard";
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
  relatedArticleSlice: null,
  standfirst: null,
  topics: null
};

export const snapshotTests = renderComponent => [
  {
    name: "an article",
    test() {
      const output = renderComponent(
        <ArticleMainStandard
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
        <ArticleMainStandard {...articleProps} isLoading />
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
        <ArticleMainStandard
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
  {
    name: "an article with no headline falls back to use shortHeadline",
    test() {
      const output = renderComponent(
        <ArticleMainStandard
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            ...emptyArticle,
            headline: ""
          })}
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
    name: "an article with ads",
    test() {
      const output = renderComponent(
        <ArticleMainStandard
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            ...emptyArticle,
            content: [
              {
                attributes: {},
                children: [],
                name: "ad"
              }
            ]
          })}
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

const negativeTests = [
  {
    name: "an article with no byline",
    test() {
      const output = TestRenderer.create(
        <ArticleMainStandard
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({ ...testFixture, bylines: null })}
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
    name: "an article with no label",
    test() {
      const output = TestRenderer.create(
        <ArticleMainStandard
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({ ...testFixture, label: null })}
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
    name: "an article with no standfirst",
    test() {
      const testInstance = TestRenderer.create(
        <ArticleMainStandard
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            standfirst: null
          })}
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

      const textNodes = testInstance.root.findAll(node => {
        if (typeof node.type === "string") {
          return (
            node.type === "Text" &&
            typeof node.props.children === "string" &&
            node.props.children === "Some Standfirst"
          );
        }

        return false;
      });

      expect(textNodes).toEqual([]);
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

  iterator([
    ...snapshotTests(renderComponent),
    ...platformTests,
    ...negativeTests
  ]);
};

export { adConfig };
