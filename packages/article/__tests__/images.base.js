import React from "react";
import { iterator } from "@times-components/test-utils";
import TestRenderer from "react-test-renderer";
import Article from "../src/article";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";

const emptyArticle = {
  byline: null,
  flags: null,
  label: null,
  leadAsset: null,
  relatedArticles: null,
  relatedArticlesLayout: null,
  standfirst: null,
  topics: null
};

export default () =>
  iterator([
    {
      name: "a secondary image",
      test() {
        const output = TestRenderer.create(
          <Article
            adConfig={adConfig}
            analyticsStream={() => {}}
            article={articleFixture({
              ...testFixture,
              ...emptyArticle,
              content: [
                {
                  name: "image",
                  attributes: {
                    display: "secondary",
                    ratio: "3:2",
                    url: "https://image-2.io",
                    caption: "A Caption",
                    credits: "Some Credits"
                  },
                  children: []
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
    },
    {
      name: "an inline image",
      test() {
        const output = TestRenderer.create(
          <Article
            adConfig={adConfig}
            analyticsStream={() => {}}
            article={articleFixture({
              ...testFixture,
              ...emptyArticle,
              content: [
                {
                  name: "image",
                  attributes: {
                    display: "inline",
                    ratio: "9:4",
                    url: "https://image-inline.io",
                    caption: "A Caption",
                    credits: "Some Credits"
                  },
                  children: []
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
  ]);
