import React from "react";
import { iterator } from "@times-components/test-utils";
import TestRenderer from "react-test-renderer";
import Context from "@times-components/context";
import ArticleSkeleton from "../src/article-skeleton";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";
import articleSkeletonProps from "./shared-article-skeleton-props";

jest.mock("@times-components/save-and-share-bar", () => "SaveAndShareBar");

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
      name: "a primary image",
      test() {
        const output = TestRenderer.create(
          <Context.Provider
            value={{
              user: { isLoggedIn: true }
            }}
          >
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
                      display: "primary",
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
          </Context.Provider>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "a fullwidth image",
      test() {
        const output = TestRenderer.create(
          <Context.Provider
            value={{
              user: { isLoggedIn: true }
            }}
          >
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
                      display: "fullwidth",
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
          </Context.Provider>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "a secondary image",
      test() {
        const output = TestRenderer.create(
          <Context.Provider
            value={{
              user: { isLoggedIn: true }
            }}
          >
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
          </Context.Provider>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "an inline image",
      test() {
        const output = TestRenderer.create(
          <Context.Provider
            value={{
              user: { isLoggedIn: true }
            }}
          >
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
          </Context.Provider>
        );

        expect(output).toMatchSnapshot();
      }
    }
  ]);
