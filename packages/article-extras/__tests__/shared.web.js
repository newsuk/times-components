import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import { AlgoliaSearchProvider } from "@times-components/ts-components";

import { UserState } from "./mocks";
import ArticleExtras from "../src/article-extras";
import { relatedArticleSlice, topics } from "../fixtures/article-extras";

const algoliaSearchKeys = {
  applicationId: "",
  apiKey: "",
  indexName: ""
};

const commentingConfig = {
  account: {
    current: "CurrentSpotID",
    readonly: "ReadOnlySpotID"
  },
  switchOver: "2020-08-10T16:00:00.000Z"
};

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) =>
          key === "style" ||
          key === "className" ||
          key === "data-testid" ||
          key === "topics" ||
          key === "slice"
      )
    )
  );

  const tests = [
    {
      name: "renders correctly",
      test: () => {
        UserState.mockStates = [UserState.fullArticle, UserState.loggedIn];
        const testInstance = TestRenderer.create(
          <AlgoliaSearchProvider
            article={{ id: "dummy-article-id" }}
            algoliaSearchKeys={algoliaSearchKeys}
            analyticsStream={jest.fn()}
          >
            <ArticleExtras
              analyticsStream={() => {}}
              articleId="dummy-article-id"
              commentsEnabled
              registerNode={() => {}}
              relatedArticleSlice={relatedArticleSlice}
              relatedArticlesVisible
              commentingConfig={commentingConfig}
              topics={topics}
            />
          </AlgoliaSearchProvider>
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name:
        "no related articles, topics and comments when user not logged in, only sponsored div",
      test: () => {
        UserState.mockStates = [];
        const testInstance = TestRenderer.create(
          <AlgoliaSearchProvider
            article={{ id: "dummy-article-id" }}
            algoliaSearchKeys={algoliaSearchKeys}
            analyticsStream={jest.fn()}
          >
            <ArticleExtras
              analyticsStream={() => {}}
              articleId="dummy-article-id"
              commentsEnabled
              registerNode={() => {}}
              relatedArticleSlice={relatedArticleSlice}
              relatedArticlesVisible
              commentingConfig={commentingConfig}
              topics={topics}
            />
          </AlgoliaSearchProvider>
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "read only comments when the user is a share token reader",
      test: () => {
        UserState.mockStates = [UserState.fullArticle, UserState.shared];
        const testInstance = TestRenderer.create(
          <AlgoliaSearchProvider
            article={{ id: "dummy-article-id" }}
            algoliaSearchKeys={algoliaSearchKeys}
            analyticsStream={jest.fn()}
          >
            <ArticleExtras
              analyticsStream={() => {}}
              articleId="dummy-article-id"
              commentsEnabled
              registerNode={() => {}}
              relatedArticleSlice={relatedArticleSlice}
              relatedArticlesVisible
              commentingConfig={commentingConfig}
              topics={topics}
            />
          </AlgoliaSearchProvider>
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "renders the additional related articles",
      test: () => {
        UserState.mockStates = [UserState.fullArticle, UserState.loggedIn];
        const testInstance = TestRenderer.create(
          <AlgoliaSearchProvider
            article={{ id: "dummy-article-id" }}
            algoliaSearchKeys={algoliaSearchKeys}
            analyticsStream={jest.fn()}
          >
            <ArticleExtras
              analyticsStream={() => {}}
              articleId="dummy-article-id"
              commentsEnabled
              registerNode={() => {}}
              relatedArticleSlice={relatedArticleSlice}
              relatedArticlesVisible
              commentingConfig={commentingConfig}
              topics={topics}
              additionalRelatedArticlesFlag
              inlineRelatedArticlesFlag
            />
          </AlgoliaSearchProvider>
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
