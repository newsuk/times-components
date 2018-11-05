import React from "react";
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

const imageAST = {
  attributes: {
    caption: "A Caption",
    credits: "Some Credits",
    display: "inline",
    ratio: "9:4",
    url: "https://image-inline.io"
  },
  children: [],
  name: "image"
};

export default () =>
  iterator([
    {
      name: "a secondary image",
      test() {
        const output = TestRenderer.create(
          <Article
            {...articleProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            article={articleFixture({
              ...testFixture,
              ...emptyArticle,
              content: [
                {
                  ...imageAST,
                  attributes: {
                    ...imageAST.attributes,
                    display: "secondary",
                    ratio: "3:2",
                    url: "https://image-2.io"
                  }
                }
              ],
              paywalledContent: [
                {
                  ...imageAST,
                  attributes: {
                    ...imageAST.attributes,
                    display: "secondary",
                    ratio: "3:2",
                    url: "https://image-2.io"
                  }
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
            {...articleProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            article={articleFixture({
              ...testFixture,
              ...emptyArticle,
              content: [imageAST],
              paywalledContent: [imageAST]
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
