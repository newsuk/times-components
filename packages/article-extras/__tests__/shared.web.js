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
import "./mocks";
import ArticleExtras from "../src/article-extras";
import { relatedArticleSlice, topics } from "../fixtures/article-extras";

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
        const isAllowed = true;
        const testInstance = TestRenderer.create(
          <ArticleExtras
            analyticsStream={() => {}}
            articleId="dummy-article-id"
            commentsAllowed={isAllowed}
            commentsEnabled
            registerNode={() => {}}
            relatedArticleAllowed={isAllowed}
            relatedArticleSlice={relatedArticleSlice}
            relatedArticlesVisible
            spotAccountId="dummy-spot-id"
            topics={topics}
            topicsAllowed={isAllowed}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "no related articles, topics and comments when user not logged in",
      test: () => {
        const isAllowed = false;
        const testInstance = TestRenderer.create(
          <ArticleExtras
            analyticsStream={() => {}}
            articleId="dummy-article-id"
            commentsAllowed={isAllowed}
            commentsEnabled
            registerNode={() => {}}
            relatedArticleAllowed={isAllowed}
            relatedArticleSlice={relatedArticleSlice}
            relatedArticlesVisible
            spotAccountId="dummy-spot-id"
            topics={topics}
            topicsAllowed={isAllowed}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    }
  ];
  iterator(tests);
};
