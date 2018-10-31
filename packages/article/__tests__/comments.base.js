import React from "react";
import Button from "@times-components/button"
import ArticleComments from "../src/article-comments/article-comments"
import { iterator } from "@times-components/test-utils";
import TestRenderer from "react-test-renderer";
import Article from "../src/article";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";
import articleProps from "./shared-article-props";

const emptyArticle = {
  byline: null,
  flags: null,
  label: null,
  leadAsset: null,
  relatedArticleSlice: null,
  standfirst: null,
  topics: null
};

export default () =>
  iterator([
    {
      name: "a full article with enabled comments",
      test() {
        const article = articleFixture({
          ...testFixture,
          ...emptyArticle
        });

        const testInstance = TestRenderer.create(
          <Article
            {...articleProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            data={article}
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

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "a full article with disabled comments",
      test() {
        const article = articleFixture({
          ...testFixture,
          ...emptyArticle,
          commentsEnabled: false
        });

        const testInstance = TestRenderer.create(
          <Article
            {...articleProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            data={article}
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

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "an article with no comments",
      test() {
        const article = articleFixture({
          ...testFixture,
          commentCount: 0
        });

        const testInstance = TestRenderer.create(
          <Article
            {...articleProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            data={article}
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

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "onCommentsPress works as expected",
      test() {
        const article = articleFixture({
          ...testFixture,
        });

        const commentClick = jest.fn();
        const testInstance = TestRenderer.create(
          <Article
            {...articleProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            data={article}
            onAuthorPress={() => {}}
            onCommentGuidelinesPress={() => {}}
            onCommentsPress={commentClick}
            onLinkPress={() => {}}
            onRelatedArticlePress={() => {}}
            onTopicPress={() => {}}
            onTwitterLinkPress={() => {}}
            onVideoPress={() => {}}
          />
        );

        testInstance.root.findByType(ArticleComments).findByType(Button).props.onPress();
        expect(commentClick).toHaveBeenCalled();
      }
    }
  ]);
