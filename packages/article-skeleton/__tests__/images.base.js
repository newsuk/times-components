import React from "react";
import { iterator } from "@times-components/test-utils";
import TestRenderer from "react-test-renderer";
import ArticleSkeleton from "../src/article-skeleton";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";
import articleSkeletonProps from "./shared-article-skeleton-props";

const emptyArticle = {
  bylines: null,
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
      name: "a secondary image",
      test() {
        const output = TestRenderer.create(
          <ArticleSkeleton
            {...articleSkeletonProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            data={articleFixture({
              ...testFixture,
              ...emptyArticle,
              content: [
                {
                  attributes: {
                    caption: "A Caption",
                    credits: "Some Credits",
                    display: "secondary",
                    imageIndex: 1,
                    ratio: "3:2",
                    url: "https://image-2.io"
                  },
                  children: [],
                  name: "image"
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
            spotAccountId=""
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "an inline image",
      test() {
        const output = TestRenderer.create(
          <ArticleSkeleton
            {...articleSkeletonProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            data={articleFixture({
              ...testFixture,
              ...emptyArticle,
              content: [
                {
                  attributes: {
                    caption: "A Caption",
                    credits: "Some Credits",
                    display: "inline",
                    imageIndex: 1,
                    ratio: "9:4",
                    url: "https://image-inline.io"
                  },
                  children: [],
                  name: "image"
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
            spotAccountId=""
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ]);
